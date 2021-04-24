import Head from "next/head";
import { useColorMode, Heading, Text, Flex, Stack } from "@chakra-ui/react";

import Container from "../components/Container";

export default function Index() {
  const { colorMode } = useColorMode();
  const colorSecondary = {
    light: "gray.700",
    dark: "gray.400",
  };
  return (
    <Container>
      <Head>
        <title>Home | Okumu Justine</title>
      </Head>
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="800px"
        px={2}
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="800px"
        >
          <Heading mb={2}>Hi, I'm Okumu Justine</Heading>
          <Text color={colorSecondary[colorMode]}>
            Am a Tech advocate and a motivated full-stack software Developer.
          </Text>
        </Flex>
      </Stack>
    </Container>
  );
}
