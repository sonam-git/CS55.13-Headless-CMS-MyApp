import { getSortedList } from '../lib/data';
import Layout from '../components/layout';
import Link from 'next/link';
//import FriendList from '../components/relationship';


export async function getStaticProps () {
  const allData = await getSortedList();
  
  return {
      props: {
          allData  
      },
      revalidate: 60
  }
};


export default function Home(){
  return(
    <Layout home>
    <div className='container'>
      <div className='row'>
      <div className='col-12'>
          <h1 className="text-center p-2">Headless CMS App</h1>
      </div> 
      </div>
       <div className='row text-center'>
        <div className='col-12'>
            <div className="list-group d-inline-flex">
            <Link href={'/contact'}>
      <a className="list-group-item list-group-item-action">Contacts</a>
      </Link>
      <Link href={'/product'}>
      <a className="list-group-item list-group-item-action">Products</a>
      </Link>
      <Link href={'/address'}>
      <a className="list-group-item list-group-item-action">Addresses</a>
      </Link>
       </div>
        </div>
      </div>
    </div>  
    </Layout> 
  )
}