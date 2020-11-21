import React from "react";

import { useStyles } from "./LineChart.elements";
import { IconButton, Button } from "@material-ui/core";

import { AiFillCloseCircle } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

import LineChart from "../../../Visualization/Linechart/LineChart";

import { useSelector, useDispatch } from "react-redux";
import {
	setLineCategories,
	setLineData,
	setInfoWidget,
} from "../../../../app/slice/dashboardSlice";
import { humidity } from "../../../../api/humidity";
import { CLIMATE_HUMIDITY } from "../../../../app/ItemTypes";

const WidgetLineChart = ({ id, data, inputs, outputs }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const itemIsSelect = useSelector(
		(state) => state.dashboard.mashupContent.itemIsSelect
	);

	const handleOnClick = () => {
		let series = [];
		let categories = [];
		if (itemIsSelect[0].split("-")[0] === CLIMATE_HUMIDITY) {
			itemIsSelect.map((item) => {
				const city = item.split("-")[1];
				let object = {};
				let name = "";
				let data = [];
				humidity[city].records.map((record) => {
					name = record.city;
					categories.push(record.year);
					data.push(record.humidity);
					return null;
				});
				object = {
					name: name,
					data: data,
				};
				series.push(object);

				return null;
			});
			let action = setLineCategories(categories);
			dispatch(action);
			action = setLineData(series);
			dispatch(action);
		}
	};

	const handleQuestionButton = (id) => {
		id = id.split("-")[0];
		const action = setInfoWidget(id);
		dispatch(action);
	};

	return (
		<div className={classes.node}>
			<div className={classes.header}>
				<div className={classes.headerLeft} />
				<div className={classes.headerCenter}>
					<p className={classes.headerTitle}>Line Chart</p>
				</div>
				<div className={classes.headerRight}>
					<IconButton
						aria-label="delete"
						size="small"
						color="inherit"
						onClick={() => handleQuestionButton(id)}
					>
						<RiErrorWarningFill />
					</IconButton>
					<IconButton
						aria-label="delete"
						size="small"
						color="inherit"
						onClick={() => data.onClick(id)}
					>
						<AiFillCloseCircle />
					</IconButton>
				</div>
			</div>
			<div className={classes.button}>
				<Button
					size="small"
					variant="contained"
					color="primary"
					onClick={() => handleOnClick()}
				>
					Run
				</Button>
			</div>
			<div className={classes.body}>
				<div className={classes.portIn}>
					{inputs.map((port) =>
						React.cloneElement(port, {
							style: {
								width: "15px",
								height: "15px",
								background: "#1B263B",
								borderRadius: "50%",
							},
						})
					)}
				</div>
				<LineChart />
			</div>
		</div>
	);
};

export default WidgetLineChart;
