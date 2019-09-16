/*
* 
* Creates a lookup for each county, 
* returns a fill for the current path
*
*/
export function getColor(county) {
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