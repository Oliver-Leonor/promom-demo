import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BellySafeScreen } from './src/screens/BellySafeScreen';

// Silences a deprecation warning emitted from a third-party dep, not our code.
LogBox.ignoreLogs(['SafeAreaView has been deprecated']);

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <StatusBar style="dark" />
        <BellySafeScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fafaf7',
  },
});
