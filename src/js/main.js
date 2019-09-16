import "babel-polyfill";
import * as d3 from "d3";
import { buildMap } from "./map";

/*
*
* Initialize the map by awaiting our three data files
*
*/
async function init () {
   await insertSVG();
   const data = await d3.csv('/data/ca-votes.csv');
   const fips = await d3.csv('/data/ca-fips.csv');

   handleData(data, fips);
}


/*
*
* Rolls up data, adds fips code, rolls it up once more such that its keyed by fips
*
*/
function handleData(data, fips) {
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
* Fetch the svg and insert it into the DOM
*/
export function insertSVG () {
   const container = document.querySelector(".l-svg");

   return d3.xml('/data/ca-counties.svg')
    .then((xml) => {
      let svgElement = xml.documentElement;
      svgElement.id = 'cali-map'; 
      container.appendChild(svgElement);
    })
}


init();