export function getStatusBorder(status: string): string {
    switch (status) {
        case "applied":
            return "border-l-blue-400";
        case "interview":
            return "border-l-yellow-400";
        case "offer":
            return "border-l-green-400";
        case "rejected":
            return "border-l-red-400";
        default:
            return "border-l-gray-400";
    }
}