import Layout from '../components/layout';
import {getAllIds, getData} from '../lib/data';
import Link from 'next/link'

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
//var regex = /(<([^>]+)>)/ig
//,   content = itemData.post_content
//,   result = content.replace(regex, "");

//content = itemData.post_content
  return(
    <Layout>
      <div className="row text-center">
        <h1>{itemData.post_title}</h1>
      </div>
      <article className="card col-6 m-auto">
        <div className="card-body ">
        <h6 className="card-subtitle mb-2 text-muted">Created: {itemData.post_date}</h6>
        <h6 className="card-subtitle mb-2 text-muted">By: {itemData.user_login}</h6>
        <div className="card-text" dangerouslySetInnerHTML={{__html: itemData.post_content}}/>
        <div className="card-text" dangerouslySetInnerHTML={{__html: itemData.acf_fields}}/>
        </div>
        <Link href="/">
            <a className="btn btn-primary mt-3 "  >← Back to home</a>
          </Link>
      </article>
    </Layout>
  )
}
