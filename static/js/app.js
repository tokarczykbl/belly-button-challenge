// Using D3 library to read in data from https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json

const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

//Fetching JSON data
d3.json(url).then(function(data) {
  console.log("raw_json_data", data);
});

// Creating function for bar chart
// function bar_chart(id) {
//   d3.json(url).then(function(data) {
//     let sample_names = data.samples.

// Look at 15-Mapping Day One Exercise 10 - Stu_GeoJson