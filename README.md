# programming-project

Thirza Dado (10492682)
Programming project
Tuesday 06 June 2017


Project proposal: ‘medicalization of misery?’

Firstly, I am curious if I can detect a relationship between ‘freedom to make life choices’ and the overall happiness score of a country. Secondly, I am interested if a trend can be found in drug use when a country is less or more happy. This data visualization will display a map of Europe. There can be switched between years 2008-2014 by means of a drop-down menu or a slider (I don’t know the smoothest way to build this yet). Hoovering over a country will display a tooltip with the country’s name. Countries can be clicked on, and will cause population number, gross domestic product (GDP), and happiness score (2013-2015, World Happiness Report) to appear in a separate section (maybe a canvas element) next to the map.
(data: population, GDP, and happiness score in 2008-2014)

Variable 1: ‘Freedom to make life choices’ in Europe
This data visualization will display an interactive map of Europe and the corresponding score of ‘freedom to make life choices’ (World Happiness Report) displayed in color code (d3 color scale gradient). Differences between countries at one time point can be viewed, and difference in this freedom within each country becomes clear by sliding between 2008-2014; I expect the colors to change over the years. The freedom score will be displayed in the tooltip when hoovering over a country, below the country name.
(http://worldhappiness.report/ed/2016/)

Data format:
Name	Code	Population	GDP	Happy	Score2008	Score2009	Score2010
Country 1	NL
Country 2	BE
Country 3	DU
…




Variable 2: Drug use in Europe
When clicking on a country, a bar chart appears with the annual prevalence of drug use of six types of drugs (x axis) as percentage of the population between 15-64 years old (unless otherwise indicated) (y axis): prevalence of amphetamines, cannabis, cocaine, ecstasy-type substances, opioids (including other illicit opioids and prescription opioids), and opiates (also includes problem opiate users). Unfortunately, data points per drug type per country are from different years, and, therefore, the most recent year is used and mentioned when hoovering over the bar of interest.




