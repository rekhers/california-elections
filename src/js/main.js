import "babel-polyfill";
import * as d3 from "d3";
import { buildMap } from "./map.js";

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



function numberWithCommas(x) {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function buildCards(county) {
   const cardContainer = document.querySelector(".card-container");
   const card = document.createElement('div');
   cardContainer.appendChild(card);
   card.innerHTML = `<div class="c-card__content">
   <h4 class="c-card__title"> ${county[0].name} </h4> 
   <ul class="c-card__list"> 
    <li> ${county[0].votes[0].candidate}: ${numberWithCommas(county[0].votes[0].votes)}  </li>
    <li> ${county[0].votes[1].candidate}: ${numberWithCommas(county[0].votes[1].votes)}  </li>
    <li> ${county[0].votes[2].candidate}: ${numberWithCommas(county[0].votes[2].votes)}  </li>
    <li> ${county[0].votes[3].candidate}: ${numberWithCommas(county[0].votes[3].votes)}  </li>
   </ul>`

   }


      
/*
* 
* Creates a lookup for each county, 
* returns a fill for the current path
*
*/
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
      return "rgb(184, 24, 0)"
   } else if(parseInt(lookup[democrat]) > parseInt(lookup[republican])) {
      return "rgb(0, 125, 214)"
   } else {
      return "orange"
   }
}




init();