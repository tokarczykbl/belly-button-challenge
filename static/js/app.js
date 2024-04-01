// Assigning URL to constant variable
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";


// Building bar chart
function barChart(selectedID) {
    
    // Fetch data
    d3.json(url).then(data => {
        // Filter JSON data based on selected ID from Dropdown
        let selectedSample = data.samples.filter(sample => sample.id == selectedID);
                    
        // Save data to ID so it can be traversed into
        let sampleData = selectedSample[0];
        
        // Select top 10 IDs, concate the OTU text and save to variable 
        let topTenOtuIds = sampleData.otu_ids.slice(0, 10).map(ID => "OTU " + ID);
            
        // Select to 10 sample values and save to variable
        let topTenSampleValues = sampleData.sample_values.slice(0, 10);
                    
        // Select to 10 otu lables and save to variable
        let topTenLabels = sampleData.otu_labels.slice(0, 10);
                    
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
        yref: "container",       
    };

    Plotly.newPlot("bar", [trace1], layout);
});
};

// Building bubble chart
function bubbleChart(selectedID) {
    
    // Fetch data
    d3.json(url).then(data => {
        // Filter JSON data based on selected ID from Dropdown
        let selectedSample = data.samples.filter(sample => sample.id == selectedID);
                
        // Save data to ID so it can be traversed into
        let sampleData = selectedSample[0];
        
        let titleID = sampleData.id; 

        // Select OTU IDs,
        let bubbleOtuIds = sampleData.otu_ids;
            
        // Select to 10 sample values and save to variable
        let bubbleSampleValues = sampleData.sample_values
                    
        // Select to 10 otu lables and save to variable
        let bubbleLabels = sampleData.otu_labels
                    
    // Build out trace for bar chart, need to reverse to adjust for plotly default
    let trace2 = {
        x: bubbleOtuIds,
        xlabel: "OTU",
        y: bubbleSampleValues,
        text: bubbleLabels,
        mode: "markers",
        marker: {
            color: bubbleOtuIds,
            size: bubbleSampleValues,
            colorscale: 'Earth' //https://plotly.com/javascript/colorscales/
        }
    };

    // Build out layout for bar chart,
    let layout2 = {
        title : {
            text: `OTU ID ${titleID}`,
            yanchor: "bottom",
            y: 0.1
    },
        showlegend: false,
        automargin: true
    };
    Plotly.newPlot("bubble", [trace2], layout2);
});
};

//Build Demographic Info section
function demographicInfo(selectedID) {
    
    d3.json(url).then((data) => {

        let metadata = data.metadata.filter(mdata => mdata.id == selectedID);

        let metdata_first = metadata[0];

        d3.select("#sample-metadata").html("");

        Object.entries(metdata_first).forEach(([key,value]) => {
            
            console.log("Demographic Info", key, value);

            d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
        });
    });

};

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
        bubbleChart(initialSelect)
        demographicInfo(initialSelect)
        washingGauge(initialSelect)
    });

// Creating function to capture when dropdown is changed
function optionChanged(value) {
    console.log("Options changed: ",value);
    barChart(value);
    bubbleChart(value)
    demographicInfo(value)
    washingGauge(value)
    };