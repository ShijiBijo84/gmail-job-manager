import type { ClassifyEmailInput } from "../types/ai.types.ts";

export function buildPrompt(input: ClassifyEmailInput): string {
  return `
You are an email classification system.

Your task is to detect whether an email is related to:
- job applications
- interviews
- recruitment
- hiring processes
- technical assessments
- offer letters

You MUST evaluate using signal strength.

## Strong job signals (high confidence 0.8 - 1.0):
- interview invitation
- technical assessment / coding test
- job offer
- recruiter contacting candidate
- application status update
- HR communication

## Medium signals (0.4 - 0.7):
- company replying to application
- vague recruitment message
- follow-up emails from company domain

## Weak or non-job signals (0.0 - 0.3):
- newsletters
- security alerts
- account notifications
- marketing emails
- general updates

## Output rules:
- Return ONLY valid JSON
- No explanation
- No markdown

## JSON format:
{
  "isJobRelated": boolean,
  "confidence": number between 0 and 1
}

## Scoring rules:
- If strong signal → confidence MUST be ≥ 0.8
- If medium signal → confidence between 0.4 and 0.7
- If not job-related → confidence MUST be ≤ 0.3

Email:
Subject: ${input.subject ?? ""}
From: ${input.from ?? ""}
Content: ${input.snippet}
`;
}