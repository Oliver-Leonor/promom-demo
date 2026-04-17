import { StyleSheet, Text, View } from 'react-native';
import type { Verdict, VerdictResponse } from '../types';

type Props = {
  verdict: VerdictResponse;
};

type Palette = {
  accent: string;
  bg: string;
  border: string;
};

const PALETTE: Record<Verdict, Palette> = {
  safe: { accent: '#2e7d32', bg: '#e8f5e9', border: '#a5d6a7' },
  caution: { accent: '#ed6c02', bg: '#fff4e5', border: '#ffcc80' },
  avoid: { accent: '#c62828', bg: '#fdecea', border: '#ef9a9a' },
};

export function VerdictCard({ verdict }: Props) {
  const palette = PALETTE[verdict.verdict];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: palette.bg, borderColor: palette.border },
      ]}
    >
      <View style={[styles.badge, { backgroundColor: palette.accent }]}>
        <Text style={styles.badgeText}>{verdict.verdict.toUpperCase()}</Text>
      </View>

      <View style={styles.reasoning}>
        {verdict.reasoning.map((bullet, i) => (
          <View key={i} style={styles.bulletRow}>
            <Text style={[styles.bulletDot, { color: palette.accent }]}>•</Text>
            <Text style={styles.bulletText}>{bullet}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.disclaimer}>{verdict.disclaimer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  reasoning: {
    gap: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletDot: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#1f2937',
  },
  disclaimer: {
    fontSize: 12,
    lineHeight: 17,
    color: '#6b7280',
    fontStyle: 'italic',
  },
});
