import React from "react";
import Highcharts from "highcharts";

import { useStyles } from "./StatisticsMerge.elements";
import { IconButton, Button } from "@material-ui/core";

import { AiFillCloseCircle } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

import { useSelector, useDispatch } from "react-redux";
import {
	setInfoWidget,
	setItemIsSelect,
	setMergeCategories,
	setMergeData,
	setMergeTitle,
	setMergeYAxis,
} from "../../../../app/slice/dashboardSlice";
import {
	getDataMergeThreeWidgetPeriodOfCity,
	getDataMergeTwoWidgetPeriodOfCity,
} from "../../../../api";
import {
	AFFORESTATION,
	FOREST_COVER_AREA,
	HUMIDITY,
	INDUSTRY_PRODUCTION,
	OPERATORS,
	POPULATION_PRODUCTION,
	RAINFALL,
	STATISTICS_MERGE,
	TEMPERATURE,
} from "../../../../app/ItemTypes";

const StatisticsMerge = ({ id, data, inputs, outputs }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const merge = useSelector((state) => state.dashboard.mashupContent.merge);

	const getUnit = (name) => {
		let unit = "";
		switch (name) {
			case TEMPERATURE:
				unit = "°C";
				break;
			case HUMIDITY:
				unit = "%";
				break;
			case RAINFALL:
				unit = "mm";
				break;
			case INDUSTRY_PRODUCTION:
				unit = "IPI";
				break;
			case POPULATION_PRODUCTION:
				unit = "k";
				break;
			case AFFORESTATION:
				unit = "1000km²";
				break;
			case FOREST_COVER_AREA:
				unit = "1000km²";
				break;
			default:
				unit = "";
				break;
		}
		return unit;
	};

	const handleOnClick = async () => {
		let action;
		console.log("merge: ", merge);

		const idSelect = [`${OPERATORS}-${STATISTICS_MERGE}`];
		action = setItemIsSelect(idSelect);
		dispatch(action);

		const city = merge[0].split("-")[2];
		const fYear = merge[0].split("-")[3];
		const tYear = merge[0].split("-")[4];
		let cityName = "";
		let categories;
		let series;
		let checkCity = false;
		let checkFYear = false;
		let checkTYear = false;
		let dataSetTitle = [];
		let yAxis = [];
		checkCity = merge.every((itemMerge) => itemMerge.split("-")[2] === city);
		checkFYear = merge.every((itemMerge) => itemMerge.split("-")[3] === fYear);
		checkTYear = merge.every((itemMerge) => itemMerge.split("-")[4] === tYear);

		if (checkCity && checkFYear && checkTYear) {
			if (merge.length === 2) {
				let dc = [];
				let ds = [];
				merge.map((itemMerge) => {
					const itemArray = itemMerge.split("-");
					dc.push(itemArray[0]);
					ds.push(itemArray[1]);
					return null;
				});

				dataSetTitle = ds;

				const fetchDataMergeTwoWidgetPeriodOfCity = async (
					dataCube1,
					dataSet1,
					dataCube2,
					dataSet2,
					city,
					fYear,
					tYear
				) => {
					return await getDataMergeTwoWidgetPeriodOfCity(
						dataCube1,
						dataSet1,
						dataCube2,
						dataSet2,
						city,
						fYear,
						tYear
					).then((items) => {
						const category = [];
						let names = [];
						let arrayObject = [];
						let yAxisObject = [];
						const dataObject = [[], []];

						const itemsHead = items.head.vars;
						itemsHead.shift();
						itemsHead.shift();
						console.log("itemsHead: ", itemsHead);
						names = itemsHead;

						items.results.bindings.map((item) => {
							cityName = item.city.value;
							const year = item.year.value;
							const valueMerge1 = Number(item[names[0]].value);
							const valueMerge2 = Number(item[names[1]].value);

							dataObject[0].push(valueMerge1);
							dataObject[1].push(valueMerge2);
							category.push(year);
							return null;
						});
						names.map((name, index) => {
							let opposite = false;
							if (index !== 0) {
								opposite = true;
							}

							let yAxisData = {
								labels: {
									format: `{value}${getUnit(name)}`,
									style: {
										color: Highcharts.getOptions().colors[index],
									},
								},
								title: {
									text: name,
									style: {
										color: Highcharts.getOptions().colors[index],
									},
								},
								opposite: opposite,
							};
							yAxisObject.push(yAxisData);

							let type = "";
							if (name === RAINFALL || name === INDUSTRY_PRODUCTION) {
								type = "column";
							} else {
								type = "spline";
							}

							let object = {
								name: name,
								type: type,
								yAxis: index,
								data: dataObject[index],
							};
							arrayObject.push(object);
							return null;
						});

						categories = category;
						series = arrayObject;
						yAxis = yAxisObject;
					});
				};
				return fetchDataMergeTwoWidgetPeriodOfCity(
					dc[0],
					ds[0],
					dc[1],
					ds[1],
					city,
					fYear,
					tYear
				)
					.then(() => {
						action = setMergeCategories(categories);
						dispatch(action);
						action = setMergeData(series);
						dispatch(action);
						action = setMergeTitle(
							`${dataSetTitle[0]} & ${dataSetTitle[1]} of ${cityName}`
						);
						dispatch(action);
						action = setMergeYAxis(yAxis);
						dispatch(action);
					})
					.catch((error) => console.log("error", error));
			} else if (merge.length === 3) {
				let dc = [];
				let ds = [];
				merge.map((itemMerge) => {
					const itemArray = itemMerge.split("-");
					dc.push(itemArray[0]);
					ds.push(itemArray[1]);
					return null;
				});

				dataSetTitle = ds;

				const fetchDataMergeThreeWidgetPeriodOfCity = async (
					dataCube1,
					dataSet1,
					dataCube2,
					dataSet2,
					dataCube3,
					dataSet3,
					city,
					fYear,
					tYear
				) => {
					return await getDataMergeThreeWidgetPeriodOfCity(
						dataCube1,
						dataSet1,
						dataCube2,
						dataSet2,
						dataCube3,
						dataSet3,
						city,
						fYear,
						tYear
					).then((items) => {
						const category = [];
						let names = [];
						let arrayObject = [];
						let yAxisObject = [];
						const dataObject = [[], [], []];

						const itemsHead = items.head.vars;
						itemsHead.shift();
						itemsHead.shift();

						names = itemsHead;

						items.results.bindings.map((item) => {
							cityName = item.city.value;
							const year = item.year.value;
							const valueMerge1 = Number(item[names[0]].value);
							const valueMerge2 = Number(item[names[1]].value);
							const valueMerge3 = Number(item[names[2]].value);

							dataObject[0].push(valueMerge1);
							dataObject[1].push(valueMerge2);
							dataObject[2].push(valueMerge3);
							category.push(year);
							return null;
						});
						names.map((name, index) => {
							let opposite = false;
							if (index !== 0) {
								opposite = true;
							}
							let yAxisData = {
								labels: {
									format: `{value}${getUnit(name)}`,
									style: {
										color: Highcharts.getOptions().colors[index],
									},
								},
								title: {
									text: name,
									style: {
										color: Highcharts.getOptions().colors[index],
									},
								},
								opposite: opposite,
							};
							yAxisObject.push(yAxisData);

							let type = "";
							if (name === RAINFALL || name === INDUSTRY_PRODUCTION) {
								type = "column";
							} else {
								type = "spline";
							}

							let object = {
								name: name,
								type: type,
								yAxis: index,
								data: dataObject[index],
							};
							arrayObject.push(object);
							return null;
						});

						categories = category;
						series = arrayObject;
						yAxis = yAxisObject;
					});
				};
				return fetchDataMergeThreeWidgetPeriodOfCity(
					dc[0],
					ds[0],
					dc[1],
					ds[1],
					dc[2],
					ds[2],
					city,
					fYear,
					tYear
				)
					.then(() => {
						action = setMergeCategories(categories);
						dispatch(action);
						action = setMergeData(series);
						dispatch(action);
						action = setMergeTitle(
							`${dataSetTitle[0]} & ${dataSetTitle[1]} & ${dataSetTitle[2]} of ${cityName}`
						);
						dispatch(action);
						action = setMergeYAxis(yAxis);
						dispatch(action);
					})
					.catch((error) => console.log("error", error));
			}
		}
	};

	const handleQuestionButton = (id) => {
		const arrayId = id.split("-");
		const newId = arrayId.pop();
		const indexNewId = arrayId.indexOf(newId);

		if (indexNewId > -1) {
			arrayId.splice(indexNewId, 1);
		}

		const newIdString = arrayId.join("-");

		const action = setInfoWidget(newIdString);
		dispatch(action);
	};

	return (
		<div className={classes.node}>
			<div className={classes.header}>
				<div className={classes.headerLeft} />
				<div className={classes.headerCenter}>
					<p className={classes.headerTitle}>Statistics Merge</p>
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
			<div className={classes.port}>
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
				<div className={classes.portOut}>
					{outputs.map((port) =>
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
			</div>
		</div>
	);
};

export default StatisticsMerge;
