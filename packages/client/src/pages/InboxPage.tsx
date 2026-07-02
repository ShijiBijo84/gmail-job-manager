import Layout from "#components/layout/Layout";
import type { EnrichedEmail } from "@gmail-job-manager/shared";
import axios from "axios";
import { useEffect, useState } from "react";
import type { EnrichedEmailResponse } from "src/types/email.types.ts";
import { Spinner } from "#components/ui/spinner";

const InboxPage = () => {
    const [emails, setEmails] = useState<EnrichedEmail[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchEmails = async () => {
            setLoading(true);
            try {
                const res = await axios.get<EnrichedEmailResponse>("http://localhost:4000/emails/enriched");
                setEmails(res.data.data);
            } catch (error) {
                console.error("Error fetching emails:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEmails();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <Spinner />
                <div className="text-center">
                    <p className="text-sm font-medium">Loading your inbox</p>
                    <p className="text-xs text-muted-foreground">
                        Fetching and analyzing emails...
                    </p>
                </div>
            </div>
        );
    }

    return <Layout emails={emails} />;


}
export default InboxPage;