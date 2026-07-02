import { Badge } from "#components/ui/badge";
import { FILTERS } from "#constants/filters.constants";
import { STATUS_CONFIG } from "#constants/status.constants";
import type { StatusFilter } from "src/types/email.types";

type SideBarProps = {
    counts: Record<string, number>;
    filter: string;
    onFilterChange: (filter: StatusFilter) => void;
}

const SideBar = ({ counts, filter, onFilterChange }: SideBarProps) => {
    return (<>
        <h3 className="mb-4 text-lg font-semibold">Mail Inbox</h3>
        <nav className="space-y-2">
            {FILTERS.map((status) => {
                const isActive = filter === status;
                const label = status === 'all' ? 'All' : STATUS_CONFIG[status].label;
                const count = status === 'all' ? counts['all'] : counts[status] || 0;
                return (
                    <button
                        key={status}
                        onClick={() => onFilterChange(status)}
                        className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                        <span>{label}</span>
                        <Badge
                            variant={isActive ? "secondary" : "outline"}
                        >
                            {count}
                        </Badge>
                    </button>
                )
            })}
        </nav>
    </>)
}
export default SideBar;