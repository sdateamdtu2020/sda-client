import React, { useEffect, useState } from "react";
import { useStyles } from "./LineChart.elements";

import { useSelector } from "react-redux";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LineChart = () => {
	const classes = useStyles();

	const categories = useSelector(
		(state) => state.dashboard.viz.line.categories
	);
	const data = useSelector((state) => state.dashboard.viz.line.data);

	// eslint-disable-next-line
	const [dataLineChart, setDataLineChart] = useState({
		chart: {
			type: "line",
		},
		title: {
			text: "Yearly Average Humidity",
		},
		subtitle: {
			text: "Source: aaaaaa",
		},
		xAxis: {
			categories: [],
		},
		yAxis: {
			title: {
				text: "",
			},
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: true,
				},
				enableMouseTracking: false,
			},
		},
		series: [],
	});

	useEffect(() => {
		if (data) {
			const series = [];
			data.map((item) => series.push(item));
			setDataLineChart({
				...dataLineChart,
				xAxis: {
					categories: categories,
				},
				series: series,
			});
		}
		// eslint-disable-next-line
	}, [data, categories]);

	return (
		<div className={classes.lineChart}>
			<HighchartsReact highcharts={Highcharts} options={dataLineChart} />
		</div>
	);
};

export default LineChart;
