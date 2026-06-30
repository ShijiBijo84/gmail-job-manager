
type ApplicationStatus = "applied" | "interview" | "offer" | "rejected" | "unknown";

export interface JobEmail {
    id: string;
    threadId: string;
    from: string | null;
    subject: string | null;
    date: string | null;
    snippet: string;

    company?: string;
    role?: string;
    status?: ApplicationStatus;
}



