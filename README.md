visit My linkedin profile [here](https://www.linkedin.com/in/saroj-shakya)

After cloning(or downloading and extracting) the project, go to the project directory and run

### `npm start`
for front end service start up and run 

### `node server.js`
for back end service start up from two different command windows.

### Project: SF Movies

### Problem Statement

Create a service that shows on a map where movies have been filmed in San Francisco. User should be able to filter the view using autocompletion search.

The movie filming locations data are avalable on [DataSF : Film Locations](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am)

### About the Project
SF Movies is a full stack web application which displays different filming locations in San Francisco for different movies. This application has used the data provided by the [DataSF : Film Locations](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am). This application basically:

- provides a auto completion text search for movies by title
- displays a Google map of San Francisco.
- displays markers on a map of different filming locations of that particular movies after the movie is selected from auto completion text search.
- display the information on the selected movie if the markers on a map is clicked.

### Technology used

MongoDB
ExpressJS
ReactJS
NodeJS
JavaScript
AJAX
HTML5
CSS

### Architechture and Working Mechanism

This application has a simple autocompletion search with total found suggestions at right top corner of the page. At the background, a google map is loaded when the page opens. When the user search for a movie, the get request is sent using axios for total movies available, then at front end, the matched movies with search key is displayed along with total number of matched movies. If the user select one suggestion from the suggestion list, request is again sent to the server for the detail information of selected movies. After server sent back the response to client, based on the detail information on movies, the markers are displayed on a map. If the user click on the marker, the info window is displayed with details information on that movies as the available data on dataset.
