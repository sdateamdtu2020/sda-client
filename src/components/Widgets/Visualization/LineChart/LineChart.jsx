import React from "react";

import { useStyles } from "./LineChart.elements";
import { IconButton, Button } from "@material-ui/core";

import { AiFillCloseCircle } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

import LineChart from "../../../Visualization/Linechart/LineChart";

import { useSelector, useDispatch } from "react-redux";
import {
	setInfoWidget,
	setLineCategories,
	setLineData,
	setLineTitle,
	setLineUnit,
} from "../../../../app/slice/dashboardSlice";
import {
	AFFORESTATION,
	CITY,
	CLIMATE,
	FOREST,
	FOREST_COVER_AREA,
	HUMIDITY,
	INDUSTRY,
	INDUSTRY_PRODUCTION,
	PERIOD_OF_CITY,
	POPULATION,
	POPULATION_PRODUCTION,
	RAINFALL,
	TEMPERATURE,
} from "../../../../app/ItemTypes";
import {
	getAfforestationByCity,
	getAfforestationByPeriodOfCity,
	getForestCoverAreaByCity,
	getForestCoverAreaByPeriodOfCity,
	getHumidityByCity,
	getHumidityByPeriodOfCity,
	getIndustryByCity,
	getIndustryByPeriodOfCity,
	getPopulationByCity,
	getPopulationByPeriodOfCity,
	getRainfallByCity,
	getRainfallByPeriodOfCity,
	getTemperatureByCity,
	getTemperatureByPeriodOfCity,
} from "../../../../api";

