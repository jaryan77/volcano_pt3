console.log("table.js")
// id="selDataset" in the index.html
var select_tag = d3.select("#selDataset");
// Allow User to select which country to show
select_tag
  .append("option")
  .property("value", "")
  .text("Select Country");
// Import the data into the table
country_list = [];
tableData = [];
asendData = [];
d3.csv("static/data/volcano_ascend.csv").then((myData) => {
  asendData = myData
});  
d3.csv("static/data/volcano_data.csv").then((importedData) => {
  tableData = importedData
  console.log("tableData")
  console.log(tableData)
  var cuntries = importedData.map(x => x.Country);
  // console.log("cuntries");
  // console.log(cuntries);
  cuntries.sort()
  // Eliminate country titles for the selection choice.
  cuntries.map((name) => {
    if (country_list.indexOf(name) === -1) {
      country_list.push(name)
      select_tag
        .append("option")
        .property("value", name)
        .text(name);
    }
  });
});
const tbody = d3.select("tbody");
function optionChanged(selected_country) {
  console.log("selected_country=", selected_country);
  // Bar Chart
  results = asendData.filter(row => row.Country == selected_country);
  console.log("results")
  console.log(results)
  year_list = [];
  vei_list = [];
  text_list = [];
  var i = 0;
  results.forEach((row) => {
    i = i + 1
    console.log("y_list")
    console.log(row.Year)
    year_list.push('Event ' + i + ' :  ' + row.Year);
    vei_list.push(row.VEI);
    text_list.push("Volcano Name:  " + row.Name + "<br>" + "Volcano Type:  " + row.Type + "<br>" + "VEI:  " + row.VEI + "<br>" + "Coordinates: " + row.Coordinates);
  });
  var bar_trace = {
    y: year_list,
    x: vei_list,
    text: text_list,
    type: "bar",
    orientation: "h",
  };
  var data = [bar_trace];
  // Screen heading  
  var bar_layout = {
    title: selected_country + " - Historical Volcano Events",
    margin: { t: 30, l: 150 }
  };
  Plotly.newPlot("bar", data, bar_layout);
  // Table view
  tbody.html("");
  const tbl_header = tbody.append("tr");
  let header = tbl_header.append("th");
  header.text("Year");
  header = tbl_header.append("th");
  header.text("Country");
  header = tbl_header.append("th");
  header.text("Location");
  header = tbl_header.append("th");
  header.text("Volcano Name");
  header = tbl_header.append("th");
  header.text("Volcano Type");
  header = tbl_header.append("th");
  header.text("VEI");
  header = tbl_header.append("th");
  header.text("Coordinates");
  results = tableData.filter(row => row.Country == selected_country);
  results.map((row) => {
    const tbl_data = tbody.append("tr");
    // console.log("row")
    // console.log(row)
    // Create multiple td cells for each row
    Object.values(row).forEach((value) => {
      let cell = tbl_data.append("td");
      cell.text(value);
    });
  });
}