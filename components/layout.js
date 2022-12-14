import Head from "next/head";
import { Link, Button, Box, Center } from "@chakra-ui/react";

export default function Layout({ children, home }) {
  return (
    <Box>
      <Head>
        <title>Final Project App</title>
      </Head>

      <main>{children}</main>
      <Center m="1em">
        <Button  borderRadius={15}
        _hover={{
          opacity: "0.7",
          transform: "scale(0.9)",
          bg: "white"
        }}
       >
          {" "}
          {!home && <Link href="/">← Back to home</Link>}
        </Button>
      </Center>
    </Box>
  );
}