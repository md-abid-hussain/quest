'use client'

import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import type {
    ToolbarSlot,
    TransformToolbarSlot
} from '@react-pdf-viewer/toolbar'
import { toolbarPlugin } from '@react-pdf-viewer/toolbar'
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation'
import { Document } from '@prisma/client'
import { CopilotSidebar } from "@copilotkit/react-ui";
import { useCopilotReadable } from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";
import { Box, Card } from '@radix-ui/themes';

export default function DocumentPage({ currentDoc }: { currentDoc: Document }) {

    const toolbarPluginInstance = toolbarPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

    const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
        ...slot,
        Download: () => <></>,
        SwitchTheme: () => <></>,
        Open: () => <></>,
    });

    const docUrl = currentDoc.fileUrl;

    useCopilotReadable({
        description: "Chat Id to be sent with each request to the server",
        value: currentDoc.id
    });

    useCopilotChatSuggestions({
        instructions: `This is an rag application so suggest question related to documents`,
    });

    return (
        <Box>
            <CopilotSidebar
                instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
                labels={{
                    title: "Popup Assistant",
                    initial: "Need any help?",
                }}

                onSubmitMessage={(message) => {
                    console.log(message);
                }}


            />
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js" >
                <Box
                    className={`w-full h-[80vh] flex-col text-white !important`}
                >
                    <Box
                        className="align-center bg-[#eeeeee] flex p-1"
                        style={{
                            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
                    </Box>
                    <Viewer fileUrl={docUrl as string}
                        plugins={[toolbarPluginInstance, pageNavigationPluginInstance]}
                    />

                </Box>
            </Worker>
        </Box>
    )

}