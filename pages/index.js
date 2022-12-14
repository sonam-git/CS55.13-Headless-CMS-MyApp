import Head from "next/head";
import { Box, Heading, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { getSortedList } from "../lib/data";
import { getSortedProductList } from "../lib/productData";
import { getSortedAddressList } from "../lib/addressData";

export async function getStaticProps() {
  const allData = await getSortedList();
  const productData = await getSortedProductList();
  const addressData = await getSortedAddressList();
  return {
    props: {
      allData,
      productData,
      addressData,
    },
  };
}

export default function Home({ allData, productData, addressData }) {
  return (
    <Box>
      <Head>
        <title>Headless CMS App</title>
      </Head>
      <Box border="2px solid black" borderRadius={15}>
        <Heading
          bg="teal"
          padding="0.5rem 0"
          color="white"
          as="h1"
          textAlign={"center"}
          borderTopRadius={13}
        >
          My Posts
        </Heading>
        <Box padding="1em">
          <Heading textAlign="center" as="h2">
           Contacts
          </Heading>
          <SimpleGrid columns={[1]} spacing="10px">
            {allData.map(({ id, name }) => (
              <Link key={id} href={`/contacts/${id}`}>
                <Box
                  textAlign={"center"}
                  padding="2rem 0"
                  _hover={{
                    opacity: "0.7",
                    color: "teal.500",
                    transform: "scale(0.9)",
                  }}
                  bg="Gainsboro"
                  border="2px solid black"
                  height="90px"
                  borderRadius={15}
                >
                  <Text fontWeight="800">{name}</Text>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
          <Heading textAlign={"center"} as="h2">
           Products
          </Heading>
          <SimpleGrid columns={[1]} spacing="10px">
            {productData.map(({ id, name }) => (
              <Link key={id} href={`/products/${id}`}>
                <Box
                  textAlign={"center"}
                  padding="2rem 0"
                  _hover={{
                    opacity: "0.7",
                    color: "teal.500",
                    transform: "scale(0.9)",
                  }}
                  bg="Gainsboro"
                  border="2px solid black"
                  height="90px"
                  borderRadius={15}
                >
                  <Text fontWeight="800">{name}</Text>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
          <Heading textAlign={"center"} as="h2">
            Addresses
          </Heading>
          <SimpleGrid columns={[1]} spacing="10px">
            {addressData.map(({ id, name }) => (
              <Link key={id} href={`/addresses/${id}`}>
                <Box
                  textAlign={"center"}
                  padding="2rem 0"
                  _hover={{
                    opacity: "0.7",
                    color: "teal.500",
                    transform: "scale(0.9)",
                  }}
                  bg="Gainsboro"
                  border="2px solid black"
                  height="90px"
                  borderRadius={15}
                >
                  <Text fontWeight="800">{name}</Text>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
   
  );
}