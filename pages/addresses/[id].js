import Layout from "../../components/layout";
import {
  AspectRatio,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Box,
  Center,
} from "@chakra-ui/react";
import { getAllIds3, getData3 } from "../../lib/addressData";

export async function getStaticProps({ params }) {
  const itemData = await getData3(params.id);

  return {
    props: {
      itemData,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const paths = await getAllIds3();

  return {
    paths,
    fallback: false,
  };
}

export default function Entry({ itemData }) {
  
  let x = '{"' + itemData.acf_fields + '"}';
      x = x.replace(/,/g,'","');
      x = x.replace(/:/g,'":"');
      console.log(x)
      var y = JSON.parse(x);
     console.log(y)

     return (
      <Layout>
        <Center>
          <Card bg="LightBlue" border="3px black solid" width={["75%"]}borderRadius={15}>
            <CardHeader>
              <Heading textAlign={"center"}>{itemData.post_title}</Heading>
            </CardHeader>
            <CardBody className="card  mx-2 text-bg-light mb-3">
            <h5 className="card-text px-2 py-2">Place Name : {y.place_name}</h5>
          <p className="card-text px-2 ">Street Name : {y.street_name}</p>
          <p className="card-text px-2"> Town : {y.town}</p>
          <p className="card-text px-2 py-2">State : {y.state}, Zip Code : {y.zip_code} </p>
            </CardBody>
          </Card>
        </Center>
      </Layout>
    );
}