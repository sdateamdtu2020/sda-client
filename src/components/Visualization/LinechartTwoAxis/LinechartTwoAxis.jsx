import React, { useEffect, useState } from "react";
import { useStyles } from "./LinechartTwoAxis.elements";

import { useSelector } from "react-redux";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const LinechartTwoAxis = () => {
	const classes = useStyles();

	const lineSeries = useSelector(
		(state) => state.dashboard.viz.lineTwoAxis.data
	);
	const lineTitle = useSelector(
		(state) => state.dashboard.viz.lineTwoAxis.title
	);
	const lineYAxis = useSelector(
		(state) => state.dashboard.viz.lineTwoAxis.yAxis
	);
	const lineCategories = useSelector(
		(state) => state.dashboard.viz.lineTwoAxis.categories
	);

	// eslint-disable-next-line
	const [dataLineChart, setDataLineChart] = useState({
		chart: {
			type: "line",
		},
		title: {
			text: "",
		},
		subtitle: {
			text: "Source: server.sda-research.ml",
		},
		xAxis: {
			categories: [
				"2012",
				"2013",
				"2014",
				"2015",
				"2016",
				"2017",
				"2018",
				"2019",
			],
			crosshair: true,
		},
		yAxis: [],
		tooltip: {
			headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			pointFormat:
				'<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
			footerFormat: "</table>",
			shared: true,
			useHTML: true,
		},
		plotOptions: {
			line: {
				pointPadding: 0.2,
				borderWidth: 0,
			},
		},
		series: [],
	});

	useEffect(() => {
		if (lineSeries && lineCategories && lineTitle && lineYAxis) {
			setDataLineChart({
				...dataLineChart,
				xAxis: {
					...dataLineChart.xAxis,
					categories: lineCategories,
				},
				series: lineSeries,
				title: {
					text: lineTitle,
				},
				yAxis: lineYAxis,
			});
		}
		// eslint-disable-next-line
	}, [lineSeries, lineCategories, lineTitle, lineYAxis]);

	return (
		<div className={classes.lineChart}>
			<HighchartsReact highcharts={Highcharts} options={dataLineChart} />
		</div>
	);
};

export default LinechartTwoAxis;
