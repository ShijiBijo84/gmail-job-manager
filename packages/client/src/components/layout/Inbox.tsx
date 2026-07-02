import EmailCard from "#components/email/EmailCard";
import type { EnrichedEmail } from "@gmail-job-manager/shared";

export default function Inbox({ emails }: { emails: EnrichedEmail[] }) {
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Job Inbox</h1>

            <div className="space-y-3">
                {emails.map((item) => (
                    <EmailCard key={item.email.id} item={item} />
                ))}
            </div>
        </div>
    );
}