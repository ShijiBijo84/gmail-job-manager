import InboxLayout from "#components/layout/InboxLayout";
import type { ApplicationStatus, EnrichedEmail } from "@gmail-job-manager/shared";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import type { EnrichedEmailResponse, StatusFilter } from "src/types/email.types.ts";
import { Spinner } from "#components/ui/spinner";
import SideBar from "#components/layout/SideBar";
import Inbox from "#components/layout/Inbox";

const InboxPage = () => {
    const [emails, setEmails] = useState<EnrichedEmail[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [fiter, setFilter] = useState<StatusFilter>("all");

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


    const filteredEmails = useMemo(() => {
        if (fiter === 'all') return emails;
        return emails.filter(email => email.classification?.status === fiter);
    }, [emails, fiter]);

    const counts = useMemo(() => {
        const statusCounts: Record<ApplicationStatus, number> = {
            applied: 0,
            interview: 0,
            offer: 0,
            rejected: 0,
            unknown: 0,
        };

        emails.forEach(email => {
            const status = email.classification?.status;
            if (status) {
                statusCounts[status] += 1;
            }
        });

        return { ...statusCounts, all: emails.length };
    }, [emails]);

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

    return (<InboxLayout sidebar={
        <SideBar counts={counts} filter={fiter} onFilterChange={(filter: StatusFilter) => setFilter(filter)} />
    } >
        <Inbox emails={filteredEmails} />
    </InboxLayout>)


}
export default InboxPage;