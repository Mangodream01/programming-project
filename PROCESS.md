### Process book

Thirza Dado - 10492682

##### 06-06-2017 
I found a nice dataset with numbers of drug intake per country. I decided to converge my project on countries in Europe, and zoomed in on Europe on the d3 World Map in JavaScript and HTML. Later I also found a complete dataset with happiness variables. I thought of looking for an association between a countries’ happiness and drug intake. I made templates for my Javascript, HTML, and CSS files. 

##### 07-06-2017 
I cleaned up the whole happiness dataset in excel, and converted it to csv file. Read it into python, and now busy with converting it into JSON. I found country codes to link it to my map. Getting it in right dictionary format is harder than I expected.

##### 08-06-2017 
Converted csv to json in python in the way I wanted. Loaded it into the JavaScript file and connected it with the EU map. I displayed colors on the map based on one variable from the happiness dataset. Tomorrow I want to look at a function to make buckets with evenly divided data points for color coding (maybe in python in the json file) and a legend that adjust automatically (maybe d3 has one).

##### 09-06-2017 
I made buckets for EU countries in python, picked multiple color gradients, and wrote a first legend in JS. I played around with my EU map and its style. I improved my csv-to-json python script and my JS code. I also made tooltips with information, and a dropdown menu to switch happiness variables!

##### 12-06-2017 
Instead of hardcoded buckets, I am now trying to use code to bucket the happiness scores dynamically. I hope I can make it as nice as the visualization with hardcoded buckets, because right now it looks bad (it does work though!). In this way, legend and color fills in the map happen dynamically when input is changed. I also lost my tooltips at the back of my map. I hope I’ll find them back tomorrow.

##### 13-06-2017 
Legend and color coding are better, but still far from perfect. I still lost my tooltips, and will try to make d3-tips instead (tip from Gosia). I made a time slider, which almost works. I think it’s time to leave this visualization for a while, and start with parallel coordinates.

##### 14-06-2017 
Time slider is properly linked with the map, and I made a graph with parallel coordinates! Tooltips and legend are still not working.

##### 15-06-2017 
Today I worked on the layout, found my tooltips back, and the legend is finally working properly! The scales of the dimensions of parallel coordinates are all good now. Tomorrow, it’s time to link parallel coordinates to the EU map. I want a line to light up when a country gets clicked upon, and a tooltip displaying country and score when hoovering over the line in the graph. I decided to stick to this data, and not use drug data anymore. My third visualization will be a scatterplot in which all variables can be analyzed against each other. 

##### 16-06-2017 
Today I linked the parallel coordinates to the time slider. Now, it updates with happiness data that corresponds to the selected year. However, it should function more efficiently. I am working on that. Moreover, I played with style.

##### 19-06-2017 
Today I made a start with my third visualization: a scatter plot. I also refined the parallel coordinates, and linked it to my EU map. 

##### 20-06-2017 
Event in Rotterdam. Thought about my third visualisation and tried to fill the tooltip of parallel coordinates with the right data.

##### 21-06-2017 
Did not manage to fill tooltip of parallel coordinates with the right data. I made checkboxes to check the years in the scatter plot, and it works good. However, I would prefer an update function instead of removing and creating the whole visualization with every small change. This is also true for the parallel coordinates.

##### 22-06-2017 
Tooltip content in parallel coordinates is right. I made dropdown menus to pick variables for the scatterplot. I made a tab menu to switch between parallel coordinates and scatter plot.I wrote a function to update parallel coordinates, with transition() and everything. Now, I am busy to successful select and unselect lines in parallel coordinates by hovering and clicking on the EU map. I also added some dynamically changing titles and other small changes in style.

##### 23-06-2017
I wrote an update function for my new scatter plot. The screen keeps going up whenever I pick another variable, so it is tiring to improve it. My parallel coordinates become prettier and prettier, but I can’t seem to think of a way to keep a line highlighted when clicked upon. 

##### 26-06-2017 
Found out why the screen kept going up whenever I picked a variable (href = #). I improved the scatter plot by updating the data by selecting the legend. I removed the former update function and the checkboxes, which were now redundant. I found the tooltip of the scatter plot, although it is super buggy (errors) and needs some fixing. Moreover, I changed the link between the map and parallel coordinates from hover and click event to click event only, because manipulating the parallel coordinates destroys the working of the basic functions of the graph. I am planning to make a reset button to easily reset the parallel coordinates after too much manipulation.




