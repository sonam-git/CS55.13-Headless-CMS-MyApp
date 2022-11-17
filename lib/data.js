import got from "got";

const dataURL="https://dev-cs55-13-sonam.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/2";

export async function getAllIds() {

 let jsonString;
 try{
      jsonString = await got(dataURL);
      //console.log(jsonString.body);
 }catch(error){
      jsonString.body= [];
      console.log(error);
 }
 const jsonObj = JSON.parse(jsonString.body);
  
  return jsonObj.map(item => {
    return {
      params: {
        id: item.ID.toString()
      }
    }
  });
}


export async function getSortedList() {
let jsonString;
  try{
    jsonString = await got(dataURL);
    //console.log(jsonString.body);
}catch(error){
    jsonString.body= [];
    console.log(error);
}
const jsonObj = JSON.parse(jsonString.body);
  
  //sort by post_title name
  jsonObj.sort(function (a, b) {
      return a.post_title.localeCompare(b.post_title);
  });

  // use map() on array to extract just id + name properties into new array of obj values
  return jsonObj.map(item => {
    return {
      id: item.ID.toString(),
      name: item.post_title
    }
  });
}

//function used by getStacticProps() in [id]
export async function getData(idRequested){
  let jsonString;
  try{
    jsonString = await got(dataURL);
   // console.log(jsonString.body);
}catch(error){
    jsonString.body= [];
    console.log(error);
}
const jsonObj = JSON.parse(jsonString.body);

  //returns an array with one element in it
  const objMatch= jsonObj.filter(obj =>{
    return obj.ID.toString()=== idRequested;
  });

  let objReturned;
  if(objMatch.length > 0){
    objReturned=objMatch[0]
    
  }
  else{
    //returns empty
    objReturned={}
  }
  //send back to dynamic routed page
  return objReturned;
}