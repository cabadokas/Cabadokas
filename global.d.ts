
interface Window {
  // Fix: Made 'aistudio' optional to resolve the declaration modifier conflict.
  // The property is checked for existence before use, indicating it may not always be present.
  aistudio?: {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  };
  webkitAudioContext: typeof AudioContext;
}
