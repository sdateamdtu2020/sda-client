import React from "react";

import { useStyles } from "./Maps.elements";
import { IconButton, Button } from "@material-ui/core";

import { AiFillCloseCircle } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

import Maps from "../../../Visualization/Maps/Maps";

import { useSelector, useDispatch } from "react-redux";
import {
	setColorRange,
	setInfoWidget,
	setMapsData,
	setTitleMaps,
} from "../../../../app/slice/dashboardSlice";
import {
	AFFORESTATION,
	CLIMATE,
	FOREST,
	FOREST_COVER_AREA,
	HUMIDITY,
	INDUSTRY,
	INDUSTRY_PRODUCTION,
	POPULATION,
	POPULATION_PRODUCTION,
	RAINFALL,
	TEMPERATURE,
} from "../../../../app/ItemTypes";
import {
	getAfforestationByYear,
	getDataCityInYear,
	getForestCoverAreaByYear,
	getHumidityByYear,
	getIndustryByYear,
	getPopulationByYear,
	getRainfallByYear,
	getTemperatureByYear,
} from "../../../../api";
import { vn } from "../../../../api/vnId";

const WidgetMaps = ({ id, data, inputs, outputs }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const itemIsSelectCity = useSelector(
		(state) => state.dashboard.mashupContent.itemIsSelectCity
	);
	const itemIsSelectYear = useSelector(
		(state) => state.dashboard.mashupContent.itemIsSelectYear
	);

	const handleOnClick = () => {
		let action;

		const idArray = itemIsSelectYear[0].split("-");
		const dataCube = idArray[0];
		const dataSet = idArray[1];
		const year = idArray[3];

		let dataMaps = [];

		if (itemIsSelectCity.length !== 0) {
			const cities = [];
			itemIsSelectCity.map((itemCity) => {
				const idCity = itemCity.split("-")[3];
				cities.push(idCity);
				return null;
			});

			const fetchDataCityInYear = async (dataCube, dataSet, cities, year) => {
				const requests = cities.map(async (city) => {
					return await getDataCityInYear(dataCube, dataSet, city, year).then(
						(items) => {
							items.data.results.bindings.map((item) => {
								let cityName = item.city.value;

								if (cityName === "Bãi Cháy") {
									cityName = "Quảng Ninh";
								} else if (cityName === "Đà Lạt") {
									cityName = "Lâm Đồng";
								} else if (cityName === "Huế") {
									cityName = "Thừa Thiên Huế";
								} else if (cityName === "Nha Trang") {
									cityName = "Khánh Hoà";
								} else if (cityName === "Pleiku") {
									cityName = "Gia Lai";
								} else if (cityName === "Qui Nhơn") {
									cityName = "Bình Định";
								} else if (cityName === "Vinh") {
									cityName = "Nghệ An";
								} else if (cityName === "Vũng Tàu") {
									cityName = "Bà Rịa - Vũng Tàu";
								}

								const cityId = vn.find((item) => {
									return cityName === item.name;
								});

								const id = cityId.id;
								const value = Number(item.value.value).toPrecision();
								const object = [id, value];
								dataMaps.push(object);

								return null;
							});
							return null;
						}
					);
				});
				return Promise.all(requests);
			};
			fetchDataCityInYear(dataCube, dataSet, cities, year)
				.then(() => {
					const capitalizeFirstLetter = (string) => {
						return string.charAt(0).toUpperCase() + string.slice(1);
					};
					const nameTitle = `${capitalizeFirstLetter(dataCube)} in ${year}`;
					action = setTitleMaps(nameTitle);
					dispatch(action);

					const dataClasses = [
						{
							to: 70,
						},
						{ from: 70, to: 75 },
						{ from: 75, to: 80 },
						{ from: 80, to: 85 },
						{ from: 85 },
					];
					action = setColorRange(dataClasses);
					dispatch(action);
					console.log("dataMapsBefore: ", dataMaps);
					action = setMapsData(dataMaps);
					dispatch(action);
				})
				.catch((error) => console.log("error: ", error));
		} else {
			if (dataCube === CLIMATE) {
				if (dataSet === HUMIDITY) {
					const fetchHumidityByYear = async (year) => {
						return await getHumidityByYear(year).then((items) =>
							items.results.bindings.map((item) => {
								let city = item.city.value;
								if (city === "Bãi Cháy") {
									city = "Quảng Ninh";
								} else if (city === "Đà Lạt") {
									city = "Lâm Đồng";
								} else if (city === "Huế") {
									city = "Thừa Thiên Huế";
								} else if (city === "Nha Trang") {
									city = "Khánh Hoà";
								} else if (city === "Pleiku") {
									city = "Gia Lai";
								} else if (city === "Qui Nhơn") {
									city = "Bình Định";
								} else if (city === "Vinh") {
									city = "Nghệ An";
								} else if (city === "Vũng Tàu") {
									city = "Bà Rịa - Vũng Tàu";
								}

								const cityId = vn.find((item) => {
									return city === item.name;
								});
								const id = cityId.id;
								const value = Number(item.value.value).toPrecision();
								const object = [id, value];
								dataMaps.push(object);
								return null;
							})
						);
					};
					fetchHumidityByYear(year)
						.then(() => {
							const nameTitle = `Humidity of VN ${year}`;
							action = setTitleMaps(nameTitle);
							dispatch(action);

							const dataClasses = [
								{
									to: 70,
								},
								{ from: 70, to: 75 },
								{ from: 75, to: 80 },
								{ from: 80, to: 85 },
								{ from: 85 },
							];
							action = setColorRange(dataClasses);
							dispatch(action);

							action = setMapsData(dataMaps);
							dispatch(action);
						})
						.catch((error) => console.log("error: ", error));
				} else if (dataSet === TEMPERATURE) {
					const fetchTemperatureByYear = async (year) => {
						return await getTemperatureByYear(year).then((items) =>
							items.results.bindings.map((item) => {
								let city = item.city.value;
								if (city === "Bãi Cháy") {
									city = "Quảng Ninh";
								} else if (city === "Đà Lạt") {
									city = "Lâm Đồng";
								} else if (city === "Huế") {
									city = "Thừa Thiên Huế";
								} else if (city === "Nha Trang") {
									city = "Khánh Hoà";
								} else if (city === "Pleiku") {
									city = "Gia Lai";
								} else if (city === "Qui Nhơn") {
									city = "Bình Định";
								} else if (city === "Vinh") {
									city = "Nghệ An";
								} else if (city === "Vũng Tàu") {
									city = "Bà Rịa - Vũng Tàu";
								}

								const cityId = vn.find((item) => {
									return city === item.name;
								});
								const id = cityId.id;
								const value = Number(item.value.value).toPrecision();
								const object = [id, value];
								dataMaps.push(object);
								return null;
							})
						);
					};
					fetchTemperatureByYear(year)
						.then(() => {
							const nameTitle = `Temperature of VN ${year}`;
							action = setTitleMaps(nameTitle);
							dispatch(action);

							const dataClasses = [
								{
									to: 18,
								},
								{ from: 18, to: 22 },
								{ from: 22, to: 25 },
								{ from: 25, to: 28 },
								{ from: 28 },
							];
							action = setColorRange(dataClasses);
							dispatch(action);

							action = setMapsData(dataMaps);
							dispatch(action);
						})
						.catch((error) => console.log("error: ", error));
				} else if (dataSet === RAINFALL) {
					const fetchRainfallByYear = async (year) => {
						return await getRainfallByYear(year).then((items) =>
							items.results.bindings.map((item) => {
								let city = item.city.value;
								if (city === "Bãi Cháy") {
									city = "Quảng Ninh";
								} else if (city === "Đà Lạt") {
									city = "Lâm Đồng";
								} else if (city === "Huế") {
									city = "Thừa Thiên Huế";
								} else if (city === "Nha Trang") {
									city = "Khánh Hoà";
								} else if (city === "Pleiku") {
									city = "Gia Lai";
								} else if (city === "Qui Nhơn") {
									city = "Bình Định";
								} else if (city === "Vinh") {
									city = "Nghệ An";
								} else if (city === "Vũng Tàu") {
									city = "Bà Rịa - Vũng Tàu";
								}

								const cityId = vn.find((item) => {
									return city === item.name;
								});
								const id = cityId.id;
								const value = Number(item.value.value).toPrecision();
								const object = [id, value];
								dataMaps.push(object);
								return null;
							})
						);
					};
					fetchRainfallByYear(year)
						.then(() => {
							const nameTitle = `Rainfall of VN ${year}`;
							action = setTitleMaps(nameTitle);
							dispatch(action);

							const dataClasses = [
								{
									to: 1000,
								},
								{ from: 1000, to: 1500 },
								{ from: 1500, to: 2000 },
								{ from: 2000, to: 2800 },
								{ from: 2800 },
							];
							action = setColorRange(dataClasses);
							dispatch(action);

							action = setMapsData(dataMaps);
							dispatch(action);
						})
						.catch((error) => console.log("error: ", error));
				}
			} else if (dataCube === INDUSTRY) {
				if (dataSet === INDUSTRY_PRODUCTION) {
					const fetchIndustryByYear = async (year) => {
						return await getIndustryByYear(year).then((items) =>
							items.results.bindings.map((item) => {
								let city = item.city.value;

								const cityId = vn.find((item) => {
									return city === item.name;
								});
								const id = cityId.id;
								const value = Number(item.value.value).toPrecision();
								const object = [id, value];
								dataMaps.push(object);
								return null;
							})
						);
					};
					fetchIndustryByYear(year)
						.then(() => {
							const nameTitle = `Industry of VN ${year}`;
							action = setTitleMaps(nameTitle);
							dispatch(action);

							const dataClasses = [
								{
									to: 80,
								},
								{ from: 80, to: 100 },
								{ from: 100, to: 110 },
								{ from: 110, to: 120 },
								{ from: 120, to: 130 },
								{ from: 130 },
							];
							action = setColorRange(dataClasses);
							dispatch(action);

							action = setMapsData(dataMaps);
							dispatch(action);
						})
						.catch((error) => console.log("error: ", error));
				}
			} else if (dataCube === FOREST) {
				if (dataSet === AFFORESTATION) {
					const fetchAfforestationByYear = async (year) => {
						return await getAfforestationByYear(year).then((items) =>
							items.results.bindings.map((item) => {
								let city = item.city.value;
								if (city === "Tây Nguyên") {
									city = "Lâm Đồng";
								}

								const cityId = vn.find((item) => {
									return city === item.name;
								});
								const id = cityId.id;
								const value = Number(item.value.value).toPrecision();
								const object = [id, value];
								dataMaps.push(object);
								return null;
							})
						);
					};
					fetchAfforestationByYear(year)
						.then(() => {
							const nameTitle = `Afforestation of VN ${year}`;
							action = setTitleMaps(nameTitle);
							dispatch(action);

							const dataClasses = [
								{
									to: 10,
								},
								{ from: 10, to: 50 },
								{ from: 50, to: 100 },
								{ from: 100, to: 150 },
								{ from: 150, to: 200 },
								{ from: 200 },
							];
							action = setColorRange(dataClasses);
							dispatch(action);

							action = setMapsData(dataMaps);
							dispatch(action);
						})
						.catch((error) => console.log("error: ", error));
				} else if (dataSet === FOREST_COVER_AREA) {
					const fetchForestCoverAreaByYear = async (year) => {
						return await getForestCoverAreaByYear(year).then((items) =>
							items.results.bindings.map((item) => {
								let city = item.city.value;
								if (city === "Tây Nguyên") {
									city = "Lâm Đồng";
								}

								const cityId = vn.find((item) => {
									return city === item.name;
								});
								const id = cityId.id;
								const value = Number(item.value.value).toPrecision();
								const object = [id, value];
								dataMaps.push(object);
								return null;
							})
						);
					};
					fetchForestCoverAreaByYear(year)
						.then(() => {
							const nameTitle = `Forest Cover Area of VN in ${year}`;
							action = setTitleMaps(nameTitle);
							dispatch(action);

							const dataClasses = [
								{
									to: 100,
								},
								{ from: 100, to: 200 },
								{ from: 200, to: 400 },
								{ from: 400, to: 500 },
								{ from: 500, to: 600 },
								{ from: 600 },
							];
							action = setColorRange(dataClasses);
							dispatch(action);

							action = setMapsData(dataMaps);
							dispatch(action);
						})
						.catch((error) => console.log("error: ", error));
				}
			} else if (dataCube === POPULATION) {
				if (dataSet === POPULATION_PRODUCTION) {
					const fetchPopulationByYear = async (year) => {
						return await getPopulationByYear(year).then((items) =>
							items.results.bindings.map((item) => {
								let city = item.city.value;
								if (city === "Tây Nguyên") {
									city = "Lâm Đồng";
								} else if (city === "Đông Nam Bộ") {
									city = "Phú Yên";
								}

								const cityId = vn.find((item) => {
									return city === item.name;
								});
								const id = cityId.id;
								const value = Number(item.value.value).toPrecision();
								const object = [id, value];
								dataMaps.push(object);
								return null;
							})
						);
					};
					fetchPopulationByYear(year)
						.then(() => {
							const nameTitle = `Population of VN ${year} (thousands)`;
							action = setTitleMaps(nameTitle);
							dispatch(action);

							const dataClasses = [
								{
									to: 400,
								},
								{ from: 400, to: 800 },
								{ from: 800, to: 1200 },
								{ from: 1200, to: 1600 },
								{ from: 1600, to: 2000 },
								{ from: 2000 },
							];
							action = setColorRange(dataClasses);
							dispatch(action);

							action = setMapsData(dataMaps);
							dispatch(action);
						})
						.catch((error) => console.log("error: ", error));
				}
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
					<p className={classes.headerTitle}>Maps</p>
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
			<div className={classes.body} draggable={false}>
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
				<Maps />
			</div>
		</div>
	);
};

export default WidgetMaps;
