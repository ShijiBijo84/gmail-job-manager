import Inbox from "./Inbox.tsx"
import type { EnrichedEmail } from "@gmail-job-manager/shared"

type LayoutProps = {
    emails: EnrichedEmail[]
}

const Layout = ({ emails }: LayoutProps) => {
    return (
        <Inbox emails={emails} />
    )
}
export default Layout