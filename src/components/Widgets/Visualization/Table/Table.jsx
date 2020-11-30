import React from "react";

import { useStyles } from "./Table.elements";
import { IconButton, Button } from "@material-ui/core";

import { AiFillCloseCircle } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

import { useSelector, useDispatch } from "react-redux";
import {
	setInfoWidget,
	setTableData,
	setPortIsLinked,
	setPortCanLinked,
	setTableTitle,
	setTableUnit,
} from "../../../../app/slice/dashboardSlice";

import TableComponent from "../../../Visualization/Table/Table";
import {
	CLIMATE_HUMIDITY,
	CLIMATE_RAINFALL,
	CLIMATE_TEMPERATURE,
	INDUSTRY_PRODUCTION,
} from "../../../../app/ItemTypes";
import {
	getHumidityByCity,
	getHumidityByYear,
	getIndustryByCity,
	getIndustryByYear,
	getRainfallByCity,
	getRainfallByYear,
	getTemperatureByCity,
	getTemperatureByYear,
} from "../../../../api";

const WidgetTable = ({ id, data, inputs, outputs }) => {
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

		let state = {
			isHumidity: false,
			isTemperature: false,
			isRainfall: false,
			isIndustry: false,
			isCity: false,
			isYear: false,
		};

		let dataTable = [];
		let cities = [];

		itemIsSelects.map((itemIsSelect) => {
			if (itemIsSelect.split("-")[0] === CLIMATE_HUMIDITY) {
				state.isHumidity = true;
				if (itemIsSelect.split("-")[1] === "year") {
					state.isYear = true;
				} else if (itemIsSelect.split("-")[1] === "city") {
					state.isCity = true;
					const citySelect = itemIsSelect.split("-")[2];
					cities.push(citySelect);
				} else {
					state.isYear = false;
					state.isCity = false;
					cities = [];
				}
			} else if (itemIsSelect.split("-")[0] === CLIMATE_TEMPERATURE) {
				state.isTemperature = true;
				if (itemIsSelect.split("-")[1] === "year") {
					state.isYear = true;
				} else if (itemIsSelect.split("-")[1] === "city") {
					state.isCity = true;
					const citySelect = itemIsSelect.split("-")[2];
					cities.push(citySelect);
				} else {
					state.isYear = false;
					state.isCity = false;
					cities = [];
				}
			} else if (itemIsSelect.split("-")[0] === CLIMATE_RAINFALL) {
				state.isRainfall = true;
				if (itemIsSelect.split("-")[1] === "year") {
					state.isYear = true;
				} else if (itemIsSelect.split("-")[1] === "city") {
					state.isCity = true;
					const citySelect = itemIsSelect.split("-")[2];
					cities.push(citySelect);
				} else {
					state.isYear = false;
					state.isCity = false;
					cities = [];
				}
			} else if (itemIsSelect.split("-")[0] === INDUSTRY_PRODUCTION) {
				state.isIndustry = true;
				if (itemIsSelect.split("-")[1] === "year") {
					state.isYear = true;
				} else if (itemIsSelect.split("-")[1] === "city") {
					state.isCity = true;
					const citySelect = itemIsSelect.split("-")[2];
					cities.push(citySelect);
				} else {
					state.isYear = false;
					state.isCity = false;
					cities = [];
				}
			}

			return null;
		});

		if (state.isHumidity === true) {
			if (state.isCity === true) {
				const fetchHumidityByCity = async (cities) => {
					const requests = cities.map(async (city) => {
						let cityData = {};
						return await getHumidityByCity(city).then((items) => {
							items.results.bindings.map((item) => {
								const city = item.city.value;
								const year = item.year.value;
								const value = Number(item.value.value).toPrecision();
								cityData = { city, year, value };
								dataTable.push(cityData);

								return null;
							});
						});
					});
					return Promise.all(requests);
				};
				fetchHumidityByCity(cities).then(() => {
					action = setTableData(dataTable);
					dispatch(action);
					action = setTableUnit("%");
					dispatch(action);
					action = setTableTitle("Yearly Humidity");
					dispatch(action);
				});
			} else if (state.isYear === true) {
			}
		} else if (state.isTemperature === true) {
			if (state.isCity === true) {
				const fetchTemperatureByCity = async (cities) => {
					const requests = cities.map(async (city) => {
						let cityData = {};
						return await getTemperatureByCity(city).then((items) => {
							items.results.bindings.map((item) => {
								const city = item.city.value;
								const year = item.year.value;
								const value = Number(item.value.value).toPrecision();
								cityData = { city, year, value };
								dataTable.push(cityData);

								return null;
							});
						});
					});
					return Promise.all(requests);
				};
				fetchTemperatureByCity(cities).then(() => {
					action = setTableData(dataTable);
					dispatch(action);
					action = setTableUnit("°C");
					dispatch(action);
					action = setTableTitle("Yearly Temperature");
					dispatch(action);
				});
			} else if (state.isYear === true) {
			}
		} else if (state.isRainfall === true) {
			if (state.isCity === true) {
				const fetchRainfallByCity = async (cities) => {
					const requests = cities.map(async (city) => {
						let cityData = {};
						return await getRainfallByCity(city).then((items) => {
							items.results.bindings.map((item) => {
								const city = item.city.value;
								const year = item.year.value;
								const value = Number(item.value.value).toPrecision();
								cityData = { city, year, value };
								dataTable.push(cityData);

								return null;
							});
						});
					});
					return Promise.all(requests);
				};
				fetchRainfallByCity(cities).then(() => {
					action = setTableData(dataTable);
					dispatch(action);
					action = setTableUnit("mm");
					dispatch(action);
					action = setTableTitle("Yearly Rainfall");
					dispatch(action);
				});
			} else if (state.isYear === true) {
			}
		} else if (state.isIndustry === true) {
			if (state.isCity === true) {
				const fetchIndustryByCity = async (cities) => {
					const requests = cities.map(async (city) => {
						let cityData = {};
						return await getIndustryByCity(city).then((items) => {
							items.results.bindings.map((item) => {
								const city = item.city.value;
								const year = item.year.value;
								const value = Number(item.value.value).toPrecision();
								cityData = { city, year, value };
								dataTable.push(cityData);

								return null;
							});
						});
					});
					return Promise.all(requests);
				};
				fetchIndustryByCity(cities).then(() => {
					action = setTableData(dataTable);
					dispatch(action);
					action = setTableUnit("IPI");
					dispatch(action);
					action = setTableTitle("Yearly Industry");
					dispatch(action);
				});
			} else if (state.isYear === true) {
			}
		}
	};

	// if (itemIsSelect[0].split("-")[0] === CLIMATE_HUMIDITY) {
	// 	if (itemIsSelect[0].split("-")[1] === "year") {
	// 		const year = itemIsSelect[0].split("-")[2];

	// 		const fetchAPI = async () => {
	// 			Promise.all([await getHumidityByYear(year)]).then((values) => {
	// 				values[0].results.bindings.map((item) => {
	// 					let itemData = {};
	// 					let city = item.city.value;
	// 					let value = Number(item.value.value).toPrecision();
	// 					itemData = { city, year, value };
	// 					dataTable.push(itemData);
	// 					return null;
	// 				});
	// 				action = setTableData(dataTable);
	// 				dispatch(action);
	// 			});
	// 		};
	// 		fetchAPI();
	// 	}
	// } else if (itemIsSelect[0].split("-")[0] === INDUSTRY_PRODUCTION) {
	// 	if (itemIsSelect[0].split("-")[1] === "year") {
	// 		const year = itemIsSelect[0].split("-")[2];

	// 		const fetchAPI = async () => {
	// 			Promise.all([await getIndustryByYear(year)]).then((values) => {
	// 				values[0].results.bindings.map((item) => {
	// 					let itemData = {};
	// 					let city = item.city.value;
	// 					let value = Number(item.value.value).toPrecision();
	// 					itemData = { city, year, value };
	// 					dataTable.push(itemData);
	// 					return null;
	// 				});
	// 				action = setTableData(dataTable);
	// 				dispatch(action);
	// 			});
	// 		};
	// 		fetchAPI();
	// 	}
	// } else if (itemIsSelect[0].split("-")[0] === CLIMATE_TEMPERATURE) {
	// 	if (itemIsSelect[0].split("-")[1] === "year") {
	// 		const year = itemIsSelect[0].split("-")[2];

	// 		const fetchAPI = async () => {
	// 			Promise.all([await getTemperatureByYear(year)]).then((values) => {
	// 				values[0].results.bindings.map((item) => {
	// 					let itemData = {};
	// 					let city = item.city.value;
	// 					let value = Number(item.value.value).toPrecision();
	// 					itemData = { city, year, value };
	// 					dataTable.push(itemData);
	// 					return null;
	// 				});
	// 				action = setTableData(dataTable);
	// 				dispatch(action);
	// 			});
	// 		};
	// 		fetchAPI();
	// 	}
	// } else if (itemIsSelect[0].split("-")[0] === CLIMATE_RAINFALL) {
	// 	if (itemIsSelect[0].split("-")[1] === "year") {
	// 		const year = itemIsSelect[0].split("-")[2];

	// 		const fetchAPI = async () => {
	// 			Promise.all([await getRainfallByYear(year)]).then((values) => {
	// 				values[0].results.bindings.map((item) => {
	// 					let itemData = {};
	// 					let city = item.city.value;
	// 					let value = Number(item.value.value).toPrecision();
	// 					itemData = { city, year, value };
	// 					dataTable.push(itemData);
	// 					return null;
	// 				});
	// 				action = setTableData(dataTable);
	// 				dispatch(action);
	// 			});
	// 		};
	// 		fetchAPI();
	// 	}
	// }

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
					<p className={classes.headerTitle}>Table</p>
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
				<TableComponent />
			</div>
		</div>
	);
};

export default WidgetTable;
