import type { EmailClassification } from "@gmail-job-manager/shared";
import type { ClassifyEmailInput } from "../../types/ai.types.js";
import type { AIProvider } from "./ai.provider.js";
import { buildPrompt } from "../../prompts/ai.prompt.js";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_GROQ_MODEL = "openai/gpt-oss-120b";

const FALLBACK: EmailClassification = {
    isJobRelated: false,
    confidence: 0,
    status: "unknown"
};

type GroqChatResponse = {
    choices?: { message?: { content?: string } }[];
    error?: { message?: string };
};

export class GroqProvider implements AIProvider {

    async classifyEmail(emailText: ClassifyEmailInput): Promise<EmailClassification> {
        const prompt = buildPrompt(emailText)
        try {
            const response = await fetch(GROQ_URL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: process.env.GROQ_MODEL || DEFAULT_GROQ_MODEL,
                    response_format: { type: "json_object" },
                    messages: [
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],
                }),
            });
            const data = await response.json() as GroqChatResponse;

            if (!response.ok) {
                console.error(`Groq API error (${response.status}): ${data.error?.message ?? "unknown error"}`);
                return FALLBACK;
            }

            const content = data.choices?.[0]?.message?.content;
            if (!content) {
                console.error("Groq API returned no content");
                return FALLBACK;
            }

            const parsed = JSON.parse(content) as Partial<EmailClassification>;

            return {
                isJobRelated: parsed.isJobRelated ?? false,
                confidence: parsed.confidence ?? 0,
                status: parsed.status ?? "unknown"
            }
        }
        catch (e) {
            console.error("Groq classification failed:", e instanceof Error ? e.message : e);
            return FALLBACK;
        }
    }
}
