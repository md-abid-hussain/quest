import { Box } from "@radix-ui/themes";
import DashboardHeader from "@/components/dashboard-header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box>
            <DashboardHeader />
            {children}
        </Box>
    );
}