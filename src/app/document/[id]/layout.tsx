import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import DashboardHeader from "@/components/dashboard-header";
import { Box } from "@radix-ui/themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <CopilotKit runtimeUrl="/api/copilotkit">
            <DashboardHeader />
            {children}
        </CopilotKit>
    );
}