json_url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=significant-volcanic-eruption-database&q=&rows=850&start=0&facet=year&facet=tsu&facet=eq&facet=name&facet=location&facet=country&facet=type&facet=status"
//url_with_deaths_description = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=significant-volcanic-eruption-database&q=&rows=835&facet=year&facet=tsu&facet=eq&facet=name&facet=location&facet=country&facet=type&facet=status&facet=deaths_description&facet=total_deaths_description"
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
function init() {
    // resetData();
    var dropDown = d3.select('#selDataset');
    // const volcanoData = x.fields.map(x => x);
    d3.json(json_url).then((volcanoData) => {
        console.log(volcanoData);
        let volcanoDataRecords = volcanoData.records
        // Storing all countries, includes duplications
        let volcanoDataRecordsCountries = []
        volcanoDataRecords.forEach((country_jsons) => {
            let country =  country_jsons.fields.country
            volcanoDataRecordsCountries.push(country)
        });
        // var names = x.fields.name;
        // Deduplicating country array
        volcanoDataRecordsCountries = [...new Set(volcanoDataRecordsCountries)]
        volcanoDataRecordsCountries.forEach((country) => {
            dropDown.append('option').text(country).property('value', country);
        })
        let defaultCountry = volcanoDataRecordsCountries[0];
        console.log(defaultCountry)
        visuals(defaultCountry);
        readData(defaultCountry);
    })
}
// function resetData() {
// }
function optionChanged(newCountry){
    visuals(newCountry);
    readData(newCountry);
}
function visuals(countryChoice) {
    d3.json(json_url).then((volcanoData) => {
        var countryData = volcanoData.records.filter(x => x.fields.country == countryChoice);
        // var countryData = filterData(volcanoData, country);
        console.log(volcanoData)
        console.log(countryData)
        var name = [];
        var event = [];
        var year = [];
        var vei = [];
        var country = [];
        var event = countryData.map(x => x.geometry.recordid);
        var year = countryData.map(x => x.fields.year);
        var vei = countryData.map(x => x.fields.vei);
        var elevationArr = countryData.map(x => x.fields.elevation);
        var name = countryData.map(x => x.fields.name);
        var country = countryData.map(x => x.fields.country)
        var total_deaths = countryData.map(x=> x.fields.total_deaths_description)
        var trace = {
            x: year,
            y: vei,
            text: name, 
            mode: 'markers',
            marker: {
                size: vei * 5000,
                color: elevationArr,
                colorscale: 'YlGnBu'
            }
        };
        var bar_trace = [{
            x: vei,
            y: total_deaths,
            text: name, 
            type: "bar",
            orientation: "h" 
        }];
        layout_bar = {
            title: {text:"Deaths vs VEI"},
            xaxis: {title: "VEI"},
            // yaxis: {title: "Deaths"},
            heigh: 500, 
            width: 900, 
            margin: {l:-100, r:-1, b: -20, t: -20}
        }
        //Plotly.newPlot('bar', bar_trace, layout_bar)
        var d = [trace];
        Plotly.newPlot('plot', d);   
    })
}
function readData(_country) {
    // console.log(country);
}
init();
function optionChanged(newCountry) {
    console.log(newCountry);
    d3.csv('../Resources/volcano.csv').then((csvDatum)=> {
        csvDatum.forEach(function(data) {
            data.Country = data.Country;
          });
        console.log(csvDatum);
        var a = csvDatum.filter(x => x.Country === newCountry)
        visuals(newCountry);
        readData(newCountry);
    })
    visuals(newCountry);
    readData(newCountry);
}
GOAL:
d3.json(json_url).then(function(data) {
        const volcanoData = data.records.map(x => x);
        console.log(volcanoData);
        var filteredVolcanoData = filterData(volcanoData, 'Japan');
        // var mtn = filteredVolcanoData.map(x => x.fields.name)
        var event = filteredVolcanoData.map(x => x.geometry.recordid);
        var year = filteredVolcanoData.map(x => x.fields.year);
        var vei = filteredVolcanoData.map(x => x.fields.vei);
        var name = filteredVolcanoData.map(x => x.fields.name);
        var country = filteredVolcanoData.map(x => x.fields.country)
        var trace = {
            x: year.slice(0,25).reverse(),
            y: vei,
            text: name,
            mode: 'markers',
            marker: {
                size: vei * 5000, 
                color: name,
                colorscale: 'YlGnBu'
            }
        };
        var d = [trace];
        Plotly.newPlot('plot', d);        
    });
GOAL:
d3.json(json_url).then(function(data) {
        const volcanoData = data.records.map(x => x);
        console.log(volcanoData);
        var filteredVolcanoData = filterData(volcanoData, 'Japan');
        // var mtn = filteredVolcanoData.map(x => x.fields.name)
        var event = filteredVolcanoData.map(x => x.geometry.recordid);
        var year = filteredVolcanoData.map(x => x.fields.year);
        var vei = filteredVolcanoData.map(x => x.fields.vei);
        var name = filteredVolcanoData.map(x => x.fields.name);
        var country = filteredVolcanoData.map(x => x.fields.country)
        var trace = {
            x: year.slice(0,25).reverse(),
            y: vei,
            text: name,
            mode: 'markers',
            marker: {
                size: vei * 5000, 
                color: name,
                colorscale: 'YlGnBu'
            }
        };
        var d = [trace];
        Plotly.newPlot('plot', d);        
    });