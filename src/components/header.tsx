import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs';

import Link from 'next/link';
import { Flex, Box, Text } from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';

export default function Header() {
    return (
        <header>
            <Flex align="center" justify="between">
                <Text >
                    Create Next App
                </Text>
                <nav>
                    <Flex>
                        <Box >
                            <Link href="/" passHref>
                                <Button variant="ghost" className="hover:underline">
                                    Home
                                </Button>
                            </Link>
                        </Box>
                        <Box >
                            <Link href="/dashboard" passHref>
                                <Button variant="ghost" className="hover:underline">
                                    Dashboard
                                </Button>
                            </Link>
                        </Box>
                    </Flex>
                </nav>
            </Flex>
        </header>
    );
}