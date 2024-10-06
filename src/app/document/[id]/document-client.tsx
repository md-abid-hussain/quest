'use client'

import { useRef, useEffect, useState } from 'react'
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
import { Spinner } from '@radix-ui/themes';

export default function DocumentPage({ currentDoc }: { currentDoc: Document }) {
    const [docUrl, setDocUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const fetchUrl = async () => {
            try {
                const res = await fetch('/api/files/url', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cid: currentDoc.cid
                    }),
                });
                const data = await res.json();
                setDocUrl(data.url)
                console.log(data)
                setLoading(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
            }
        }
        fetchUrl()
    }, [])
    const toolbarPluginInstance = toolbarPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;

    const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
        ...slot,
        Download: () => <></>,
        SwitchTheme: () => <></>,
        Open: () => <></>,
    });



    return (
        <div className=''>
            {loading ? <Spinner /> : (<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js" >
                <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
                <Viewer fileUrl={docUrl as string}
                    plugins={[toolbarPluginInstance, pageNavigationPluginInstance]}
                />
            </Worker>)}
        </div>
    )

}