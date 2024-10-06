import { Box, Container, Heading, Text, Button, Flex, Card } from "@radix-ui/themes";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
    return (
        <Box>
            <Container p={"6"}>
                <Flex direction={{ initial: "column", md: "row" }} align="center" justify="between" className="gap-8">
                    <Box className="flex-1 text-center md:text-left">
                        <Heading as="h1" size="8" className="mb-4">
                            Welcome to QuestRAG
                        </Heading>
                        <Text size="3" className="mb-4" as="p">
                            QuestRAG is your ultimate solution for managing and analyzing documents efficiently. Our platform offers a range of features designed to streamline your workflow and enhance productivity.
                        </Text>
                        <Text size="3" className="mb-4" as="p">
                            Whether you are a student, researcher, or professional, QuestRAG provides the tools you need to organize, search, and analyze your documents with ease. Get started today and experience the power of intelligent document management.
                        </Text>
                        <Link href="/dashboard"><Button className="hover:cursor-pointer" >
                            Get Started
                        </Button>
                        </Link>
                    </Box>
                    <Card className="flex-1">
                        <Image
                            src="/images/hero-image.jpg"
                            alt="Hero Image"
                            width={500}
                            height={500}
                            className="w-full h-auto rounded-lg"
                        />
                    </Card>
                </Flex>
            </Container>
        </Box>
    );
}