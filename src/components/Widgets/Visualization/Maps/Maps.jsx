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
	setPortCanLinked,
	setPortIsLinked,
	setTitleMaps,
} from "../../../../app/slice/dashboardSlice";
import {
	CLIMATE_HUMIDITY,
	CLIMATE_RAINFALL,
	CLIMATE_TEMPERATURE,
	INDUSTRY_PRODUCTION,
} from "../../../../app/ItemTypes";
import {
	getHumidityByYear,
	getIndustryByYear,
	getRainfallByYear,
	getTemperatureByYear,
} from "../../../../api";
import { vn } from "../../../../api/vnId";

const WidgetMaps = ({ id, data, inputs, outputs }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const itemIsSelect = useSelector(
		(state) => state.dashboard.mashupContent.itemIsSelect
	);
	const port = useSelector((state) => state.dashboard.mashupContent.port);

	const handleOnClick = () => {
		console.log("itemIsSelect", itemIsSelect);
		let action;
		const portWidget = itemIsSelect[0].split("-")[0];
		const portViz = id.split("-")[0];
		const portLinked = [`port-${portWidget}`, `port-${portViz}`];
		if (portLinked !== port) {
			action = setPortIsLinked(portLinked);
			dispatch(action);
			action = setPortCanLinked(true);
			dispatch(action);
		}

		const dataMaps = [];
		if (itemIsSelect[0].split("-")[0] === CLIMATE_HUMIDITY) {
			if (itemIsSelect[0].split("-")[1] === "year") {
				const year = itemIsSelect[0].split("-")[2];
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

				const fetchAPI = async () => {
					Promise.all([await getHumidityByYear(year)]).then((values) => {
						values[0].results.bindings.map((item) => {
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
						});
						action = setMapsData(dataMaps);
						dispatch(action);
					});
				};
				fetchAPI();
			}
		} else if (itemIsSelect[0].split("-")[0] === INDUSTRY_PRODUCTION) {
			if (itemIsSelect[0].split("-")[1] === "year") {
				const year = itemIsSelect[0].split("-")[2];
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

				const fetchAPI = async () => {
					Promise.all([await getIndustryByYear(year)])
						.then((values) => {
							values[0].results.bindings.map((item) => {
								let city = item.city.value;
								const cityId = vn.find((item) => {
									return city === item.name;
								});
								const id = cityId.id;
								const value = Number(item.value.value).toPrecision();
								const object = [id, value];
								dataMaps.push(object);
								return null;
							});
							action = setMapsData(dataMaps);
							dispatch(action);
						})
						.catch((error) => console.log("error: ", error));
				};
				fetchAPI();
			}
		} else if (itemIsSelect[0].split("-")[0] === CLIMATE_TEMPERATURE) {
			if (itemIsSelect[0].split("-")[1] === "year") {
				const year = itemIsSelect[0].split("-")[2];
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

				const fetchAPI = async () => {
					Promise.all([await getTemperatureByYear(year)])
						.then((values) => {
							values[0].results.bindings.map((item) => {
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
							});

							action = setMapsData(dataMaps);
							dispatch(action);
						})
						.catch((error) => console.log("error: ", error));
				};
				fetchAPI();
			}
		} else if (itemIsSelect[0].split("-")[0] === CLIMATE_RAINFALL) {
			if (itemIsSelect[0].split("-")[1] === "year") {
				const year = itemIsSelect[0].split("-")[2];
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

				const fetchAPI = async () => {
					Promise.all([await getRainfallByYear(year)])
						.then((values) => {
							values[0].results.bindings.map((item) => {
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
							});
							action = setMapsData(dataMaps);
							dispatch(action);
						})
						.catch((error) => console.log("error: ", error));
				};
				fetchAPI();
			}
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
