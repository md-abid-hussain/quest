'use client'

import Link from 'next/link';
import { Flex, Heading, Card, Separator } from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

export default function DashboardHeader() {
    const pathname = usePathname();
    return (
        <header className='p-2 sticky top-0 z-10'>
            <Card variant='surface'>
                <Flex align="center" justify="between">
                    <Flex className='gap-2' align="center">
                        <Link href={"/"}><Heading as="h2">
                            QuestRAG
                        </Heading>
                        </Link>
                        <Separator orientation="vertical" size={"2"} />
                        <Heading as="h3" size={"4"}>
                            {pathname === "/dashboard" ? "Dashboard" : "Document"}
                        </Heading>
                    </Flex>
                    <Flex>
                        {pathname !== "/dashboard" && <Link href="/">
                            <Button className='hover:cursor-pointer'>
                                Dashboard
                            </Button>
                        </Link>}
                        <UserButton />
                    </Flex>
                </Flex>
            </Card>
        </header>
    );
}