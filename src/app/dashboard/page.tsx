import FileUpload from "./upload";
import prisma from "@/utils/prisma";
import { currentUser } from '@clerk/nextjs/server';
import type { User } from '@clerk/nextjs/server';
import Link from "next/link";
import { Box, Heading, Text } from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';

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
        <Box className="p-4">
            <Heading as="h1" className="mb-4">Dashboard</Heading>
            <Text className="mb-8">Welcome to the dashboard</Text>
            <FileUpload />

            <Box className="mt-8">
                <Heading as="h2" className="mb-4">Your Documents</Heading>
                <Box className="list-disc pl-5">
                    {docsList.map((doc) => (
                        <Box key={doc.id} className="mb-2">
                            <Link href={`/document/${doc.id}`}>
                                <Button variant="ghost" className="hover:underline">
                                    {doc.fileName}
                                </Button>
                            </Link>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}