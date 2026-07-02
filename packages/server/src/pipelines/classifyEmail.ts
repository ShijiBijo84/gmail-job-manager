import { classifyEmail } from "../services/ai.service.js";
import type { ClassifyEmailInput } from "../types/ai.types.js";

export async function runClassificationPipeline(input: ClassifyEmailInput) {
    return await classifyEmail(input)
}