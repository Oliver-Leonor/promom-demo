import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { checkSafety } from '../api/check';
import { VerdictCard } from '../components/VerdictCard';
import type { VerdictResponse } from '../types';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function BellySafeScreen() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<VerdictResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  const canSubmit = query.trim().length > 0 && status !== 'loading';

  async function handleSubmit() {
    if (!canSubmit) return;
    Keyboard.dismiss();
    setStatus('loading');
    setResult(null);
    setErrorMessage(null);
    try {
      const response = await checkSafety(query);
      setResult(response);
      setStatus('success');
      requestAnimationFrame(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      });
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  const isLoading = status === 'loading';
  const buttonDisabled = !canSubmit;

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>BellySafe</Text>
      <Text style={styles.subtitle}>
        Check if something is safe during pregnancy
      </Text>

      <TextInput
        style={[styles.input, isLoading && styles.inputDisabled]}
        placeholder="e.g. soft cheese, ibuprofen"
        placeholderTextColor="#9ca3af"
        value={query}
        onChangeText={setQuery}
        editable={!isLoading}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
        autoCorrect={false}
        autoCapitalize="none"
      />

      <Pressable
        onPress={handleSubmit}
        disabled={buttonDisabled}
        style={({ pressed }) => [
          styles.button,
          buttonDisabled && styles.buttonDisabled,
          pressed && !buttonDisabled && styles.buttonPressed,
        ]}
      >
        {isLoading && (
          <ActivityIndicator color="#ffffff" style={styles.spinner} />
        )}
        <Text style={styles.buttonText}>
          {isLoading ? 'Checking...' : 'Check'}
        </Text>
      </Pressable>

      {status === 'success' && result && (
        <View style={styles.resultSlot}>
          <VerdictCard verdict={result} />
        </View>
      )}

      {status === 'error' && (
        <View style={styles.errorSlot}>
          <Text style={styles.errorText}>
            {errorMessage ?? 'Something went wrong.'}
          </Text>
          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.retryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1f2937',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  inputDisabled: {
    backgroundColor: '#f3f4f6',
    color: '#9ca3af',
  },
  button: {
    backgroundColor: '#374151',
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  spinner: {
    marginRight: 4,
  },
  resultSlot: {
    marginTop: 8,
  },
  errorSlot: {
    marginTop: 8,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    gap: 12,
  },
  errorText: {
    color: '#991b1b',
    fontSize: 14,
    lineHeight: 20,
  },
  retryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#991b1b',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
