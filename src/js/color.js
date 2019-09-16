import { whoWon } from "./winner";


export function getColor(county) {

    if(whoWon(county) === "republican") {
       return "rgb(184, 24, 0)"
    } else if(whoWon(county) === "democrat") {
       return "rgb(0, 125, 214)"
    } else {
       return "orange"
    }
 }