import { getSortedList } from '../lib/data';
import Layout from '../components/layout';
import Link from 'next/link';
//import FriendList from '../components/relationship';


export async function getStaticProps () {
  const allData = await getSortedList();
  
  return {
      props: {
          allData
          
      }
  }
};


export default function Home({allData}){
  return(
    <Layout home>
    <div className='container'>
      <div className='row'>
      <div className='col-12'>
          <h1 className="text-center p-2">My Posts</h1>
          <h5 className="text-center p-2">Click the title below for more detail </h5>
      </div> 
      </div>
       <div className='row text-center'>
        <div className='col-12'>
            <div className="list-group d-inline-flex">
                  {allData.map(({id, name})=>(
                    <Link key={id} href={id}>
                    <a className='list-group-item list-group-active '>
                      {name}
                    </a>
                    </Link>
                  ))}
       </div>
        </div>
      </div>
    </div>  
    </Layout> 
  )
}