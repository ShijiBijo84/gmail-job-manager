import axios from "axios";
import { useEffect, useState } from "react";

export default function Inbox() {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/emails/enriched")
            .then(res => setEmails(res.data.data));
    }, []);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Job Inbox</h1>

            <div className="space-y-3">
                {emails.map((item) => (
                    <div key={item.email.id} className="border p-4 rounded-lg">
                        <h2 className="font-semibold">
                            {item.email.subject}
                        </h2>

                        <p className="text-sm text-gray-500">
                            {item.email.from}
                        </p>

                        <p className="text-xs mt-2">
                            confidence: {item.classification.confidence}
                        </p>

                        <p className="text-xs">
                            score: {item.score}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}