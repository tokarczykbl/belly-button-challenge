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
            // Console log to check names added
            console.log(name);
        });

        // Select initial value for dropdown
        selectedValue = (data.names[0])
        console.log("Initial Select ", selectedValue)
    });


// Creating function to capture when dropdown is changed
function optionChanged(selectedValue) {
    console.log("Option changed: ",selectedValue);
};
