import { Card } from "#components/ui/card";
import { Badge } from "#components/ui/badge";
import type { EnrichedEmail } from "@gmail-job-manager/shared";
import { confidenceVariant } from "src/utils/confidenceVariant.ts";

const EmailCard = ({ item }: { item: EnrichedEmail }) => {
    return (
        <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-semibold">
                        {item.email.subject ?? "No subject"}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {item.email.from}
                    </p>
                </div>

                <Badge className={confidenceVariant(item.classification.confidence)}>
                    {Math.round(item.classification.confidence * 100)}%
                </Badge>
            </div>

            <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
                {item.email.snippet}
            </p>

            <div className="mt-4 text-xs text-muted-foreground">
                {new Date(item.email.date ?? "").toLocaleDateString()}
            </div>
        </Card>
    );
};

export default EmailCard;