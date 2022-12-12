import { getSortedList } from '../lib/data3';
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


export default function Home({allData}){
  return(
    <Layout home>
    <div className='container'>
      <div className='row'>
      <div className='col-12'>
          <h1 className="text-center p-2">My Address</h1>
      </div> 
      </div>
       <div className='row text-center'>
        <div className='col-12'>
            <div className="list-group d-inline-flex">
                  {allData.map(({id, name})=>(
                     <Link key={id} href={'/address/${id}'}>
                    <a className='list-group-item list-group-active '>
                      {name}
                    </a>
                    </Link>
                  ))}
                  <Link href="/">
            <a className="btn btn-primary mt-3 "  >← Back to home</a>
          </Link>
       </div>
        </div>
      </div>
    </div>  
    </Layout> 
  )
}