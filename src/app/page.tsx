import { Box, Container, Heading, Text, Flex, Card, Button } from "@radix-ui/themes";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";

export default function HomePage() {
  return (
    <Box className="min-h-[200vh]">
      <Header />
      <Box>
        <Container>
          {/* Hero Section */}
          <HeroSection />
          {/* Features Section */}
          <Box className="py-16">
            <Heading as="h2" size="3" className="mb-8 text-center">
              Features
            </Heading>
            <Flex justify="between" className="gap-8">
              <Card variant="surface" className="p-4 flex-1">
                <Heading as="h3" size="2" className="mb-2">
                  Feature 1
                </Heading>
                <Text size="3">
                  Description of feature 1.
                </Text>
              </Card>
              <Card variant="surface" className="p-4 flex-1">
                <Heading as="h3" size="2" className="mb-2">
                  Feature 2
                </Heading>
                <Text size="3">
                  Description of feature 2.
                </Text>
              </Card>
              <Card variant="surface" className="p-4 flex-1">
                <Heading as="h3" size="2" className="mb-2">
                  Feature 3
                </Heading>
                <Text size="3">
                  Description of feature 3.
                </Text>
              </Card>
            </Flex>
          </Box>

          {/* Tech Stack Section */}
          <Box className="py-16">
            <Heading as="h2" size="3" className="mb-8 text-center">
              Tech Stack
            </Heading>
            <Flex justify="center" className="gap-8">
              <Card variant="surface" className="p-4 flex-1">
                <Heading as="h3" size="2" className="mb-2">
                  Next.js
                </Heading>
                <Text size="3">
                  A React framework for production.
                </Text>
              </Card>
              <Card variant="surface" className="p-4 flex-1">
                <Heading as="h3" size="2" className="mb-2">
                  Radix UI
                </Heading>
                <Text size="3">
                  Accessible, unstyled UI components.
                </Text>
              </Card>
              <Card variant="surface" className="p-4 flex-1">
                <Heading as="h3" size="2" className="mb-2">
                  Prisma
                </Heading>
                <Text size="3">
                  Next-generation ORM for Node.js & TypeScript.
                </Text>
              </Card>
            </Flex>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}