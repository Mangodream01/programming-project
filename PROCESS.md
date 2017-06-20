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


