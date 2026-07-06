import type { EmailClassification } from "@gmail-job-manager/shared";
import type { ClassifyEmailInput } from "../../types/ai.types.js";
import { buildPrompt } from "../../prompts/ai.prompt.js";
import type { AIProvider } from "./ai.provider.js";

export class OllamaProvider implements AIProvider {
    async classifyEmail(input: ClassifyEmailInput): Promise<EmailClassification> {
        const prompt = buildPrompt(input)

        const res = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: " qwen2.5:14b",
                prompt,
                stream: false
            })
        })
        const data = await res.json() as { response: string };
        try {
            const parsed = JSON.parse(data.response)

            return {
                isJobRelated: parsed.isJobRelated,
                confidence: parsed.confidence,
                status: parsed.status
            }

        } catch (err) {
            return {
                isJobRelated: false,
                confidence: 0,
                status: "unknown"
            }
        }
    }
}