// Using D3 library to read in data from https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json

const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

//Fetching JSON data
d3.json(url).then(function(data){
    console.log(data);
});

