# Variance in Happiness through Europe (2006-2015)

By Thirza Dado

Happiness is more and more thought of as a useful measure of social progress and, therefore, an important target of public policy. Correspondingly, research to determinants of happiness has been flourishing. This repository contains a d3 visualization of  eleven measurements of life satisfaction in Europe by the Gallup World Poll. Importantly, it should be noticed that these variables indicate interesting notions of correlation (both with each other as with unmeasured factors) rather than reflect clean causal relationships.
### Map of Europe (EU_map.js)
After the web page has been initialized, the EU map displays variation of “Life Ladder” in 2012 by color coding. The user can switch variables by clicking on items in the right-sided list. The subtitle and legend change dynamically with the selected variable. The user can hover over the icon next to the list item for a brief explanation in a pop-up. Furthermore, the time slider below the map allows the user to view differences in variation over the time course 2006-2015. Lastly, hovering over a country displays a tooltip with country name, variable name, and variable value, whereas clicking on a country leads to highlighting of this data point (country in this year) in the other two visualizations. 

Image 1 EU map:

![screenshot 1](https://github.com/Mangodream01/programming-project/blob/master/doc/screenshot1.png)

### Parallel coordinates (parallelcoordinates.js)
All eleven happiness variables are displayed in parallel coordinates. As a result, relationships between variables can easily be viewed. By selecting the variable title, the corresponding variable axis can be dragged to another position for closer comparison. Selecting a sub-area of a variable axis creates an region of interest (ROI) to bring lines of interest to the foreground. This ROI can be dragged over the axis. Clicking on this axis again unselects this ROI. When year is changed by the time slider, the parallel coordinates update by means of a transition. The year in the subtitle changes as well. Lastly, when a country on the map is clicked upon, the corresponding line in the parallel coordinates gets highlighted. Click on the country again to un-highlight this line. 

Image 2 Parallel coordinates

![screenshot 2](/doc/screenshot2.png)

### Scatter plot (scatter.js)
Switch to the second tab (above the title of the lower visualization). The begin screen displays “Life Ladder” on the X axis and “Log GDP per capita” on the Y Axis. These variables can be changed into any of the eleven happiness variables by selection in the pink dropdown menus on the right side. Data points from specific years can be viewed and unviewed by clicking on the legend items. When time is changed by the time slider, only the data points of that specific year are displayed in the scatter plot. The user can click on ‘years’ in the legend to make corresponding data points appear. Lastly, when a country on the map is clicked upon, the corresponding dot gets highlighted. Click on the country again to un-highlight this dot. When year is changed by sliding, this dot will remain highlighted for comparison despite its visibility (just change it to visible by clicking on year in the legend).

Image 3 Zoomable scatter plot:

![screenshot 3](/doc/screenshot3.png)

### Data
Source: http://worldhappiness.report/download/ 

### External libraries
jQuery
Bootstrap
D3
D3-tip
TopoJSON
DataMaps
d3-legend
### Acknowledgements
Grateful acknowledgement is given to the following:

Mariella Crouy for her EU map
(https://bl.ocks.org/MariellaCC/0055298b94fcf2c16940)

Jason Davies for his parallel coordinates 
(https://bl.ocks.org/jasondavies/1341281)

Jonas Petersson for his zoomable scatter plot 
(http://bl.ocks.org/peterssonjonas/4a0e7cb8d23231243e0e)

D Struths for his legend
(http://bl.ocks.org/DStruths/9c042e3a6b66048b5bd4) 

