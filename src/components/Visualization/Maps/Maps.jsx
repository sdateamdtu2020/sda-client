import React, { useEffect, useState } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import { vnAll } from "./vnAll";

import { useStyles } from "./Maps.elements";
import { useSelector } from "react-redux";

highchartsMap(Highcharts); // Initialize the map module

const Maps = () => {
	const classes = useStyles();

	const dataMaps = useSelector((state) => state.dashboard.viz.maps.data);
	const dataTitleMaps = useSelector((state) => state.dashboard.viz.maps.title);
	const dataClasses = useSelector(
		(state) => state.dashboard.viz.maps.dataClasses
	);

	const [mapsOptions, setMapsOptions] = useState({
		title: {
			text: ``,
		},

		tooltip: {
			headerFormat: "{point.name}",
			pointFormat: `{point.name}, {point.value}`,
		},
		plotOptions: {
			map: {
				states: {
					hover: {
						color: "#EEDD66",
					},
				},
			},
		},
		colorAxis: {
			min: 0,
			minColor: "rgb(197, 197, 115)",
			maxColor: "rgb(247, 2, 2)",
			dataClasses: [
				{
					to: 80,
				},
				{ from: 80, to: 100 },
				{ from: 100, to: 110 },
				{ from: 110, to: 120 },
				{ from: 120, to: 130 },
				{ from: 130 },
			],
		},
		legend: {
			layout: "vertical",
			align: "right",
			verticalAlign: "bottom",
			margin: 5,
			floating: true,
			backgroundColor: "rgba(255,255,255,0.5)",
			borderRadius: 5,
		},
		subtitle: {
			text: "",
			floating: true,
			align: "right",
			y: 50,
			style: {
				fontSize: "16px",
			},
		},
		mapNavigation: {
			enabled: true,
			buttonOptions: {
				verticalAlign: "bottom",
			},
		},
		series: [
			{
				mapData: vnAll,
				data: [],
				name: "VN",
				dataLabels: {
					enabled: true,
					format: "{point.name}",
				},
			},
		],
	});

	useEffect(() => {
		let dataMap = [];
		dataMaps.map((item) => {
			dataMap.push({
				"hc-key": item[0],
				value: item[1],
			});
			return null;
		});
		setMapsOptions({
			...mapsOptions,
			title: {
				text: `${dataTitleMaps}`,
			},
			series: [
				{
					...mapsOptions.series[0],
					data: dataMap,
				},
			],
			colorAxis: {
				...mapsOptions.colorAxis,
				dataClasses: dataClasses,
			},
		});
		// eslint-disable-next-line
	}, [dataMaps, dataTitleMaps, dataClasses]);

	return (
		<div className={classes.maps}>
			<HighchartsReact
				constructorType={"mapChart"}
				highcharts={Highcharts}
				options={mapsOptions}
			/>
		</div>
	);
};

export default Maps;
