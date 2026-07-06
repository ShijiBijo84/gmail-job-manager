import type { EmailClassification } from "@gmail-job-manager/shared";
import type { ClassifyEmailInput } from "../../types/ai.types.js";
import type { AIProvider } from "./ai.provider.js";
import { buildPrompt } from "../../prompts/ai.prompt.js";

export class GroqProvider implements AIProvider {

    async classifyEmail(emailText: ClassifyEmailInput): Promise<EmailClassification> {
        const prompt = buildPrompt(emailText)
        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],
                }),
            });
            const data = await response.json() as {
                choices: { message: { content: string } }[]
            };


            const content = data.choices[0].message.content;

            const parsed = JSON.parse(content);


            return {
                isJobRelated: parsed.isJobRelated,
                confidence: parsed.confidence,
                status: parsed.status
            }
        }
        catch (e) {
            return {
                isJobRelated: false,
                confidence: 0,
                status: "unknown"
            }
        }
    }
}