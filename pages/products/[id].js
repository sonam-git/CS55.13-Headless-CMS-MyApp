import Layout from "../../components/layout";
import {
  AspectRatio,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Center,
  Text,
  Image
} from "@chakra-ui/react";
import { getAllIds2, getData2 } from "../../lib/productData";

export async function getStaticProps({ params }) {
  const itemData = await getData2(params.id);

  return {
    props: {
      itemData,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const paths = await getAllIds2();

  return {
    paths,
    fallback: false,
  };
}

export default function Entry({ itemData }) {
  //itemData.acf_fields is just a block of data and I am trying to split the data up.
  //this is a temporary solution

  let x = '{"' + itemData.acf_fields + '"}';
      x = x.replace(/,/g,'","');
      x = x.replace(/:/g,'":"');
      console.log(x)
      var y = JSON.parse(x);
     console.log(y);

     let image = y.image;
     image = image.slice(5);
     image = "https:" + image;
     
    
  return (
    <Layout>
      <Center>
        <Card bg="AntiqueWhite" border="3px black solid" width={["75%"]} borderRadius={15}>
          <CardHeader>
            <Heading textAlign={"center"}>{itemData.post_title}</Heading>
          </CardHeader>
          <CardBody  className="card  mx-2 text-bg-light mb-3">
          <Image
              borderTop="2px black solid"
              src={image}
              alt={y.product_title}
              w="100%"
            />
        <h5 className="card-text px-2 py-2">Product Name : {y.product_name}</h5>
        <h5 className="card-text px-2">Price : ${y.price}.00</h5>
        <p className="card-text px-2 py-2">Product Description : {y.product_description}</p>
          </CardBody>
          
        </Card>
      </Center>
    </Layout>
  );
}