import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let lessonSession: Chat | null = null;
let qaSession: Chat | null = null;

// Safely resolve the API key in different environments.
// - Vite replaces import.meta.env.VITE_* variables at build time
// - Google AI Studio or the host may inject GEMINI_API_KEY or API_KEY on globalThis.
// - In the browser, `process` might be undefined, so we must guard against it.
const resolveApiKey = (): string => {
  const viteKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  if (viteKey) return viteKey;

  const g = (globalThis as any) || {};

  const fromGlobal =
    g.GEMINI_API_KEY ||
    g.API_KEY ||
    "";

  const fromProcess =
    typeof process !== "undefined"
      ? (process as any).env?.GEMINI_API_KEY ||
        (process as any).env?.API_KEY ||
        ""
      : "";

  return fromProcess || fromGlobal;
};

// --- LESSON CHAT (Structured JSON, Gemini 2.5 Flash) ---

export const initializeLessonChat = async (): Promise<string> => {
  const apiKey = resolveApiKey();
  const ai = new GoogleGenAI({ apiKey });

  lessonSession = ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
    },
  });

  // First greeting for the UI.
  const result = await lessonSession.sendMessage({ message: "Start Module 1" });
  return result.text ?? "Hi! I'm your GA4 micro-tutor. Let's start with Module 1.";
};

export const sendMessageToLesson = async function* (message: string) {
  if (!lessonSession) {
    await initializeLessonChat();
  }
  if (!lessonSession) {
    throw new Error("Lesson session failed to initialize");
  }

  const result = await lessonSession.sendMessageStream({ message });

  for await (const chunk of result) {
    if (chunk.text) {
      yield chunk.text;
    }
  }
};

// --- QA CHAT (Free-form GA4 Q&A, Gemini 3 Pro) ---

export const initializeQAChat = async (): Promise<void> => {
  const apiKey = resolveApiKey();
  const ai = new GoogleGenAI({ apiKey });

  qaSession = ai.chats.create({
    model: "gemini-3-pro-preview",
    config: {
      systemInstruction: `You are a friendly, expert Google Analytics 4 (GA4) tutor.
You answer specific GA4 and digital analytics questions clearly and concisely.
- Use Markdown formatting (bold, lists) when helpful.
- Keep explanations practical and tied to real marketing scenarios.
- If a user asks about something complex, break it into simple steps.`,
      temperature: 0.7,
    },
  });
};

export const sendMessageToQA = async function* (message: string) {
  if (!qaSession) {
    await initializeQAChat();
  }
  if (!qaSession) {
    throw new Error("QA session failed to initialize");
  }

  const result = await qaSession.sendMessageStream({ message });

  for await (const chunk of result) {
    if (chunk.text) {
      yield chunk.text;
    }
  }
};