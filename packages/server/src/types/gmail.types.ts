export interface GmailMessage {
    id: string;
    threadId: string;
}

export interface GmailMessageDetails extends GmailMessage {
    subject: string | null;
    from: string | null;
    date: string | null;
    snippet: string;
}