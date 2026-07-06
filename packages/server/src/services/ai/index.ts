import { GroqProvider } from "./groq.provider.js";
import { OllamaProvider } from "./ollama.provider.js";

export const AI_PROVIDER =
    process.env.AI_MODEL === "groq" ? new GroqProvider() :
        new OllamaProvider();