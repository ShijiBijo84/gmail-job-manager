
type LayoutProps = {
    sidebar: React.ReactNode,
    children: React.ReactNode
}

const InboxLayout = ({ sidebar, children }: LayoutProps) => {
    return (
        <div className="mx-auto flex max-w-6xl gap-6 p-6">
            <aside className="w-64 shrink-0 border-r pr-4">
                {sidebar}
            </aside>

            <main className="flex-1 min-w-0">
                {children}
            </main>
        </div>
    )
}
export default InboxLayout