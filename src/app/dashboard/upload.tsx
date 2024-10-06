"use client";

import { TextField, Button, Text, Spinner } from "@radix-ui/themes";
import { UploadIcon } from "@radix-ui/react-icons";
import * as Form from '@radix-ui/react-form'
import { useState } from "react";

export default function FileUpload() {
    const [file, setFile] = useState<File>();
    const [url, setUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const uploadFile = async () => {
        try {
            if (!file) {
                return;
            }

            setUploading(true);
            const data = new FormData();
            data.set("file", file);
            const uploadRequest = await fetch("/api/files", {
                method: "POST",
                body: data,
            });
            const payload = await uploadRequest.json();
            console.log(payload);
            setUrl(payload.url);
            await ingestPdf(payload.url, payload.cid, file.name);
            setUploading(false);
            setFile(undefined)
        } catch (e) {
            console.log(e);
            setUploading(false);
            alert("Trouble uploading file");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target?.files?.[0]);
    };

    async function ingestPdf(fileUrl: string, cid: string, fileName: string) {
        let res = await fetch('/api/ingestPdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileUrl,
                fileName,
                cid: cid
            }),
        });

        let data = await res.json();

        console.log(data)
    }

    return (
        <main className="">
            <Form.Root className="w-[300px]">
                <Form.Field name="file" className="mb-2.5 grid gap-2">
                    <div className="flex items-baseline justify-between">
                        <Form.Label>Select PDF to upload</Form.Label>
                        <Form.Message
                            className="text-[13px] text-white opacity-80"
                            match="valueMissing"
                        >
                            Please select a file
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input type="file" onChange={handleChange} required className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                    </Form.Control>
                </Form.Field>

                <Form.Submit asChild>
                    <Button disabled={uploading} onClick={uploadFile} className="mt-2.5 box-border inline-flex h-[35px] w-full items-center justify-center rounded px-[15px] font-medium leading-none text-violet11 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
                        <UploadIcon />{uploading ? <>Uploading <Spinner /></> : "Upload"}
                    </Button>
                </Form.Submit>

            </Form.Root>
        </main>
    );
}
