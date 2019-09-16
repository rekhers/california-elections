import "babel-polyfill";
import * as d3 from "d3";

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

function buildCards(county) {
   console.log(county)
   const cardContainer = document.querySelector(".card-container");
   const card = document.createElement('div');
   cardContainer.appendChild(card);
   card.innerHTML = `<h3 class="cardTitle"> ${county[0].name} </h3> 
   <ul class="list"> 
    <li> ${county[0].votes[0].candidate} : ${county[0].votes[0].votes}  </li>
    <li> ${county[0].votes[1].candidate} : ${county[0].votes[1].votes}  </li>
    <li> ${county[0].votes[2].candidate} : ${county[0].votes[2].votes}  </li>
    <li> ${county[0].votes[3].candidate} : ${county[0].votes[3].votes}  </li>
   </ul>`

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
   
   /*
   * 
   * Return red if Trump won, blue if Clinton won, and orange if neither won
   * 
   */
   if(parseInt(lookup[republican]) > parseInt(lookup[democrat])) {
      return "rgb(184, 24, 0)"
   } else if(parseInt(lookup[democrat]) > parseInt(lookup[republican])) {
      return "rgb(0, 125, 214)"
   } else {
      return "orange"
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
      buildCards(data[path.id]);
  })

}


init();