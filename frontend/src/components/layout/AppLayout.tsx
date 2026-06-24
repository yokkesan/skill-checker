type Props = {
    children: React.ReactNode;
};

function AppLayout({
    children,
}: Props) {
    return (
        <div className="app-layout">
            {children}
        </div>
    );
}

export default AppLayout;