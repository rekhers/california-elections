import * as d3 from "d3";
import { getColor } from "./color"
import { whoWon } from "./winner"

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
     .on("click", () => {

        d3.selectAll("path")
          .lower()
          .classed('active', false)


        d3.select(d3.event.target)
        .raise()
        .classed('active', true);

        showCard(d3.event.target.id)
     })
 
 }


 function showCard(id) {
    const cards = document.querySelectorAll(".c-card__content");
    const currentCard = document.querySelector(`.c-card__content--${id}`);


    cards.forEach((card) => {
         card.classList.remove("hidden");
    })


    cards.forEach((card) => {
        if(card !== currentCard) {
            card.classList.add("hidden");
        }
    })
 }


 function buildCards(county) {
    const cardContainer = document.querySelector(".l-card");
    const card = document.createElement('div');
    const winningLetter = whoWon(county).charAt(0,1).toUpperCase();
    cardContainer.appendChild(card);
    card.innerHTML = `<div class="c-card__content c-card__content--${county[0].fips}">
    <h4 class="c-card__title"> ${county[0].name} <span>(${winningLetter})</span> </h4> 
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