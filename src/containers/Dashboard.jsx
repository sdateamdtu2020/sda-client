import React from "react";

import { useStyles } from "./Dashboard.elements";

import { Toolbar } from "../components";
import MashupContent from "./MashupContent/MashupContent";
import Info from "./Info/Info";

import { listItems } from "../data";

const DashboardContainer = () => {
	const classes = useStyles();
	return (
		<div className={classes.dashboard}>
			<Toolbar listItems={listItems} />
			<MashupContent />
			<Info />
		</div>
	);
};

export default DashboardContainer;
