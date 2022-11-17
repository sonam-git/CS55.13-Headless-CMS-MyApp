import Layout from '../components/layout';
import {getAllIds, getData} from '../lib/data';


export async function getStaticProps({ params }) {
  const itemData = await getData (params.id);
  //console.log(itemData);
  return {
    props: {
      itemData
    }
  };
}

export async function getStaticPaths() {
  const paths2 = await getAllIds();
  return {
    paths:paths2,
    fallback: false
  };
}



export default function Entry({itemData}){
//console.log(itemData);
var regex = /(<([^>]+)>)/ig
,   content = itemData.post_content
,   result = content.replace(regex, "");

content = itemData.post_content
  return(
    <Layout>
      <div className="row text-center">
        <h1>{itemData.post_title}</h1>
      </div>
      <article className="card col-6 m-auto">
        <div className="card-body">
            <h5 className="card-title">{result}</h5>
        </div>
        
        
      </article>
    </Layout>
  )
}
