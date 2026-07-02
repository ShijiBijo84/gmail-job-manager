import EmailCard from "#components/email/EmailCard";
import axios from "axios";
import { useEffect, useState } from "react";
import type { EnrichedEmail } from '@gmail-job-manager/shared'
import type { EnrichedEmailResponse } from "src/types/email.types.ts";

export default function Inbox() {
    const [emails, setEmails] = useState<EnrichedEmail[]>([]);

    useEffect(() => {
        axios.get<EnrichedEmailResponse>("http://localhost:4000/emails/enriched")
            .then(res => setEmails(res.data.data));
    }, []);

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