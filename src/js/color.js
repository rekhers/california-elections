import { whoWon } from "./winner";

/**
 * Utility to return a color for a given county
 * @param  {Object} county   
 * @return {String} fill color
 */
export function getColor(county) {

    if(whoWon(county) === "republican") {
       return "rgb(184, 24, 0)"
    } else if(whoWon(county) === "democrat") {
       return "rgb(0, 125, 214)"
    } else {
       return "orange"
    }
 }