// Assigning URL to constant variable
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

//  Fetching JSON data from URL
d3.json(url).then(data => {
    console.log(data);
});


// Assign dropdown element in HTML to variable using D3
let id_dropDown = d3.select("#selDataset"); 
        
    // Fetch data
    d3.json(url).then(data => {
        // Selects `names` feature in JSON data and for each name
        data.names.forEach(name => {
            // Append each name to the dropdown variable
            id_dropDown.append("option").text(name).property("value", name);
            });

        // Select initial value for dropdown
        initialSelect = (data.names[0])
        // Console log the inital selected value
        console.log("Initial Select ", initialSelect);
        barChart(initialSelect)
    });

// Building bar chart
function barChart(selectedID) {
    
    // Fetch data
    d3.json(url).then(data => {
        // Filter JSON data based on selected ID from Dropdown
        selectedSample = data.samples.filter(sample => sample.id == selectedID);
            console.log("Bar Chart Data", selectedSample[0]);
        
        // Save data to ID so it can be traversed into
        sampleData = selectedSample[0];
        
        // Select top 10 IDs, concate the OTU text and save to variable 
        let topTenOtuIds = sampleData.otu_ids.slice(0, 10).map(ID => "OTU " + ID);
            //Log IDs to check work
            console.log("Top 10 OTU IDs ", topTenOtuIds)

        // Select to 10 sample values and save to variable
        let topTenSampleValues = sampleData.sample_values.slice(0, 10);
            //Log samples to check work 
            console.log(topTenSampleValues)
        
        // Select to 10 otu lables and save to variable
        let topTenLabels = sampleData.otu_labels.slice(0, 10);
            console.log(topTenLabels)
        
    // Build out trace for bar chart, need to reverse to adjust for plotly default
    let trace1 = {
        x: topTenSampleValues.reverse(),
        y: topTenOtuIds.reverse(),
        text: topTenLabels.reverse(),
        type: "bar",
        orientation: "h"
    };

    // Build out layout for bar chart,
    let layout = {
        title: "Top 10 "  
    };

    Plotly.newPlot("bar", [trace1], layout);
});
};


// Creating function to capture when dropdown is changed
function optionChanged(value) {
    console.log("Options changed: ",value);
    barChart(value)
    };