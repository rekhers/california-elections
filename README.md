# California 2016 Elections, Visualized

A county map of the 2016 California Presidential Election Results

## Setup

Get started by installing dependencies with, `yarn install` or `yarn`. 

Next, spin up a dev server that watches `index.html` and its dependencies and navigate to `localhost:1234`.

## Explanation

I setup this project using `Parcel` to shave off dev time with its simple out of the box configuration. 

If I had more time, or the opportunity to build this out on desktop, I would: 
    - Add tests
    - Modularize code even further and make sure that d3 dependencies aren't being repeated
    - Add tooltips or hover animations. Since the instructions were to optimize for mobile, I priotized click/tap events
    - Would create a map class that could consume different configurations of the data to see a choropleth of votes by candidate across counties
    - Potentially use a framework (React) depending on the use case
    - Add a search/lookup bar