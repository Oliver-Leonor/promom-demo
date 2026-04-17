export type Verdict = 'safe' | 'caution' | 'avoid';

export type VerdictResponse = {
  verdict: Verdict;
  reasoning: string[];
  disclaimer: string;
};
