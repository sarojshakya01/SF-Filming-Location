[My linkedin profile](https://www.linkedin.com/in/saroj-shakya)

Check out SF Movies at [here](http://shakyasaroj.com.np).

After cloning(or downloading and extracting) the project, go to the project directory and run

### `npm start`

#Project: SF Movies

### Problem Statement

Create a service that shows on a map where movies have been filmed in San Francisco. User should be able to filter the view using autocompletion search.

The movie filming locations data are avalable on [DataSF : Film Locations](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am)

SF Movies is a full stack web application which displays different filming locations in San Francisco for different movies. This application has used the data provided by the [DataSF : Film Locations](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am). This application basically:

- provides a auto completion text search for movies by title
- displays a Google map of San Francisco.
- displays markers on a map of different filming locations of that particular movies after the movie is selected from auto completion text search.
- display the information on the selected movie if the markers on a map is clicked.

### Why this project

I have not used google map api yet and I was always wanted to work on google map api project from the beginning of my career plus the data is related to movie scene so I selected this project.

As I am currently working as full stack software engineer and my interest on both on back end and front end development, the solutions on this project focuses on full stack.

### Technology choice

MongoDB
ExpressJS
ReactJS
NodeJS
JavaScript
jQuery
AJAX
HTML5
CSS

I am learning MERN since last few months and I have been working on jQuery and AJAX for more than 5 years so I picked these technologies.

### Architechture and Working Mechanism

This application has a simple autocompletion search with total found suggestions at right top corner of the page. At the background, a google map is loaded when the page opens. When the user search for a movie, the get request is sent using axios for total movies available, then at front end, the matched movies with search key is displayed along with total number of matched movies. If the user select one suggestion from the suggestion list, request is again sent to the server from ajax for the detail information of selected movies. After server sent back the response to client, based on the detail information on movies, the markers are displayed on a map. If the user click on the marker, the info window is displayed with details information on that movies as the available data on dataset.

### Dificulties

### Problem in Incomplete Dataset

Since the available dataset doesnot have the lattitude and longitude information of the location on it, I had to add that information later. As I used google map api on this application, I had an option to use geocode api to get the information on lattitude and longitude. Unfortunately geocode api is not free So I decided to get the this information on google map. For this I prepared a script in python to automate the search for the locations on dataset and extract the corresponding values of that locations from the google map and save it to a file. For those records which google map could not able to find, I mannually search the location on google map. (For e.g. ABC Cafe betn Street1 and Street2). And later I prepared a mongodb document collection and import it in local server.

### Problem in accessing Cloud database server

Initially I tried to host the mongodb database server on MongoDB Atlas, but due to connection problem, I hosted db server locally. So a folder named db is added to keep a database collection for the referece. In db folder, sfmovies.json is original data from the [DataSF : Film Locations](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am). sfmoviesdetal.json is a collection I used in this project. So the user need to host the mongodb and import the sfmoviesdetail.json file in <a>SFData</a> database.

If I spent some additional time on this project, I would add animation on google map to show the street view, I would add the images of particular movies on database to show it on the map and autocomplete search.
