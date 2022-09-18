/* Global Variables */
let UserData = {}; //holds the data sent by the user : zip-code , ...etc.

/* Creating a new date instance dynamically with JS    */
let d = new Date();
let newDate = d.getDate() + '.' + d.getMonth()+'.'+ d.getFullYear();

/******************************************************************/
/*  Adding an event listener to the button (id : generate)        */
/******************************************************************/
const button = document.getElementById("generate");
button.addEventListener("click", SendData); 



/******************************************************************/
/*    Sending Zip-code & Feelings to the server to process it     */
/******************************************************************/
function SendData(e){
  const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=' ;
  const api = '&units=metric&appid=ee56994ee7015d4ecc386a2b98fdcfa4';
  const zip_code = document.getElementById("zip").value;
	const user_resp = document.getElementById("feelings").value;

	/*      Zip code is saved at UserData object      */
	UserData.zipcode = zip_code;
	/*      User response is saved at UserData object      */
  UserData.feelings = user_resp;

  /* Calling the first function , and then the next using Promise Chain */
  getTemperature(baseURL , api , zip_code);

}



/***************************************************************************/
/* Receive temperature by sending a GET request url with api and zip code  */
/***************************************************************************/
const getTemperature = async (BaseURL, KEY, ZIP_CODE) => {
    /* In case User didn't enter any zipcode , use the default one */
    if(ZIP_CODE === ""){
           ZIP_CODE = "41511";//Default to my city : Ismailia , Egypt
      }
	const resp = await fetch(BaseURL+ZIP_CODE+KEY);
  try {
    const data = await resp.json();
     
    //Putting the temperature and other data into UserData object
    UserData.Temperature = data.main.temp;
   
    /* Calling postData function for a POST request sending data to server
         and then printing data on the webpage using Print_Data 
                          function */
     postData('/addWeatherData', UserData)
      .then(Print_Data(UserData));
   /* End of all functions */
  
    return data;
  } 
  catch(error) {
    /* Adding error message to the webpage */
    UserData.Temperature = "Error";
    Print_Data(UserData);

    console.log("error", error);
  }

  
}



/**************************************************************************************/
/* Get the response using POST Request and show it on the screen : temperature , date */
/**************************************************************************************/

 async function postData  (url = '', data = {}) {

 	/*      Here , we need to get the zip-code in the request 
 	            body/projectData
 	             */
  const response = await fetch(url, {
    method: 'POST', // POST method to send data in the body of request
    mode: 'cors', // Cross-allowance origin
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });  

  const New_Response = await response.json();

  return New_Response; // parses JSON response into native JavaScript objects
}




/***********************************************************************/
/*   Putting the response of the temperature and date on the page      */
/***********************************************************************/
function Print_Data (data){
  /* In case of invalid zipcode , print an error message for the user */
  if(data.Temperature === "Error"){
    document.getElementById("zipcode").innerHTML ="<p>Zip-code is not available</p>";
  }
  
  else{
      
	    document.getElementById("date").innerHTML = "<p>Date : " + newDate + "</p>";
	    document.getElementById("zipcode").innerHTML = "<p>Zip-code : " + data.zipcode + "</p>";
	    document.getElementById("content").innerHTML = "<p>User Response : " + data.feelings + "</p>";
      document.getElementById("temp").innerHTML = "<p>Temperature : " + data.Temperature + "</p>";      
     }
}









