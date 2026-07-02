import { Card } from "#components/ui/card";
import { Badge } from "#components/ui/badge";
import type { EnrichedEmail } from "@gmail-job-manager/shared";
import { getStatusStyle } from "src/utils/getStatusStyle.ts";
import { getStatusBorder } from "src/utils/getStatusBorder.ts";

const EmailCard = ({ item }: { item: EnrichedEmail }) => {
    const { email, classification } = item;
    const statusStyle = getStatusStyle(classification.status);

    return (
        <Card className={`p-5 border-l-4 ${getStatusBorder(classification.status)}`}>
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-semibold text-gray-900">
                        {email.subject ?? "No subject"}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground truncate">
                        {email.from}
                    </p>
                </div>


                <Badge className={statusStyle}>
                    {classification.status}
                </Badge>
            </div>


            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {email.snippet}
            </p>


            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <div className="flex items-center gap-2">
                    <span>AI Score</span>

                    <Badge className={statusStyle}>
                        {Math.round(classification.confidence * 100)}%
                    </Badge>
                </div>

                <span>
                    {email.date ? new Date(email.date).toLocaleDateString() : ""}
                </span>
            </div>
        </Card>
    );
};

export default EmailCard;