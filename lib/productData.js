//Before using got must do: npm install got@9.6.0
import got from "got";

//define URL for rest endpoint
const dataURL="https://dev-cs55-13-sonam.pantheonsite.io/wp-json/twentytwentyone-child/v1/products";

// function returns ids for all json objects in array
export async function getAllIds2() {
    let jsonString;
    try {
      // next line uses got synchronously to retrieve via https our json data from wp site
      jsonString = await got(dataURL);
      console.log(jsonString.body);
    } catch (error) {
      jsonString.body = [];
      console.log(error);
    }
  
    // convert string from file into json array object
    // const jsonObj = JSON.parse(jsonString);
    const jsonObj = JSON.parse(jsonString.body);
  
    // use map() on array to extract just id properties into new array of obj values
    return jsonObj.map((item) => {
      return {
        params: {
          id: item.ID.toString(),
        },
      };
    });
  }
  
  // function returns names and ids for all json objects in array, sorted by name property
  export async function getSortedProductList() {
    let jsonString;
    try {
      // next line uses got synchronously to retrieve via https our json data from wp site
      jsonString = await got(dataURL);
      console.log(jsonString.body);
    } catch (error) {
      jsonString.body = [];
      console.log(error);
    }
  
    const jsonObj = JSON.parse(jsonString.body);
  
    // sort json array by name property
    jsonObj.sort(function (a, b) {
      return a.post_title.localeCompare(b.post_title);
    });
  
    // use map() on array to extract just id + name properties into new array of obj values
    return jsonObj.map((item) => {
      return {
        id: item.ID.toString(),
        name: item.post_title,
      };
    });
  }
  
  export async function getData2(idRequested) {
    let jsonString;
    try {
      // next line uses got synchronously to retrieve via https our json data from wp site
      jsonString = await got(dataURL);
      console.log(jsonString.body);
    } catch (error) {
      jsonString.body = [];
      console.log(error);
    }
  
    // convert string from file into json array object
    // const jsonObj = JSON.parse(jsonString);
    const jsonObj = JSON.parse(jsonString.body);
  
    // find object value in array that has matching id
    const objMatch = jsonObj.filter((obj) => {
      return obj.ID.toString() === idRequested;
    });
  
    // extract object value in filtered array if any
    let objReturned;
    if (objMatch.length > 0) {
      objReturned = objMatch[0];
    } else {
      objReturned = {};
    }
    // console.log(objReturned);
  
    // return object value found
    return objReturned;
  }