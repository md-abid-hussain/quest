import { Box, Heading, Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function HomePage() {
  return (
    <Box>
      <Heading as="h5" >Home Page</Heading>
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          You will need admin privileges to install and access this application.
        </Callout.Text>
      </Callout.Root>

    </Box>
  )
}