/* Setup empty JS object to act as endpoint for all routes  */
projectData = {};

         /* Require & Create Express to run server and routes   */
const express = require('express');


         /*           Start up an instance of app               */
const app = express();
 

 /* Opening a port 3000 and creating a test message for the server/port  */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(
     `Express started on http://localhost:${port}` +
      ` press Ctrl-C to terminate.`));        


/* Middleware -  Here we are configuring express to use body-parser as middle-ware */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


                /*      Cors for cross origin allowance         */
const cors = require('cors');
app.use(cors());

                /* Initialize the main project folder         */
app.use(express.static('website'));





// Setup Server


      /***************************************************************************/
      /*      Adding GET/POST requests to handle the zipcode and user response   */
      /***************************************************************************/
    

              /* A GET Route for hitting the homepage  */
app.get('/' , (req , res) => {
	res.render("index");
});

/*           A GET Request to return the sent request data : zip-code       */
app.get('/process-form' ,(req , res) => {
	res.send(projectData);
});

         /*               A POST Request                              */
app.post('/addWeatherData', (req , res) => {
	projectData.zipcode = req.body.zipcode;
	projectData.feelings = req.body.feelings;
      projectData.temperature = req.body.Temperature;
      //res.send(projectData);
});




            /*******************************************************************/
            /*      Handler for giving 404 and 500 error messages              */
            /*******************************************************************/
                 /*          Custom 404 page             */
app.use((req, res) => {
      res.type("text/plain");
      res.status(404);
      res.send("404 - Not Found");
    });
                /*           Custom 500 page              */
app.use((err, req, res, next) => {
     console.error(err.message);
     res.type("text/plain");
     res.status(500);
     res.send("500 - Server Error");
    });
          