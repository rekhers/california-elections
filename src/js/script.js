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

function buildMap(data) {
   console.log("data", data)

   d3.select(".cali")
      .attr("viewbox", "0 0 400 400")
      .attr("width", "100%")
      .attr("height", "auto")

   //  d3.selectAll("path")
   //    .attr("fill", "blue")
   //    .attr("stroke", "white")
   //    .on("mouseover", () => {
   //       const el = document.getElementById(d3.event.target.id);
   //       d3.select(el).attr('fill', 'green');
   //    })
   //    .on("mouseout", () => {
   //       const el = document.getElementById(d3.event.target.id);
   //       d3.select(el).attr('fill', 'blue');
   //    })
   //    .attr("stroke-width", "1.5")
}


/*
* 
*/
async function init () {
   const svg = await insertSVG();
   const data = await d3.csv('/data/ca-votes.csv');
   buildMap(data)
}


init();