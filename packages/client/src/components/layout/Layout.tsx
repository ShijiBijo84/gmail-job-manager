import Inbox from "./Inbox.tsx"
import SideBar from "./SideBar.tsx"
import type { EnrichedEmail } from "@gmail-job-manager/shared"

type LayoutProps = {
    emails: EnrichedEmail[]
}

const Layout = ({ emails }: LayoutProps) => {
    return (
        <div className="Flex flex-row">
            <div className="w-1/4 bg-gray-100 h-screen">
                <SideBar />
            </div>
            <div className="w-3/4 bg-white h-screen overflow-y-auto">
                <Inbox emails={emails} />
            </div>
        </div>
    )
}
export default Layout