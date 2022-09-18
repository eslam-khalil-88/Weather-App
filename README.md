# Weather App Project by : Eslam Ibrahim Khalil

This is a brief readme file for the project.

## Table of Contents
* [Description of the project](###description-of-the-project)
* [Technologies or Languages employed](###technologies-or-languages-employed)
* [Project Features](###project-features)
* [Additional Features](###additional-features)
* [Final Note](###final-note)

### Description of the project
* Weather App is a web application used to take a zip code from the user and give the temperature , in addition to the date , user response and the written zip code.
* The project is divided into 2 main parts : **Client side code** files including (webpage/**index.html** , CSS style file/**style.css** , application code file/**app.js**).
* The other part is the **Server side code** file containing the code of the server taking GET and POST requests for fetching data to and from the server, under the name **server.js**.

### Technologies or Languages employed
* The Client side code is written with : HTML for **index.html** , CSS for **style.css** , and JavaScript/DOM for the application **app.js**.
* The Server side code is made using nodejs and express package for the file **server.js**.

### Project Features
* A webpage with an asyhncronous web application to enter the zipcode and how you feel.
* Results are sent to the server using a GET request with the required url of the weather app to OpenWeather API , and receives a response with JSON containing many information about the sent zipcode , including the required temperature.
* Finally , temperature is shown using **AJAX** on the webpage , with : Date (dd.mm.yy) , User feelings , and entered ZipCode. 

### Additional Features
In case the entered Zipcode by the user is not available , the webpage will return a message that the entered Zipcode is not available with a 404 error.
### Final Note
OpenWeather API only gives the temperature for North America Countries and South East of ASIA , while giving error of unavailable zip code to any other entered zipcode.