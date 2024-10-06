import { Box, Container } from "@radix-ui/themes";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";

export default function HomePage() {
  return (
    <Box>
      <Header />
      <Box>
        <Container>
          <HeroSection />
        </Container>
      </Box>
    </Box>
  );
}