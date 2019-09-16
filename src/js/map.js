import * as d3 from "d3";
import { getColor } from "./color"

export function buildMap(data) {
    d3.select(".svg-ca")
       .attr("viewbox", "0 0 300 400")
       .attr("width", "100%")
       .attr("height", "auto")
 
    const paths = document.getElementsByTagName('path');
 
   [...paths].forEach((path) => {
       const color = getColor(data[path.id]);
       document.getElementById(path.id).setAttribute('fill', color);
       buildCards(data[path.id]);
   })
 
   d3.selectAll("path")
     .on("mouseover", () => {
       d3.select(d3.event.target)
       .raise()
       .classed('active', true);
     })
     .on("mouseout", () => {
       d3.select(d3.event.target)
       .lower()
       .classed('active', false);
     })
     .on("click", () => {
        console.log(d3.event.target.id);
     })
 
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



function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }