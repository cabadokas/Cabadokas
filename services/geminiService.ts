

import { GoogleGenAI, GenerateContentResponse, Chat, Modality, Part, Operation, GenerateVideosResponse, LiveSession } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled. Please set the API_KEY environment variable.");
}

const getAI = (keyOverride?: string) => {
    const key = keyOverride || API_KEY;
    if (!key) return null;
    return new GoogleGenAI({ apiKey: key });
};

const checkAiOrThrow = (keyOverride?: string) => {
  const ai = getAI(keyOverride);
  if (!ai) {
    throw new Error("AI service is not available. Please configure the API key.");
  }
  return ai;
};

export const generateContent = async (prompt: string): Promise<string> => {
    const ai = checkAiOrThrow();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
};


export const createChatSession = () => {
  const ai = checkAiOrThrow();
  return ai.chats.create({
    model: 'gemini-2.5-flash',
  });
};

export const generateContentStream = async (chat: Chat, prompt: string) => {
  const ai = checkAiOrThrow();
  return await chat.sendMessageStream({ message: prompt });
};

export const generateImage = async (prompt: string, aspectRatio: string) => {
    const ai = checkAiOrThrow();
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio,
        },
    });
    return response.generatedImages[0].image.imageBytes;
};

export const editImage = async (prompt: string, image: Part) => {
    const ai = checkAiOrThrow();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [image, { text: prompt }] },
        config: {
          responseModalities: [Modality.IMAGE],
        },
    });
    const part = response.candidates?.[0]?.content?.parts[0];
    if (part && part.inlineData) {
        return part.inlineData.data;
    }
    throw new Error("Could not edit the image.");
};

export const generateVideo = async (prompt: string, aspectRatio: '16:9' | '9:16', image?: Part) => {
    const ai = checkAiOrThrow(process.env.API_KEY); // Use latest key for Veo
    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt,
        ...(image && { image: { imageBytes: image.inlineData!.data, mimeType: image.inlineData!.mimeType } }),
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio,
        }
    });
    return operation;
};

export const pollVideoOperation = async (operation: Operation<GenerateVideosResponse>) => {
    const ai = checkAiOrThrow(process.env.API_KEY);
    let polledOp = operation;
    while (!polledOp.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        polledOp = await ai.operations.getVideosOperation({ operation: polledOp });
    }
    return polledOp;
};

export const fetchVideo = async (uri: string) => {
    const response = await fetch(`${uri}&key=${process.env.API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch video');
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
}


export const groundedSearch = async (prompt: string, useMaps: boolean, useThinking: boolean) => {
    const ai = checkAiOrThrow();
    
    const tools: any[] = useMaps ? [{googleMaps: {}}, {googleSearch: {}}] : [{googleSearch: {}}];
    const model = useThinking ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
    const config: any = {
        tools,
        ...(useThinking && { thinkingConfig: { thinkingBudget: 32768 } })
    };

    if (useMaps) {
        config.toolConfig = {
            retrievalConfig: {
                latLng: await new Promise((resolve) => {
                    navigator.geolocation.getCurrentPosition(
                        (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
                        () => resolve({ latitude: 37.78193, longitude: -122.40476 }) // Default location
                    );
                })
            }
        };
    }

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config
    });

    return {
        text: response.text,
        chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
};

export const analyzeImage = async (prompt: string, image: Part) => {
    const ai = checkAiOrThrow();
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [{ text: prompt }, image] }
    });
    return response.text;
};

interface SpeechConfigOptions {
    voice: string;
    speakingRate: number;
    pitch: number;
}

export const generateSpeech = async (text: string, options: SpeechConfigOptions) => {
    const ai = checkAiOrThrow();

    // The SDK types might not include pitch/speakingRate, so use 'any' to be safe.
    const speechConfig: any = {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: options.voice } },
        speakingRate: options.speakingRate,
        pitch: options.pitch,
    };
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say this: ${text}` }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig,
        },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};