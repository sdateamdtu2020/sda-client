import React from "react";

import { useStyles } from "./LineChart.elements";
import { IconButton, Button } from "@material-ui/core";

import { AiFillCloseCircle } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

import LineChart from "../../../Visualization/Linechart/LineChart";

import { useSelector, useDispatch } from "react-redux";
import {
	setInfoWidget,
	setPortIsLinked,
	setPortCanLinked,
	setLineCategories,
	setLineData,
	setLineTitle,
	setLineUnit,
} from "../../../../app/slice/dashboardSlice";
import {
	CLIMATE_HUMIDITY,
	CLIMATE_RAINFALL,
	CLIMATE_TEMPERATURE,
	INDUSTRY_PRODUCTION,
} from "../../../../app/ItemTypes";
import {
	getHumidityByCity,
	getIndustryByCity,
	getRainfallByCity,
	getTemperatureByCity,
} from "../../../../api";

const WidgetLineChart = ({ id, data, inputs, outputs }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const itemIsSelects = useSelector(
		(state) => state.dashboard.mashupContent.itemIsSelect
	);

	const handleOnClick = () => {
		let action;
		const portWidget = itemIsSelects[0].split("-")[0];
		const portViz = id.split("-")[0];
		const portLinked = [`port-${portWidget}`, `port-${portViz}`];
		action = setPortIsLinked(portLinked);
		dispatch(action);
		action = setPortCanLinked(true);
		dispatch(action);

		let series = [];
		let categories = [];

		let state = {
			isHumidity: false,
			isTemperature: false,
			isRainfall: false,
			isIndustry: false,
			isCity: false,
		};

		let cities = [];

		itemIsSelects.map((itemIsSelect) => {
			if (itemIsSelect.split("-")[0] === CLIMATE_HUMIDITY) {
				state.isHumidity = true;
				if (itemIsSelect.split("-")[1] === "city") {
					state.isCity = true;
					const citySelect = itemIsSelect.split("-")[2];
					cities.push(citySelect);
				} else {
					state.isCity = false;
					cities = [];
				}
			} else if (itemIsSelect.split("-")[0] === CLIMATE_TEMPERATURE) {
				state.isTemperature = true;
				if (itemIsSelect.split("-")[1] === "city") {
					state.isCity = true;
					const citySelect = itemIsSelect.split("-")[2];
					cities.push(citySelect);
				} else {
					state.isCity = false;
					cities = [];
				}
			} else if (itemIsSelect.split("-")[0] === CLIMATE_RAINFALL) {
				state.isRainfall = true;
				if (itemIsSelect.split("-")[1] === "city") {
					state.isCity = true;
					const citySelect = itemIsSelect.split("-")[2];
					cities.push(citySelect);
				} else {
					state.isCity = false;
					cities = [];
				}
			} else if (itemIsSelect.split("-")[0] === INDUSTRY_PRODUCTION) {
				state.isIndustry = true;
				if (itemIsSelect.split("-")[1] === "city") {
					state.isCity = true;
					const citySelect = itemIsSelect.split("-")[2];
					cities.push(citySelect);
				} else {
					state.isCity = false;
					cities = [];
				}
			}
			return null;
		});

		if (state.isHumidity === true && state.isCity === true) {
			const fetchHumidityByCity = async (cities) => {
				const requests = cities.map(async (city) => {
					let object = {};
					let name = "";
					return await getHumidityByCity(city).then((item) => {
						const data = [];
						const category = [];

						item.results.bindings.map((item) => {
							name = item.city.value;
							const year = item.year.value;
							const value = Number(item.value.value);
							category.push(year);
							data.push(value);

							return null;
						});

						object = {
							...object,
							name: name,
							data: data,
						};
						categories = category;
						series = [...series, object];
					});
				});
				return Promise.all(requests);
			};

			fetchHumidityByCity(cities).then(() => {
				action = setLineCategories(categories);
				dispatch(action);
				action = setLineData(series);
				dispatch(action);
				action = setLineTitle("Yearly Humidity (%)");
				dispatch(action);
				action = setLineUnit("%");
				dispatch(action);
			});
		} else if (state.isTemperature === true && state.isCity === true) {
			const fetchTemperatureByCity = async (cities) => {
				const requests = cities.map(async (city) => {
					let object = {};
					let name = "";
					return await getTemperatureByCity(city).then((item) => {
						const data = [];
						const category = [];

						item.results.bindings.map((item) => {
							name = item.city.value;
							const year = item.year.value;
							const value = Number(item.value.value);
							category.push(year);
							data.push(value);

							return null;
						});

						object = {
							...object,
							name: name,
							data: data,
						};
						categories = category;
						series = [...series, object];
					});
				});
				return Promise.all(requests);
			};

			fetchTemperatureByCity(cities).then(() => {
				action = setLineCategories(categories);
				dispatch(action);
				action = setLineData(series);
				dispatch(action);
				action = setLineTitle("Yearly Temperature (°C)");
				dispatch(action);
				action = setLineUnit("°C");
				dispatch(action);
			});
		} else if (state.isRainfall === true && state.isCity === true) {
			const fetchRainfallByCity = async (cities) => {
				const requests = cities.map(async (city) => {
					let object = {};
					let name = "";
					return await getRainfallByCity(city).then((item) => {
						const data = [];
						const category = [];

						item.results.bindings.map((item) => {
							name = item.city.value;
							const year = item.year.value;
							const value = Number(item.value.value);
							category.push(year);
							data.push(value);

							return null;
						});

						object = {
							...object,
							name: name,
							data: data,
						};
						categories = category;
						series = [...series, object];
					});
				});
				return Promise.all(requests);
			};

			fetchRainfallByCity(cities).then(() => {
				action = setLineCategories(categories);
				dispatch(action);
				action = setLineData(series);
				dispatch(action);
				action = setLineTitle("Yearly Rainfall (mm)");
				dispatch(action);
				action = setLineUnit("mm");
				dispatch(action);
			});
		} else if (state.isIndustry === true && state.isCity === true) {
			const fetchIndustryByCity = async (cities) => {
				const requests = cities.map(async (city) => {
					let object = {};
					let name = "";
					return await getIndustryByCity(city).then((item) => {
						const data = [];
						const category = [];

						item.results.bindings.map((item) => {
							name = item.city.value;
							const year = item.year.value;
							const value = Number(item.value.value);
							category.push(year);
							data.push(value);

							return null;
						});

						object = {
							...object,
							name: name,
							data: data,
						};
						categories = category;
						series = [...series, object];
					});
				});
				return Promise.all(requests);
			};

			fetchIndustryByCity(cities).then(() => {
				action = setLineCategories(categories);
				dispatch(action);
				action = setLineData(series);
				dispatch(action);
				action = setLineTitle("Yearly Industry (IPI)");
				dispatch(action);
				action = setLineUnit("Industrial Index (IPI)");
				dispatch(action);
			});
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
