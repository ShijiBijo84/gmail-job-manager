import { AI_PROVIDER } from "../services/ai/index.js";
import type { ClassifyEmailInput } from "../types/ai.types.js";

export async function runClassificationPipeline(input: ClassifyEmailInput) {
    return await AI_PROVIDER.classifyEmail(input)
}