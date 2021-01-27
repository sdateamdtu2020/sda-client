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
	const widgetId = useSelector((state) => state.dashboard.info.widget);

	const getWidgetInfo = (id) => {
		const idArray = id.split("-");
		const dataCube = idArray[0];
		const dataSet = idArray[1];
		const filter = idArray[2];

		if (filter === undefined) {
			id = widgetInfos[dataCube][dataSet];
		} else {
			id = widgetInfos[dataCube][dataSet][filter];
		}
		return id;
	};

	return (
		<div className={classes.widgetInfo}>
			{widgetId ? (
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="table">
						<TableBody>
							{getWidgetInfo(widgetId).map((widget, index) => (
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
