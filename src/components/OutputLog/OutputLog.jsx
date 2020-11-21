import React, { useEffect } from "react";

import { useStyles } from "./OutputLog.elements";
import { Button } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { setOutput } from "../../app/slice/dashboardSlice";

import { widgetInfos } from "../../data";

const OutputLog = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const widget = useSelector((state) => state.dashboard.info.widget);
	const output = useSelector((state) => state.dashboard.info.output);

	const nameOutput = (id) => {
		const name = widgetInfos[id][0].info;
		return name;
	};

	useEffect(() => {
		if (widget) {
			const name = nameOutput(widget);
			const action = setOutput(name);
			dispatch(action);
		}
	}, [widget, dispatch]);

	const handleOnClick = () => {
		const action = setOutput("clear");
		dispatch(action);
	};

	return (
		<div className={classes.outputLog}>
			<Button
				size="small"
				variant="contained"
				color="default"
				onClick={() => handleOnClick()}
				className={classes.button}
			>
				Clear
			</Button>
			{output.map((item, index) => (
				<p key={index}>{item} running</p>
			))}
		</div>
	);
};

export default OutputLog;
