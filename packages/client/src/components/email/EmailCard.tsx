import { Badge } from "#components/ui/badge";
import { Card } from "#components/ui/card";

const EmailCard = ({ email }: { email: string }) => {
    return (
        <Card className="w-full">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{email}</span>
                <Badge variant="secondary">Email</Badge>
            </div>
        </Card>
    );
}
export default EmailCard;