const WidgetLineChart = ({ id, data, inputs, outputs }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const itemIsSelects = useSelector(
		(state) => state.dashboard.mashupContent.itemIsSelect
	);

	const periodCity = [
		useSelector((state) => state.dashboard.mashupContent.periodOfCity.city),
		useSelector((state) => state.dashboard.mashupContent.periodOfCity.fromYear),
		useSelector((state) => state.dashboard.mashupContent.periodOfCity.toYear),
	];

	const itemIsSelectCity = useSelector(
		(state) => state.dashboard.mashupContent.itemIsSelectCity
	);
	const itemIsSelectYear = useSelector(
		(state) => state.dashboard.mashupContent.itemIsSelectYear
	);

	const handleOnClick = () => {
		let action;

		const idArray = itemIsSelectCity[0].split("-");
		const dataCube = idArray[0];
		const dataSet = idArray[1];
		const filter = idArray[2];
		const city = idArray[3];

		let series = [];
		let categories = [];
		let cities = [];

		if (city !== undefined) {
			itemIsSelects.map((item) => cities.push(item.split("-")[3]));
		}

		if (itemIsSelectYear.length !== 0) {
		} else {
			// In city
			if (dataCube === CLIMATE) {
				if (dataSet === HUMIDITY) {
					if (filter === CITY) {
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

						fetchHumidityByCity(cities)
							.then(() => {
								action = setLineCategories(categories);
								dispatch(action);
								action = setLineData(series);
								dispatch(action);
								action = setLineTitle("Yearly Humidity");
								dispatch(action);
								action = setLineUnit("%");
								dispatch(action);
							})
							.catch((error) => console.log("error", error));
					} else if (filter === PERIOD_OF_CITY) {
						let name = "";
						const fetchHumidityByPeriodOfCity = async (
							cityId,
							fYear,
							tYear
						) => {
							let object = {};
							return await getHumidityByPeriodOfCity(cityId, fYear, tYear).then(
								(item) => {
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

									return null;
								}
							);
						};
						if (
							periodCity[0] !== "" &&
							periodCity[1] !== "" &&
							periodCity[2] !== ""
						) {
							fetchHumidityByPeriodOfCity(
								periodCity[0],
								periodCity[1],
								periodCity[2]
							)
								.then(() => {
									action = setLineCategories(categories);
									dispatch(action);
									action = setLineData(series);
									dispatch(action);
									action = setLineTitle(`Yearly Humidity of ${name}`);
									dispatch(action);
									action = setLineUnit("%");
									dispatch(action);
								})
								.catch((error) => console.log("error", error));
						}
					}
				} else if (dataSet === TEMPERATURE) {
					if (filter === CITY) {
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

						fetchTemperatureByCity(cities)
							.then(() => {
								action = setLineCategories(categories);
								dispatch(action);
								action = setLineData(series);
								dispatch(action);
								action = setLineTitle("Yearly Temperature");
								dispatch(action);
								action = setLineUnit("°C");
								dispatch(action);
							})
							.catch((error) => console.log("error", error));
					} else if (filter === PERIOD_OF_CITY) {
						let name = "";
						const fetchTemperatureByPeriodOfCity = async (
							cityId,
							fYear,
							tYear
						) => {
							let object = {};
							return await getTemperatureByPeriodOfCity(
								cityId,
								fYear,
								tYear
							).then((item) => {
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

								return null;
							});
						};
						if (
							periodCity[0] !== "" &&
							periodCity[1] !== "" &&
							periodCity[2] !== ""
						) {
							fetchTemperatureByPeriodOfCity(
								periodCity[0],
								periodCity[1],
								periodCity[2]
							)
								.then(() => {
									action = setLineCategories(categories);
									dispatch(action);
									action = setLineData(series);
									dispatch(action);
									action = setLineTitle(`Yearly Temperature of ${name}`);
									dispatch(action);
									action = setLineUnit("°C");
									dispatch(action);
								})
								.catch((error) => console.log("error", error));
						}
					}
				} else if (dataSet === RAINFALL) {
					if (filter === CITY) {
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

						fetchRainfallByCity(cities)
							.then(() => {
								action = setLineCategories(categories);
								dispatch(action);
								action = setLineData(series);
								dispatch(action);
								action = setLineTitle("Yearly Rainfall");
								dispatch(action);
								action = setLineUnit("%");
								dispatch(action);
							})
							.catch((error) => console.log("error", error));
					} else if (filter === PERIOD_OF_CITY) {
						let name = "";
						const fetchRainfallByPeriodOfCity = async (
							cityId,
							fYear,
							tYear
						) => {
							let object = {};
							return await getRainfallByPeriodOfCity(cityId, fYear, tYear).then(
								(item) => {
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

									return null;
								}
							);
						};
						if (
							periodCity[0] !== "" &&
							periodCity[1] !== "" &&
							periodCity[2] !== ""
						) {
							fetchRainfallByPeriodOfCity(
								periodCity[0],
								periodCity[1],
								periodCity[2]
							)
								.then(() => {
									action = setLineCategories(categories);
									dispatch(action);
									action = setLineData(series);
									dispatch(action);
									action = setLineTitle(`Yearly Rainfall of ${name}`);
									dispatch(action);
									action = setLineUnit("mm");
									dispatch(action);
								})
								.catch((error) => console.log("error", error));
						}
					}
				}
			} else if (dataCube === INDUSTRY) {
				if (dataSet === INDUSTRY_PRODUCTION) {
					if (filter === CITY) {
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

						fetchIndustryByCity(cities)
							.then(() => {
								action = setLineCategories(categories);
								dispatch(action);
								action = setLineData(series);
								dispatch(action);
								action = setLineTitle("Yearly Industry");
								dispatch(action);
								action = setLineUnit("IPI");
								dispatch(action);
							})
							.catch((error) => console.log("error", error));
					} else if (filter === PERIOD_OF_CITY) {
						let name = "";
						const fetchIndustryByPeriodOfCity = async (
							cityId,
							fYear,
							tYear
						) => {
							let object = {};
							return await getIndustryByPeriodOfCity(cityId, fYear, tYear).then(
								(item) => {
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

									return null;
								}
							);
						};
						if (
							periodCity[0] !== "" &&
							periodCity[1] !== "" &&
							periodCity[2] !== ""
						) {
							fetchIndustryByPeriodOfCity(
								periodCity[0],
								periodCity[1],
								periodCity[2]
							)
								.then(() => {
									action = setLineCategories(categories);
									dispatch(action);
									action = setLineData(series);
									dispatch(action);
									action = setLineTitle(`Yearly Industry of ${name}`);
									dispatch(action);
									action = setLineUnit("IPI");
									dispatch(action);
								})
								.catch((error) => console.log("error", error));
						}
					}
				} else {
				}
			} else if (dataCube === FOREST) {
				if (dataSet === AFFORESTATION) {
					if (filter === CITY) {
						const fetchAfforestationByCity = async (cities) => {
							const requests = cities.map(async (city) => {
								let object = {};
								let name = "";
								return await getAfforestationByCity(city).then((item) => {
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

						fetchAfforestationByCity(cities)
							.then(() => {
								action = setLineCategories(categories);
								dispatch(action);
								action = setLineData(series);
								dispatch(action);
								action = setLineTitle("Yearly Afforestation");
								dispatch(action);
								action = setLineUnit("IPI");
								dispatch(action);
							})
							.catch((error) => console.log("error", error));
					} else if (filter === PERIOD_OF_CITY) {
						let name = "";
						const fetchAfforestationByPeriodOfCity = async (
							cityId,
							fYear,
							tYear
						) => {
							let object = {};
							return await getAfforestationByPeriodOfCity(
								cityId,
								fYear,
								tYear
							).then((item) => {
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

								return null;
							});
						};
						if (
							periodCity[0] !== "" &&
							periodCity[1] !== "" &&
							periodCity[2] !== ""
						) {
							fetchAfforestationByPeriodOfCity(
								periodCity[0],
								periodCity[1],
								periodCity[2]
							)
								.then(() => {
									action = setLineCategories(categories);
									dispatch(action);
									action = setLineData(series);
									dispatch(action);
									action = setLineTitle(`Yearly Afforestation of ${name}`);
									dispatch(action);
									action = setLineUnit("IPI");
									dispatch(action);
								})
								.catch((error) => console.log("error", error));
						}
					}
				} else if (dataSet === FOREST_COVER_AREA) {
					if (filter === CITY) {
						const fetchForestCoverAreaByCity = async (cities) => {
							const requests = cities.map(async (city) => {
								let object = {};
								let name = "";
								return await getForestCoverAreaByCity(city).then((item) => {
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

						fetchForestCoverAreaByCity(cities)
							.then(() => {
								action = setLineCategories(categories);
								dispatch(action);
								action = setLineData(series);
								dispatch(action);
								action = setLineTitle("Yearly Forest Cover Area");
								dispatch(action);
								action = setLineUnit("IPI");
								dispatch(action);
							})
							.catch((error) => console.log("error", error));
					} else if (filter === PERIOD_OF_CITY) {
						let name = "";
						const fetchForestCoverAreaByPeriodOfCity = async (
							cityId,
							fYear,
							tYear
						) => {
							let object = {};
							return await getForestCoverAreaByPeriodOfCity(
								cityId,
								fYear,
								tYear
							).then((item) => {
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

								return null;
							});
						};
						if (
							periodCity[0] !== "" &&
							periodCity[1] !== "" &&
							periodCity[2] !== ""
						) {
							fetchForestCoverAreaByPeriodOfCity(
								periodCity[0],
								periodCity[1],
								periodCity[2]
							)
								.then(() => {
									action = setLineCategories(categories);
									dispatch(action);
									action = setLineData(series);
									dispatch(action);
									action = setLineTitle(`Yearly Forest Cover Area of ${name}`);
									dispatch(action);
									action = setLineUnit("IPI");
									dispatch(action);
								})
								.catch((error) => console.log("error", error));
						}
					}
				}
			} else if (dataCube === POPULATION) {
				if (dataSet === POPULATION_PRODUCTION) {
					if (filter === CITY) {
						const fetchPopulationByCity = async (cities) => {
							const requests = cities.map(async (city) => {
								let object = {};
								let name = "";
								return await getPopulationByCity(city).then((item) => {
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

						fetchPopulationByCity(cities)
							.then(() => {
								action = setLineCategories(categories);
								dispatch(action);
								action = setLineData(series);
								dispatch(action);
								action = setLineTitle("Yearly Population");
								dispatch(action);
								action = setLineUnit("thousands");
								dispatch(action);
							})
							.catch((error) => console.log("error", error));
					} else if (filter === PERIOD_OF_CITY) {
						let name = "";
						const fetchPopulationByPeriodOfCity = async (
							cityId,
							fYear,
							tYear
						) => {
							let object = {};
							return await getPopulationByPeriodOfCity(
								cityId,
								fYear,
								tYear
							).then((item) => {
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

								return null;
							});
						};
						if (
							periodCity[0] !== "" &&
							periodCity[1] !== "" &&
							periodCity[2] !== ""
						) {
							fetchPopulationByPeriodOfCity(
								periodCity[0],
								periodCity[1],
								periodCity[2]
							)
								.then(() => {
									action = setLineCategories(categories);
									dispatch(action);
									action = setLineData(series);
									dispatch(action);
									action = setLineTitle(`Yearly Population of ${name}`);
									dispatch(action);
									action = setLineUnit("thousands");
									dispatch(action);
								})
								.catch((error) => console.log("error", error));
						}
					}
				} else {
				}
			}
		}

		// if (dataCube === CLIMATE) {
		// 	if (dataSet === HUMIDITY) {
		// 		if (filter === CITY) {
		// 			const fetchHumidityByCity = async (cities) => {
		// 				const requests = cities.map(async (city) => {
		// 					let object = {};
		// 					let name = "";
		// 					return await getHumidityByCity(city).then((item) => {
		// 						const data = [];
		// 						const category = [];

		// 						item.results.bindings.map((item) => {
		// 							name = item.city.value;
		// 							const year = item.year.value;
		// 							const value = Number(item.value.value);
		// 							category.push(year);
		// 							data.push(value);

		// 							return null;
		// 						});

		// 						object = {
		// 							...object,
		// 							name: name,
		// 							data: data,
		// 						};
		// 						categories = category;
		// 						series = [...series, object];
		// 					});
		// 				});
		// 				return Promise.all(requests);
		// 			};

		// 			fetchHumidityByCity(cities).then(() => {
		// 				action = setLineCategories(categories);
		// 				dispatch(action);
		// 				action = setLineData(series);
		// 				dispatch(action);
		// 				action = setLineTitle("Yearly Humidity (%)");
		// 				dispatch(action);
		// 				action = setLineUnit("%");
		// 				dispatch(action);
		// 			});
		// 		} else if (filter === PERIOD_OF_CITY) {
		// 			const fetchHumidityByPeriodOfCity = async (cityId, fYear, tYear) => {
		// 				let object = {};
		// 				let name = "";
		// 				return await getHumidityByPeriodOfCity(cityId, fYear, tYear).then(
		// 					(item) => {
		// 						const data = [];
		// 						const category = [];

		// 						item.results.bindings.map((item) => {
		// 							name = item.city.value;
		// 							const year = item.year.value;
		// 							const value = Number(item.value.value);
		// 							category.push(year);
		// 							data.push(value);

		// 							return null;
		// 						});

		// 						object = {
		// 							...object,
		// 							name: name,
		// 							data: data,
		// 						};
		// 						categories = category;
		// 						series = [...series, object];

		// 						return null;
		// 					}
		// 				);
		// 			};
		// 			if (
		// 				periodCity[0] !== "" &&
		// 				periodCity[1] !== "" &&
		// 				periodCity[2] !== ""
		// 			) {
		// 				fetchHumidityByPeriodOfCity(
		// 					periodCity[0],
		// 					periodCity[1],
		// 					periodCity[2]
		// 				).then(() => {
		// 					action = setLineCategories(categories);
		// 					dispatch(action);
		// 					action = setLineData(series);
		// 					dispatch(action);
		// 					action = setLineTitle("Yearly Humidity");
		// 					dispatch(action);
		// 					action = setLineUnit("%");
		// 					dispatch(action);
		// 				});
		// 			}
		// 		}
		// 	} else if (dataSet === TEMPERATURE) {
		// 		if (filter === CITY) {
		// 			const fetchTemperatureByCity = async (cities) => {
		// 				const requests = cities.map(async (city) => {
		// 					let object = {};
		// 					let name = "";
		// 					return await getTemperatureByCity(city).then((item) => {
		// 						const data = [];
		// 						const category = [];

		// 						item.results.bindings.map((item) => {
		// 							name = item.city.value;
		// 							const year = item.year.value;
		// 							const value = Number(item.value.value);
		// 							category.push(year);
		// 							data.push(value);

		// 							return null;
		// 						});

		// 						object = {
		// 							...object,
		// 							name: name,
		// 							data: data,
		// 						};
		// 						categories = category;
		// 						series = [...series, object];
		// 					});
		// 				});
		// 				return Promise.all(requests);
		// 			};

		// 			fetchTemperatureByCity(cities).then(() => {
		// 				action = setLineCategories(categories);
		// 				dispatch(action);
		// 				action = setLineData(series);
		// 				dispatch(action);
		// 				action = setLineTitle("Yearly Temperature (%)");
		// 				dispatch(action);
		// 				action = setLineUnit("%");
		// 				dispatch(action);
		// 			});
		// 		} else if (filter === PERIOD_OF_CITY) {
		// 			const fetchTemperatureByPeriodOfCity = async (
		// 				cityId,
		// 				fYear,
		// 				tYear
		// 			) => {
		// 				let object = {};
		// 				let name = "";
		// 				return await getTemperatureByPeriodOfCity(
		// 					cityId,
		// 					fYear,
		// 					tYear
		// 				).then((item) => {
		// 					const data = [];
		// 					const category = [];

		// 					item.results.bindings.map((item) => {
		// 						name = item.city.value;
		// 						const year = item.year.value;
		// 						const value = Number(item.value.value);
		// 						category.push(year);
		// 						data.push(value);

		// 						return null;
		// 					});

		// 					object = {
		// 						...object,
		// 						name: name,
		// 						data: data,
		// 					};
		// 					categories = category;
		// 					series = [...series, object];

		// 					return null;
		// 				});
		// 			};
		// 			if (
		// 				periodCity[0] !== "" &&
		// 				periodCity[1] !== "" &&
		// 				periodCity[2] !== ""
		// 			) {
		// 				fetchTemperatureByPeriodOfCity(
		// 					periodCity[0],
		// 					periodCity[1],
		// 					periodCity[2]
		// 				).then(() => {
		// 					action = setLineCategories(categories);
		// 					dispatch(action);
		// 					action = setLineData(series);
		// 					dispatch(action);
		// 					action = setLineTitle("Yearly Temperature");
		// 					dispatch(action);
		// 					action = setLineUnit("%");
		// 					dispatch(action);
		// 				});
		// 			}
		// 		}
		// 	} else if (dataSet === RAINFALL) {
		// 		if (filter === CITY) {
		// 			const fetchRainfallByCity = async (cities) => {
		// 				const requests = cities.map(async (city) => {
		// 					let object = {};
		// 					let name = "";
		// 					return await getRainfallByCity(city).then((item) => {
		// 						const data = [];
		// 						const category = [];

		// 						item.results.bindings.map((item) => {
		// 							name = item.city.value;
		// 							const year = item.year.value;
		// 							const value = Number(item.value.value);
		// 							category.push(year);
		// 							data.push(value);

		// 							return null;
		// 						});

		// 						object = {
		// 							...object,
		// 							name: name,
		// 							data: data,
		// 						};
		// 						categories = category;
		// 						series = [...series, object];
		// 					});
		// 				});
		// 				return Promise.all(requests);
		// 			};

		// 			fetchRainfallByCity(cities).then(() => {
		// 				action = setLineCategories(categories);
		// 				dispatch(action);
		// 				action = setLineData(series);
		// 				dispatch(action);
		// 				action = setLineTitle("Yearly Rainfall (%)");
		// 				dispatch(action);
		// 				action = setLineUnit("%");
		// 				dispatch(action);
		// 			});
		// 		} else if (filter === PERIOD_OF_CITY) {
		// 			const fetchRainfallByPeriodOfCity = async (cityId, fYear, tYear) => {
		// 				let object = {};
		// 				let name = "";
		// 				return await getRainfallByPeriodOfCity(cityId, fYear, tYear).then(
		// 					(item) => {
		// 						const data = [];
		// 						const category = [];

		// 						item.results.bindings.map((item) => {
		// 							name = item.city.value;
		// 							const year = item.year.value;
		// 							const value = Number(item.value.value);
		// 							category.push(year);
		// 							data.push(value);

		// 							return null;
		// 						});

		// 						object = {
		// 							...object,
		// 							name: name,
		// 							data: data,
		// 						};
		// 						categories = category;
		// 						series = [...series, object];

		// 						return null;
		// 					}
		// 				);
		// 			};
		// 			if (
		// 				periodCity[0] !== "" &&
		// 				periodCity[1] !== "" &&
		// 				periodCity[2] !== ""
		// 			) {
		// 				fetchRainfallByPeriodOfCity(
		// 					periodCity[0],
		// 					periodCity[1],
		// 					periodCity[2]
		// 				).then(() => {
		// 					action = setLineCategories(categories);
		// 					dispatch(action);
		// 					action = setLineData(series);
		// 					dispatch(action);
		// 					action = setLineTitle("Yearly Rainfall");
		// 					dispatch(action);
		// 					action = setLineUnit("%");
		// 					dispatch(action);
		// 				});
		// 			}
		// 		}
		// 	}
		// } else if (dataCube === INDUSTRY) {
		// 	if (dataSet === INDUSTRY_PRODUCTION) {
		// 		if (filter === CITY) {
		// 			const fetchIndustryByCity = async (cities) => {
		// 				const requests = cities.map(async (city) => {
		// 					let object = {};
		// 					let name = "";
		// 					return await getIndustryByCity(city).then((item) => {
		// 						const data = [];
		// 						const category = [];

		// 						item.results.bindings.map((item) => {
		// 							name = item.city.value;
		// 							const year = item.year.value;
		// 							const value = Number(item.value.value);
		// 							category.push(year);
		// 							data.push(value);

		// 							return null;
		// 						});

		// 						object = {
		// 							...object,
		// 							name: name,
		// 							data: data,
		// 						};
		// 						categories = category;
		// 						series = [...series, object];
		// 					});
		// 				});
		// 				return Promise.all(requests);
		// 			};

		// 			fetchIndustryByCity(cities).then(() => {
		// 				action = setLineCategories(categories);
		// 				dispatch(action);
		// 				action = setLineData(series);
		// 				dispatch(action);
		// 				action = setLineTitle("Yearly Industry (IPI)");
		// 				dispatch(action);
		// 				action = setLineUnit("IPI");
		// 				dispatch(action);
		// 			});
		// 		} else if (filter === PERIOD_OF_CITY) {
		// 			const fetchIndustryByPeriodOfCity = async (cityId, fYear, tYear) => {
		// 				let object = {};
		// 				let name = "";
		// 				return await getIndustryByPeriodOfCity(cityId, fYear, tYear).then(
		// 					(item) => {
		// 						const data = [];
		// 						const category = [];

		// 						item.results.bindings.map((item) => {
		// 							name = item.city.value;
		// 							const year = item.year.value;
		// 							const value = Number(item.value.value);
		// 							category.push(year);
		// 							data.push(value);

		// 							return null;
		// 						});

		// 						object = {
		// 							...object,
		// 							name: name,
		// 							data: data,
		// 						};
		// 						categories = category;
		// 						series = [...series, object];

		// 						return null;
		// 					}
		// 				);
		// 			};
		// 			if (
		// 				periodCity[0] !== "" &&
		// 				periodCity[1] !== "" &&
		// 				periodCity[2] !== ""
		// 			) {
		// 				fetchIndustryByPeriodOfCity(
		// 					periodCity[0],
		// 					periodCity[1],
		// 					periodCity[2]
		// 				).then(() => {
		// 					action = setLineCategories(categories);
		// 					dispatch(action);
		// 					action = setLineData(series);
		// 					dispatch(action);
		// 					action = setLineTitle("Yearly Industry");
		// 					dispatch(action);
		// 					action = setLineUnit("IPI");
		// 					dispatch(action);
		// 				});
		// 			}
		// 		}
		// 	}
		// }
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
