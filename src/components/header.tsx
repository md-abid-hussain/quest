import Link from 'next/link';
import { Flex, Heading, Card } from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';

export default function Header() {
    return (
        <header className='p-2 sticky top-0 z-10'>
            <Card variant='surface'>
                <Flex align="center" justify="between">
                    <Link href="/">
                        <Heading as="h2">
                            QuestRAG
                        </Heading>
                    </Link>
                    <Link href="/dashboard">
                        <Button className='hover:cursor-pointer'>
                            Get Started
                        </Button>
                    </Link>
                </Flex>
            </Card>
        </header>
    );
}