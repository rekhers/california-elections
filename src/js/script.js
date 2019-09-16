import "babel-polyfill";
import * as d3 from "d3";

/*
* Initialize the map
*/
async function init () {
   const svg = await insertSVG();
   const data = await d3.csv('/data/ca-votes.csv');
   const fips = await d3.csv('/data/ca-fips.csv');

   handleData(data, fips);
}

function handleData(data, fips) {
   //rollup data by county
   const counties = d3.nest()
   .key((d) => { return d.county; })
   .object(data);


   const matched = fips.map((f) => {
      const name = f.county.trim();
      return {'name': name, 'votes': counties[name], 'fips': f.fips};
   })

   const newMatched = d3.nest()
      .key((d) => { return d.fips})
      .object(matched)


   buildMap(newMatched);
}

/*
*
* Fetch the svg and insert it into the DOM
*
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

function getColor(county) {
   const results = county[0].votes;
   const lookup = {};
   const republican = "Donald J. Trump";
   const democrat = "Hillary Clinton";

   if(results) {
      results.forEach((r) => {
         lookup[r.candidate] = r.votes;
      })
   }
 
   if(parseInt(lookup[republican]) > parseInt(lookup[democrat])) {
      return "red"
   } else {
      return "blue"
   }
}

function buildMap(data) {
   d3.select(".cali")
      .attr("viewbox", "0 0 300 400")
      .attr("width", "100%")
      .attr("height", "auto")

   const paths = document.getElementsByTagName('path');

  [...paths].forEach((path) => {
      const color = getColor(data[path.id]);
      document.getElementById(path.id).setAttribute('fill', color);
  })

}


init();