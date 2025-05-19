export type Extension = {
  id: string;
  name: string;
  publisher: string;
  version: string;
  description: string;
  iconUrl: string;
  category: string;
  dataAiHint?: string; // For placeholder image keywords
};

export type AISuggestion = {
  extensionName: string;
  reason: string;
};
