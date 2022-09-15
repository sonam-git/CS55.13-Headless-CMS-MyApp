//file system package/module
import fs from 'fs';
//path
import path from 'path';
//use path to build a filepath to our data subdirectory
const dataDir = path.join(process.cwd(), "data");

//console.log(dataDir);
export default function handler(req, res){
  const filepath = path.join( dataDir,"cars.json");
  
  const jsondata = fs.readFileSync(filepath,"utf8");

  const jsonObj = JSON.parse(jsondata);

  jsonObj.sort(
    function(a,b){
      return a.name.localeCompare(b.name);
    }
  );
  
  res.status(200).json(jsonObj);
}