## Final Report: Variance in Happiness through Europe (2006-2015)
By Thirza Dado
### Introduction
Happiness is more and more thought of as a useful measure of social progress and, therefore, an important target of public policy. Correspondingly, research to determinants of happiness has been flourishing. On this web page, eleven explanatory variables of life satisfaction in Europe are visualized, which are considered to play an important role in the observed variation in happiness between countries. Importantly, it should be noticed that these variables indicate interesting notions of correlation (both with each other as with unmeasured factors) rather than reflect clean causal relationships.

![overview screenshots](/doc/report_screenshot.png)

### Technical design
#### High level overview
All code can be found in the folder ‘Code’ which exist of the sub-folders ‘CSS’, ‘JS’, and ‘PY and files’ (all the data). The root of the repository contains the index.html. JS contains the scripts: EU_map.js (initialization script), fill_data_in_graph.js (update script), parallelcoordinates.js, scatter.js, testd3.js (use both d3v3 and d3v4), and time_slider.js.
#### Map of Europe (EU_map.js)
The script EU_map.js initializes the web page, and variation of the happiness variable “Life Ladder” in 2012 on a data map of Europe is displayed by color coding. The user can switch variables by clicking on items in the right-sided list, thereby calling the function ‘fill_data_in_graph(year, variable)’ (fill_data_in_graph.js) which updates the subtitle, fills, legend, and tooltips in the data map with the new data. Legend is created by an extern library in folder ‘ext’ within the folder ‘JS’, called ‘d3-legend.js’). Implementation of the time slider can be found in time_slider.js. EU_map initializes this slider by calling the function insert_slider(). When year changes on the slider, it gives the new year to give_year(year) (EU_map.js) and the displayed data will be updated by fill_data_in_graph(year, variable). Clicking on a country highlights this data point (country in this year) in the other two visualizations (click events in fill_data_in_graph.js).
#### Parallel coordinates (parallelcoordinates.js)
EU_map.js adds parallel coordinates by calling the function add_graph() (parallelcoordinates.js). The time slider updates the data in the parallel coordinates with a transition via the function update_graph(year) (parallelcoordinates.js) in the function give_year(year) (EU_map.js) that gets its year from the slider. The year in the subtitle changes as well. The highlight and unhighlight functions (parallelcoordinates.js) are called in EU_map.js whenever a country on the map is clicked upon, and highlights the corresponding line in the parallel coordinates.
#### Scatter plot (scatter.js)
EU_map.js adds the zoomable scatter plot by calling the function add_scatter() (scatter.js). The time slider updates the data in the scatter plot in give_year(year) (EU_map.js) via the function update_scatter_years(year). The highlight and unhighlight functions (scatter.js) are called in EU_map.js whenever a country on the map is clicked upon, and highlights the corresponding dot in the scatter plot.

### Challenges and defending
Firstly, after cleaning up all the data, getting it in the right dictionary format took a lot of effort (image 2). Secondly, I think almost every feature of my d3 visualization has been implemented multiple times where earlier attempts were clumsily implemented, non-dynamical, or even hard-coded. For example, I started color coding in my EU data map by hardcoded buckets for each happiness variable in the list and twelve if statements. Next I tried to write a code in python that would dynamically divide scores per variable in evenly divided buckets. Finally, the TA hinted me about d3-legend which works just perfectly and only took me a few lines of code. Thirdly, I had a lot of problems with finding my tooltips in my data map, parallel coordinates, and scatter plot. The TAs helped me find them and thereby taught me what questions I should ask when such problems occur and what to console.log() to find clues to the bug. 

Image 2:

![json example](/doc/json_example.png)

Another important challenge was updating both graphs (parallel coordinates and zoomable scatter plot) with another subset of the dataset. In the beginning I removed the whole graph and created the whole again with new data. The TA hinted I should consider an update function, which, after completing it, taught me how I could select divisions of a web page and change or update its features, instead of throwing every away and start again. It was really interesting to learn how to code in a sustainable way. However, at the very last moment I discovered bugs in my parallel coordinates after updating it with new data. Sustainable coding is really nice when it works, but can be very risky as well since transforming data again and again might have some unwanted side effects that you can find only if you test every feature with every update. It is important to understand the interaction between the components, try to stand above it, and make sense of it. 

Click [here](https://mangodream01.github.io/programming-project/) to view the d3 web page.
