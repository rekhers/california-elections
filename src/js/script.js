import "babel-polyfill";
import * as d3 from "d3";

/*
* Fetch the svg and insert it into the DOM
*/
function insertSVG () {
   const container = document.querySelector(".svg-container");

   return d3.xml('/data/ca-counties.svg')
    .then((xml) => {
      let svgElement = xml.documentElement;
      svgElement.id = 'cali-map'; 
      container.appendChild(svgElement);
    })
}

function buildMap(data, fips) {
   console.log("fips", fips)

   //rollup data by county
   var counties = d3.nest()
   .key(function(d) { return d.county; })
   .entries(data);

   console.log("COUNTIES:", counties)

   d3.select(".cali")
      .attr("viewbox", "0 0 300 400")
      .attr("width", "100%")
      .attr("height", "auto")
}


/*
* Initialize the map
*/
async function init () {
   const svg = await insertSVG();
   const data = await d3.csv('/data/ca-votes.csv');
   const fips = await d3.csv('/data/ca-fips.csv');
   console.log("fips", fips);
   buildMap(data, fips)
}


init();