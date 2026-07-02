
import type { ApplicationStatus } from "@gmail-job-manager/shared";

export const STATUS_CONFIG: Record<ApplicationStatus, {
    label: string;
    border: string;
    badge: string;
}> = {
    "applied": {
        label: "Applied",
        border: "border-l-amber-500",
        badge: "bg-amber-100 text-amber-700",
    },
    "interview": {
        label: "Interview",
        border: "border-l-yellow-500",
        badge: "bg-yellow-100 text-yellow-700",
    },
    "offer": {
        label: "Offer",
        border: "border-l-green-500",
        badge: "bg-green-100 text-green-700",
    },
    "rejected": {
        label: "Rejected",
        border: "border-l-red-500",
        badge: "bg-red-100 text-red-700",
    },
    "unknown": {
        label: "Unknown",
        border: "border-l-gray-500",
        badge: "bg-gray-100 text-gray-700",
    },
}