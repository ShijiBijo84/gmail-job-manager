import { buildPrompt } from "../prompts/ai.prompt.ts";
import type { ClassifyEmailInput } from "../types/ai.types.ts";
import type { EmailClassification } from "../types/email-classification.types.ts";

export async function classifyEmail(input: ClassifyEmailInput):
    Promise<EmailClassification> {
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
    const data = await res.json()
    try {
        const parsed = JSON.parse(data.response)

        return {
            isJobRelated: parsed.isJobRelated,
            confidence: parsed.confidence
        }

    } catch (err) {
        return {
            isJobRelated: false,
            confidence: 0
        }
    }

}