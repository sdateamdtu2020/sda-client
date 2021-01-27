# Science Research Project: Smart Dashboard Application - Client

## Date: 20 - Aug to 25 - Dec - 2020

### Functions:

- Scientific research: Environment Analysis System in Vietnam
- Dataset:
  - Climate:
    - [x] Temperature
    - [x] Humidity
    - [x] Rainfall
  - [ ] Atmosphere
  - [x] Population
  - Industry
    - [x] Industry Production
  - Forest
    - [x] Forest Cover Area
    - [x] AfForestation
- Feature:
  - [x] Filter by year
  - [x] Filter by city
  - [x] Filter by year & cities
  - [x] Filter by period of ciy
  - [x] Statistics merge
  - [ ] Simple Merge
- Visualization
  - [x] Maps
  - [x] Table
  - Charts
    - [x] Column
    - [x] Line
    - [ ] Pie
    - [x] Two Y-Axis Charts
    - [x] Three Y-Axis Charts

### Releases

- https://sda-research.ml
- http://sda-research.surge.sh

### Server Endpoint:

http://server.sda-research.ml

### Screenshot

<img src="./screenshot.png" alt="screenshot1"/>
<img src="./screenshot2.png" alt="screenshot2"/>

### Plan Of Action

1. Initial Project
2. Setup React & Install dependencies
3. Setup Router
4. Navbar component
5. InfoSection component
6. Add data to homepage
7. Create Navbar Dashboard
8. Implement Redux toolkit to app
9. Update Navbar Dashboard
10. Import Material-UI
11. Grid layout for Dashboard
12. Toolbar component
13. Initial content component
14. Setup draw diagrams
15. Refactor Toolbar component with Redux
16. addNewNode & removeNode
17. First layout of Node
18. Viz `Climate/Humidity` in TreeView
19. Initial `LineChart` & `ColumnChart`
20. `Info` container
21. `Properties` component
22. `Widget Infos` component
23. `Output Log` component
24. Viz `Industry/IndustryProduction` in TreeView
25. Initial `Maps`
26. Viz `Industry/IndustryProduction` 2012 in Maps
27. Viz `Humidity` in `LineChart`
28. Viz `Humidity` in `ColumnChart`
29. Draw connector when onClick on RUN btn
30. Clear all node when onClick on NEW btn
31. Visualization `Humidity`
32. Visualization `Temperature`
33. Visualization `Rainfall`
34. Visualization `Industry`
35. Visualization `Forestation`
36. Visualization `Population`
37. Merge two data cube
38. Visualization when merge two data cube
39. Merge three data cube
40. Visualization when merge three data cube

### Next Steps:

- Bug:
  - Select year, cities, click run > working > After that, change another year > click run > Bug: city/2013/year/2013. Only can select year and cities again so that is working
  - Select 1 city and multi years is not working

### Directory Structure

```

.
├── package.json
├── package-lock.json
├── README.md
├── deploy-firebase
├── firebase.json
├── .gitignore
└── src
    ├── api
        ├── vnId.js
        └── index.js
    ├── app
        ├── store.js
        ├── ItemTypes.js
        ├── slice
          └── dashboardSlice.js
    ├── assets
        └── img
    ├── components
        ├── Footer
        ├── InfoSection
        ├── Modal
        ├── Navbar
        ├── NavbarDashboard
        ├── OutputLog
        ├── Properties
        ├── Toolbar
          └── ListItem
        ├── UI
          ├── NotFound
          ├── Spinner
          └── index.js
        ├── Visualization
          ├── ColumnChart
          ├── LineChart
          ├── LineChartThreeAxis
          ├── LineChartTwoAxis
          ├── Maps
          ├── Table
        ├── WidgetInfo
        ├── Widget
          ├── Climate
            ├── Humidity
            ├── Rainfall
            └── Temperature
          ├── Forest
            └── Afforestation
          ├── Industry
            └── Industry Production
          ├── Operators
            └── Statistic Merge
          ├── Population
           └── Population
          ├── Visualization
            ├── ColumnChart
            ├── LineChart
            ├── LineChartThreeAxis
            ├── LineChartTwoAxis
            ├── Maps
            └── Table
          └── index.js
        ├── index.js
        └── ScrollToTop.jsx
    ├── containers
        ├── Info
        ├── MashupContent
        ├── ModalIsDevelop
        └── Dashboard
    ├── data
        └── index.js
    ├── pages
        ├── About
        ├── Contact
        ├── Dashboard
        └── HomePage
    ├── App.js
    ├── GlobalStyles.js
    ├── deploy-firebase
    ├── deploy-surge
    └── index.js
```

For the project to build, these must exist with exact filenames:

- `public/index.html` is the page template
- `src/index.js` is the entry point
- `src/GlobalStyles.js` is the Global Styles
- `src/App.js` is the Router
- `src/api` is
- `src/containers` is
- `src/data` is

## Installation Guide

### Production

- Clone this project

```
git clone https://github.com/tinspham209/SDA-client
```

- Install dependencies

```
npm install
```

- Start the server

```
npm start
```

### Development

- Clone this project
- Install dependencies

```
npm install
```

- Start packager

```
npm start
```

### Tech-Stack

- react
- @material-ui
- react-icons
- react-router-dom
- styled-components
- @reduxjs/toolkit
- axios
- react-dnd
- beautiful-react-diagrams
- highcharts

### Folder function

- `app`: store redux
- `assets`: store image
- `components`:
- `container`:
- `pages`:
- `api`

### Component function

- i'll write it as soon as i can 😀

### How to name a folder and a file

- Folder name: - Ex: `InfoSection`
- Component file name: should be -- Ex: `InfoSection.jsx`
- Style component file name: should be -- Ex: `InfoSection.elements.js`

### How to import and export module?

- Import:

```js
//import every thing
import * as React from "react";
import * as ReactDOM from "react-dom";

//for default export
import InfoSection from "./InfoSection";

//for named export
import { InfoSec, InfoRow } from "./InfoSection.elements";
```

### How to style for each component?

- Create a styled-component file. Ex: `InfoSection.elements.js`
- Import to `jsx` file

```js
// InfoSection.jsx

import { InfoSec, InfoRow } from "./InfoSection.elements";
```

### How to deploy to firebase

i'll write it as soon as i can 😀

### How to setup Redux-Toolkit

i'll write it as soon as i can 😀

### How to update state in Redux of each component

i'll write it as soon as i can 😀
