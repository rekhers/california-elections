/**
 * Utility that calculates the winner for a county
 * @param  {Object} county   
 * @return {String} name of the winning party
 */
export function whoWon(county) {
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
        return "republican";
    } else if (parseInt(lookup[democrat]) > parseInt(lookup[republican])) {
        return "democrat"
    } else {
        return "other"
    }

}