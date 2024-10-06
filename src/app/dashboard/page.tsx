"use client"

import FileUpload from "./upload";
import { CopilotKit } from "@copilotkit/react-core";

export default function DashboardPage() {
    return (

        <main className="">
            <CopilotKit
                runtimeUrl="/api/copilotkit"
                agent="rag">
                <h1 className="text-4xl">Dashboard</h1>
                <p className="text-lg">Welcome to the dashboard</p>
                <FileUpload />
            </CopilotKit>

        </main>
    );
}