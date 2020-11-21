import React, { useEffect, useState } from "react";
import { useStyles } from "./ColumnChart.elements";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ColumnChart = () => {
	const classes = useStyles();
	const categories = useSelector(
		(state) => state.dashboard.viz.column.categories
	);
	const data = useSelector((state) => state.dashboard.viz.column.data);

	// eslint-disable-next-line
	const [dataColumnChart, setDataColumnChart] = useState({
		chart: {
			type: "column",
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
			setDataColumnChart({
				...dataColumnChart,
				xAxis: {
					categories: categories,
				},
				series: series,
			});
		}
		// eslint-disable-next-line
	}, [data, categories]);

	return (
		<div className={classes.columnChart}>
			<HighchartsReact highcharts={Highcharts} options={dataColumnChart} />
		</div>
	);
};

export default ColumnChart;
