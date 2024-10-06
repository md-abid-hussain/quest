import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import DashboardHeader from "@/components/dashboard-header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <CopilotKit runtimeUrl="/api/copilotkit" agent="rag">
            <DashboardHeader />
            {children}
        </CopilotKit>
    );
}