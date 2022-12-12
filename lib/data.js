//Before using got must do: npm install got@9.6.0
import got from "got";

//define URL for rest endpoint
const dataURL="https://dev-cs55-13-sonam.pantheonsite.io/wp-json/twentytwentyone-child/v1/contacts";

//function returns ids for all json objects in array
export async function getAllIds() {

 let jsonString;
 try{
  //next line uses got synchronously to retrieve via https our json data from wp site
      jsonString = await got(dataURL);
      //console.log(jsonString.body);
 }catch(error){
      jsonString.body= [];
      console.log(error);
 }
 const jsonObj = JSON.parse(jsonString.body);

 // loop thru each object in array returned as JSON
 jsonObj.forEach(
  function(item) {
    // reformat string contained in delimited acf field data, add curlies and quotes
    let x = '{"' + item.acf_fields + '"}';
    // https://www.w3schools.com/jsref/jsref_replace.asp
    // x = x.replace(/,/g,'","');
    x = x.replaceAll(',','","');
    // x = x.replace(/:/g,'":"');
    x = x.replaceAll(':','":"');
    // now that we have a string that is in valid json format, convert it to json
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
    let y = JSON.parse(x);
    console.log(y);
    console.log(y.first_name);
    item.acf_fields = y;
  }
);
  //use map() on array to extract just id properties into new array of object values
  return jsonObj.map(item => {
    return {
      params: {
        id: item.ID.toString()
      }
    }
  });
}



// function returns names and ids for all json objects in array, sorted by name property
export async function getSortedList() {
  let jsonString;
  try {
    // next line uses got synchronously to retrive via https our json data from wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch(error) {
    jsonString.body = [];
    console.log(error);
  }
const jsonObj = JSON.parse(jsonString.body);

// loop thru each object in array returned as JSON
jsonObj.forEach(
  function(item) {
    // reformat string contained in delimited acf field data, add curlies and quotes
    let x = '{"' + item.acf_fields + '"}';
    // https://www.w3schools.com/jsref/jsref_replace.asp
    // x = x.replace(/,/g,'","');
    x = x.replaceAll(',','","');
    // x = x.replace(/:/g,'":"');
    x = x.replaceAll(':','":"');
    // now that we have a string that is in valid json format, convert it to json
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
    let y = JSON.parse(x);
    console.log(y);
    console.log(y.first_name);
    item.acf_fields = y;
  }
);
  
  //sort by post_title name
  /*jsonObj.sort(function (a, b) {
      return a.post_title.localeCompare(b.post_title);
  });*/

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

// loop thru each object in array returned as JSON
jsonObj.forEach(
  function(item) {
    // reformat string contained in delimited acf field data, add curlies and quotes
    let x = '{"' + item.acf_fields + '"}';
    // https://www.w3schools.com/jsref/jsref_replace.asp
    // x = x.replace(/,/g,'","');
    x = x.replaceAll(',','","');
    // x = x.replace(/:/g,'":"');
    x = x.replaceAll(':','":"');
    // now that we have a string that is in valid json format, convert it to json
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
    let y = JSON.parse(x);
    console.log(y);
    console.log(y.first_name);
    item.acf_fields = y;
  }
);

console.log(jsonObj);

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