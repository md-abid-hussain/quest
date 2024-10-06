"use client";

import { Button, Card, Heading, Spinner } from "@radix-ui/themes";
import { UploadIcon } from "@radix-ui/react-icons";
import * as Form from '@radix-ui/react-form';
import { useState } from "react";
import { PutBlobResult } from "@vercel/blob";

export default function FileUpload() {
    const [file, setFile] = useState<File>();
    const [fileName, setFileName] = useState<string>("");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadFile = async () => {
        try {
            if (!file) {
                setError("Please select a file to upload.");
                return;
            }

            setUploading(true);
            setError(null);

            const data = new FormData();
            data.set("file", file);
            const uploadRequest = await fetch("/api/files", {
                method: "POST",
                body: data,
            });
            const newBlob = (await uploadRequest.json()) as PutBlobResult;
            console.log(newBlob);

            await ingestPdf(newBlob.url, fileName);
            setUploading(false);
            setFile(undefined);
            setFileName("");
        } catch (e) {
            console.log(e);
            setUploading(false);
            setError("Trouble uploading file");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target?.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value);
    };

    async function ingestPdf(fileUrl: string, fileName: string) {
        const res = await fetch('/api/ingestPdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileUrl,
                fileName,
            }),
        });

        const data = await res.json();
        console.log(data);
    }

    return (
        <main>
            <Card>
                <Form.Root onSubmit={(e) => e.preventDefault()}>
                    <Form.Field name="file" className="mb-2.5 grid gap-2">
                        <div className="flex items-baseline justify-between">
                            <Form.Label>Upload Your Documents</Form.Label>
                            <Form.Message
                                className="text-[13px] text-red-600 opacity-80"
                                match="valueMissing"
                            >
                                Please select a file
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <input
                                type="file"
                                onChange={handleChange}
                                required
                                className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                accept="application/pdf"
                            />
                        </Form.Control>
                    </Form.Field>

                    {error && <p className="text-red-600">{error}</p>}

                    <Form.Field name="fileName" className="mb-2.5 grid gap-2">
                        <div className="flex items-baseline justify-between">
                            <Form.Label>Name of the document</Form.Label>
                            <Form.Message
                                className="text-[13px] text-red-600 opacity-80"
                                match="valueMissing"
                            >
                                Enter the file name
                            </Form.Message>
                        </div>
                        <Form.Control asChild>
                            <input
                                type="text"
                                onChange={handleNameChange}
                                required
                                className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={fileName}
                            />
                        </Form.Control>
                    </Form.Field>

                    {error && <p className="text-red-600">{error}</p>}

                    <Form.Submit asChild>
                        <Button
                            disabled={uploading}
                            onClick={uploadFile}
                            className="mt-2.5 box-border inline-flex h-[35px] w-full items-center justify-center rounded px-[15px] font-medium leading-none text-violet11 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
                        >
                            <UploadIcon />
                            {uploading ? (
                                <>
                                    Uploading <Spinner />
                                </>
                            ) : (
                                "Upload"
                            )}
                        </Button>
                    </Form.Submit>
                </Form.Root>
            </Card>
        </main>
    );
}