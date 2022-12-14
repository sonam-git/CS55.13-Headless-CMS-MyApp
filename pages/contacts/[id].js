import Layout from "../../components/layout";
import {
  Image,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Center,
  Text,
} from "@chakra-ui/react";
import { getAllIds, getData } from "../../lib/data";

export async function getStaticProps({ params }) {
  const itemData = await getData(params.id);

  return {
    props: {
      itemData,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const paths = await getAllIds();

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
          <Card bg="AntiqueWhite" border="3px black solid" width={["75%"]} borderRadius={15}>
            <CardHeader>
              <Heading textAlign={"center"}>{itemData.post_title}</Heading>
            </CardHeader>
            <CardBody className="card  mx-2 text-bg-light mb-3">
            <p className="card-text px-2 py-2">First Name : {y.first_name}</p>
            <p className="card-text px-2">Last Name : {y.last_name}</p>
            <p className="card-text px-2">Phone :{ y.phone_number}</p>
            <p className="card-text px-2 py-2">Email : {y.email}</p>
            </CardBody>
          </Card>
        </Center>
      </Layout>
    );
}