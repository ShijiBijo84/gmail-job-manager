import EmailCard from "#components/email/EmailCard";
import type { EnrichedEmail } from "@gmail-job-manager/shared";

export default function Inbox({ emails }: { emails: EnrichedEmail[] }) {
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="space-y-3">
                {emails.map((item) => (
                    <EmailCard key={item.email.id} item={item} />
                ))}
            </div>
        </div>
    );
}