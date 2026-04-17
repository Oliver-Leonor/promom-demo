import type { VerdictResponse } from '../types';

const DISCLAIMER =
  'This is general information only — always check with your healthcare provider before making decisions during pregnancy.';

const MOCKS: { match: string; response: VerdictResponse }[] = [
  {
    match: 'soft cheese',
    response: {
      verdict: 'avoid',
      reasoning: [
        'Soft, unpasteurized cheeses can carry listeria bacteria.',
        'Listeria infection in pregnancy can cause miscarriage or stillbirth.',
        'Hard cheeses and pasteurized varieties are generally fine.',
      ],
      disclaimer: DISCLAIMER,
    },
  },
  {
    match: 'acetaminophen',
    response: {
      verdict: 'safe',
      reasoning: [
        'Acetaminophen (Tylenol) is widely considered safe during pregnancy when used as directed.',
        'Stick to the lowest effective dose for the shortest time.',
        'Avoid exceeding 3,000 mg per day without medical advice.',
      ],
      disclaimer: DISCLAIMER,
    },
  },
];

const DEFAULT_RESPONSE: VerdictResponse = {
  verdict: 'caution',
  reasoning: [
    'Not enough context to give a confident verdict.',
    'Safety can depend on trimester, dose, and individual risk factors.',
    'Check with your provider before consuming or taking this.',
  ],
  disclaimer: DISCLAIMER,
};

export async function checkSafety(query: string): Promise<VerdictResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const needle = query.trim().toLowerCase();
  const hit = MOCKS.find((m) => needle.includes(m.match));
  return hit ? hit.response : DEFAULT_RESPONSE;
}
