import React from "react";

import { useStyles } from "./WidgetInfo.elements";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
} from "@material-ui/core";

import { widgetInfos } from "../../data/index";
import { useSelector } from "react-redux";

const WidgetInfo = () => {
	const classes = useStyles();
	const widget = useSelector((state) => state.dashboard.info.widget);
	return (
		<div className={classes.widgetInfo}>
			{widget ? (
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="table">
						<TableBody>
							{widgetInfos[widget].map((widget, index) => (
								<TableRow key={index}>
									<TableCell>{widget.id}</TableCell>
									<TableCell>{widget.info}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<p>Select widget to view its infos</p>
			)}
		</div>
	);
};

export default WidgetInfo;
