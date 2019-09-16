# California 2016 Elections, Visualized

A county map of the 2016 California Presidential Election Results

## Setup

Get started by installing dependencies with, `yarn install` or `yarn`. 

I wrote a series of npm (yarn) scripts to handle compiling and watching dependencies during development. Run `yarn build` to both watch and compile files and spin up a dev server at `localhost:1234`.

## Overview

Given the limited time and the mobile first approach for this visualization, I prioritized click/tap interactions for the map, which sort and display the vote breakdown for a given county. 

In order to adapt this for desktop, I would consider adding tooltips and hover animations to the map on wider screens. I would also like to convert the vote breakdown by candidate on the election cards to  percentages and included animated horizontal bar charts showing the relative popularity of all candidates per county. 

One of the major things I would have done on a larger project would have been to write the Map code as a class that accepts different configurations of data as a parameter. This way, we could change the data object such that the user could toggle between data views. One example of this would be seeing one candidate's popularity across all counties as a choropleth.

In order maintain a more complicated application with different versions of data, I would likely consider using a framework to maintain state across the application. 

## Build

In setting up this project, I chose to use Parcel.js as a bundler because of its quick setup and built-in support for hot module loading that makes scaffolding up a project super quick. For a larger project, I would consider using webpack or rollup to enable more flexibility and custom configuration for multiple endpoints.

## Javascript

I included a script file pointing to `main` which initializes and serves as an entrypoint to the code that inserts the mapSVG into the DOM, rerolls data, adds colors to the map, and creates the election results card component.

I attempted to clean up my code and make it more readable by splitting pieces out into modules. In an ideal world, I would figure out a way to not repeat the d3 dependencies that multiple modules require. I would also add unit tests if I had more time.

## CSS

Parcel handled compiling SCSS with no configuration on my end. In naming elements I attempted to use a taxonomy that prefixes "layout" classes with `l-` and component classes with `c-`. Further, I used BEM style descriptors to keep the CSS readable and logical. 

## HTML

I setup a simple HTML index file, but in a real project I would likely use some kind of templating language or framework that could access data and avoid being hardcoded at all.





If I had more time, or the opportunity to build this out on desktop, I would: 
    - Add tests
    - Add docblock style comments
    - Modularize code even further and make sure that d3 dependencies aren't being repeated
    - Add tooltips or hover animations. Since the instructions were to optimize for mobile, I priotized click/tap events
    - Would create a map class that could consume different configurations of the data to see a choropleth of votes by candidate across counties
    - Potentially use a framework (React) depending on the use case
    - Add a search/lookup bar