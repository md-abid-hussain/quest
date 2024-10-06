import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <CopilotKit runtimeUrl="/api/copilotkit">
            {children}
        </CopilotKit>
    );
}