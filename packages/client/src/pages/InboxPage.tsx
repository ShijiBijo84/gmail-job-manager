import Layout from "#components/layout/Layout";
import type { EnrichedEmail } from "@gmail-job-manager/shared";
import axios from "axios";
import { useEffect, useState } from "react";
import type { EnrichedEmailResponse } from "src/types/email.types.ts";

const InboxPage = () => {
    const [emails, setEmails] = useState<EnrichedEmail[]>([]);

    useEffect(() => {
        axios.get<EnrichedEmailResponse>("http://localhost:4000/emails/enriched")
            .then(res => setEmails(res.data.data));
    }, []);


    return (
        <Layout emails={emails} />
    )

}
export default InboxPage;