
    //function for dropdown
function init() {
    d3.json("Data/samples.json").then((data)=> {
    console.log(data);

    //set dropdown menu w/ id//
    data.names.forEach((name) => {
        d3.select("#selDataset").append("option").text(name).property("value");
});

    plots(data.names[0]);
    demoInfo(data.names[0]);
});
};


//create function demographic data//
function demoInfo(id) {
    d3.json("Data/samples.json").then((data)=> {
        //call in metadata to demographic panel//
    var metadata = data.metadata;
    
    var result = metadata.filter(meta => meta.id.toString() === id)[0];
        //select demographic panel from html//
    var demographics = d3.select("#sample-metadata");
        //empty the demographic panel for new data//
    demographics.html("");
        
    Object.entries(result).forEach((key) => {   
        demographics.append("h5").text(key[0]+ ": " + key[1]);   
        });
    });
};

//create function for data//
function plots(id) {
    d3.json("Data/samples.json").then((data)=> {
        console.log(data)
        
    var wfreq = data.metadata.map(data => data.wfreq)
    console.log(`Washing Freq:  ${wfreq}`)
        
    var samples = data.samples.filter(s => s.id.toString() === id)[0];
    console.log(`Samples: ${samples}`)
  
    
    var sampleValues = samples.sample_values.slice(0, 10).reverse();
    console.log(`Sample Values: ${sampleValues}`);
  
     
    var OTU = (samples.otu_ids.slice(0, 10)).reverse();
    console.log(`OTU: ${OTU}`)
        
   
    var OTU_id = OTU.map(d => "OTU " + d)
    console.log(`OTU IDS: ${OTU_id}`);
  
        
    var lables = samples.otu_labels.slice(0, 10).reverse();
    console.log(`lables: ${lables}`);
  
    
        //bar chart//
    var trace= {
        x: sampleValues,
        y: OTU_id,
        text: lables,
        marker: {
            color: 'skyBlue'
        },
        type:"bar",
        orientation: "h",
        };
  
    
    var data = [trace];
    Plotly.newPlot("bar", data);


      
        //bubble chart//
    var trace1 = {
        x: samples.otu_ids,
        y: samples.sample_values,
        mode: "markers",
        marker: {
            size: samples.sample_values,
            color: samples.otu_ids
            },

            text: samples.otu_topValues
  
        };
  
       
    var layout_b = {
        xaxis:{title: "OTU ID"},
        height: 700,
        width: 1000,

        };
  
        
    var data1 = [trace1];
    Plotly.newPlot("bubble", data1, layout_b); 


  
        //guage chart//
    var data_guage = [{
        domain: {x: [0, 1], y: [0, 1]},
        value: parseFloat(wfreq),
        title: {text: `Belly-Button Washing Frequency`},
        type: "indicator",
        mode: "gauge+number",
        gauge: { axis: { range: [null, 9] },
        bar : { color: "red" },
        steps: [
        {range: [0, 3], color: "cyan"},
        {range: [3, 7], color: "royalBlue"},
        {range: [7, 9], color: "blue"},
        ]}
        }];


    var layout_guage = { 
    width: 700, 
    height: 600, 
    margin: { t: 20, b: 40, l:100, r:100 } 
    };

    Plotly.newPlot("gauge", data_guage, layout_guage);

});
}  


init();

//change function// 
    function optionChanged(id){
    plots(id);
    demoInfo(id);
};