import FileUpload from "./upload";
import prisma from "@/utils/prisma";
import { currentUser } from '@clerk/nextjs/server';
import type { User } from '@clerk/nextjs/server';
import Link from "next/link";
import { Box, Heading, Text, Container, Flex, Card } from '@radix-ui/themes';

export default async function DashboardPage() {
    const user: User | null = await currentUser();

    const docsList = await prisma.document.findMany({
        where: {
            userId: user?.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <Box className="p-4 min-h-screen">
            <Container>
                <Card variant="surface" className="p-6 mb-8 shadow-lg">
                    <Flex direction={{ initial: "column", md: "row" }} align="center" justify="between" className="gap-8">
                        <Box className="flex-1 text-center md:text-left">
                            <Heading as="h1" size="4" className="mb-4">
                                Upload Your Documents
                            </Heading>
                            <Text size="3" className="mb-4">
                                Welcome to the dashboard. Here you can upload your documents for analysis and management.
                                Click the button below to start uploading your files.
                            </Text>
                        </Box>
                        <Box className="flex-1">
                            <FileUpload />
                        </Box>
                    </Flex>
                </Card>

                <Card variant="surface" className="p-6 shadow-lg">
                    <Heading as="h2" size="3" className="mb-4 text-center">
                        Your Documents
                    </Heading>
                    <Box className="flex flex-col gap-4">
                        {docsList.length > 0 ? (
                            docsList.map((doc) => (
                                <Card key={doc.id} variant="surface" className="p-4 shadow-md">
                                    <Link href={`/document/${doc.id}`} className="block hover:underline hover:text-white p-2 hover:bg-[#0588F0] hover:rounded-md">
                                        {doc.fileName}
                                    </Link>
                                    <Text size="2" className="text-gray-600">
                                        Uploaded on: {new Date(doc.createdAt).toLocaleDateString()}
                                    </Text>
                                </Card>
                            ))
                        ) : (
                            <Text size="3" className="text-center">
                                No documents found. Start by uploading a document.
                            </Text>
                        )}
                    </Box>
                </Card>
            </Container>
        </Box >
    );
}