import React from "react";
import { useStyles } from "./Properties.elements";
import { TextField } from "@material-ui/core";
const Properties = () => {
	const classes = useStyles();
	return (
		<form className={classes.properties} noValidate autoComplete="off">
			<TextField
				className={classes.name}
				label="Name"
				id="outlined-size-small"
				defaultValue=" "
				variant="outlined"
				size="small"
			/>
			<TextField
				className={classes.description}
				label="Description"
				id="outlined-size-small"
				defaultValue=" "
				variant="outlined"
				size="small"
				multiline
				rows={3}
			/>
		</form>
	);
};

export default Properties;
