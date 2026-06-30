import type { ClassifyEmailInput } from "../types/ai.types.ts";

export function buildPrompt(input: ClassifyEmailInput): string {
    return `
You are an email classification system.

Task:
Determine if the email is related to a job application, interview, or hiring process.

Return ONLY valid JSON:

{
  "isJobRelated": boolean,
  "confidence": number (0 to 1)
}

Rules:
- No explanations
- No markdown
- Only JSON

Email:
Subject: ${input.subject ?? ""}
From: ${input.from ?? ""}
Content: ${input.snippet}
`;
}