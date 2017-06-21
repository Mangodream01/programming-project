function checkbox(){
    var years = ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"];
    var checked_years = [];

    years.forEach(function (d) {
        if (d3.select("body")
            .select("#checkboxes")
            .select("#y"+ d)
            .property("checked")) {
                checked_years.push(d)
            }
	    });

    return checked_years;
}