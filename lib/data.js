//file system package/module
import fs from 'fs';
//path
import path from 'path';
//use path to build a filepath to our data subdirectory
const dataDir = path.join(process.cwd(), 'data');

//function returns ids for all json objects in array
export function getAllIds(){
  const filePath = path.join(dataDir, 'cars.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const jsonObj = JSON.parse(jsonString);
  const returnedData = jsonObj.map(item=> {
    return{
      params: {
      id: item.id.toString()
      }
    }
  });
  //console.log(returnedData);
  return returnedData;
}

//function returns names and ids for all json objects in array,sorted by name property
export function getSortedList(){
  const filepath = path.join( dataDir,"cars.json");
  
  const jsondata = fs.readFileSync(filepath,"utf8");

  const jsonObj = JSON.parse(jsondata);

  jsonObj.sort(
    function(a,b){
      return a.name.localeCompare(b.name);
    }
  );
  //use map() on array to extract just id + name properties into new array of obj values
  return jsonObj.map(item => {
    return{
      id: item.id.toString(),
      name: item.name
    }
  });
}

//async function to get the complete data for just one person
//used by getStaticProps() in [id].js
export async function getData(idRequested){
  const filePath = path.join(dataDir, 'cars.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const jsonObj = JSON.parse(jsonString);
  //find the object value in array that has matching  id
  const objMatch = jsonObj.filter( obj => {
    return obj.id.toString() === idRequested;
  }
                                 );
  //extract object value in filtered array if any
  let objReturned;
  if(objMatch.length > 0) {
    objReturned = objMatch[0];
  } else{
    objReturned = {};
  }
 return objReturned; 
}

