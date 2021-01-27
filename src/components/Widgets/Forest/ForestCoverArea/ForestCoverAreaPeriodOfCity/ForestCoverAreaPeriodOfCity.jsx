import React, { useState, useEffect } from "react";

import { useStyles } from "./ForestCoverAreaPeriodOfCity.elements";
import {
	IconButton,
	InputLabel,
	MenuItem,
	FormHelperText,
	FormControl,
	Select,
	Typography,
} from "@material-ui/core";

import { AiFillCloseCircle } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

import { treeForestCoverArea } from "../../../../../data/index";

import {
	setInfoWidget,
	setPeriodOfCityFromYear,
	setPeriodOfCityName,
	setPeriodOfCityToYear,
	setMerge,
	setItemIsSelectCity,
} from "../../../../../app/slice/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import {
	FOREST,
	FOREST_COVER_AREA,
	PERIOD_OF_CITY,
} from "../../../../../app/ItemTypes";

const ForestCoverAreaPeriodOfCity = ({ id, data, inputs, outputs }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const merge = useSelector((state) => state.dashboard.mashupContent.merge);

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

	const [city, setCity] = useState("");
	const [fromYear, setFromYear] = useState("");
	const [toYear, setToYear] = useState("");
	const [warning, setWarning] = useState("");

	const handleCityChange = (event) => {
		setCity(event.target.value);
	};

	const handleFromYearChange = (event) => {
		setFromYear(event.target.value);
	};

	const handleToYearChange = (event) => {
		if (fromYear !== "" && Number(event.target.value) > Number(fromYear)) {
			setToYear(event.target.value);
			setWarning("");
		} else {
			setWarning(`"To Year" field must be large than "From Year" field`);
		}
	};

	useEffect(() => {
		if (city !== "" && fromYear !== "" && toYear !== "" && warning === "") {
			let action;
			action = setPeriodOfCityName(city);
			dispatch(action);
			action = setPeriodOfCityFromYear(fromYear);
			dispatch(action);
			action = setPeriodOfCityToYear(toYear);
			dispatch(action);
			const itemIsSelect = [`${FOREST}-${FOREST_COVER_AREA}-${PERIOD_OF_CITY}`];
			action = setItemIsSelectCity(itemIsSelect);
			dispatch(action);

			const idMerge = `${FOREST}-${FOREST_COVER_AREA}-${city}-${fromYear}-${toYear}`;
			const newMerge = [...merge, idMerge];
			action = setMerge(newMerge);
			dispatch(action);
		}
		// eslint-disable-next-line
	}, [city, fromYear, toYear, warning, dispatch]);

	return (
		<div className={classes.node}>
			<div className={classes.header}>
				<div className={classes.headerLeft} />
				<div className={classes.headerCenter}>
					<p className={classes.headerTitle}>{treeForestCoverArea.name}</p>
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
			<div className={classes.body}>
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
				<div className={classes.title}>
					<Typography variant="subtitle1">Period Of City</Typography>
				</div>
				<FormControl required className={classes.formControl}>
					<InputLabel id="city-label">City</InputLabel>
					<Select
						labelId="city-label"
						id="city"
						value={city}
						onChange={handleCityChange}
						className={classes.selectEmpty}
						MenuProps={{ classes: { paper: classes.menuPaper } }}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						{treeForestCoverArea.city.children.map((item) => (
							<MenuItem key={item.id} value={item.id}>
								{item.name}
							</MenuItem>
						))}
					</Select>
					<FormHelperText>Required</FormHelperText>
				</FormControl>
				<FormControl required className={classes.formControl}>
					<InputLabel id="FromYear-label">From Year</InputLabel>
					<Select
						labelId="FromYear-label"
						id="FromYear"
						value={fromYear}
						onChange={handleFromYearChange}
						className={classes.selectEmpty}
						MenuProps={{ classes: { paper: classes.menuPaper } }}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						{treeForestCoverArea.year.children.map((item) => (
							<MenuItem key={item.id} value={item.id}>
								{item.name}
							</MenuItem>
						))}
					</Select>
					<FormHelperText>Required</FormHelperText>
				</FormControl>
				<FormControl required className={classes.formControl}>
					<InputLabel id="toYear-label">To Year</InputLabel>
					<Select
						labelId="toYear-label"
						id="toYear"
						value={toYear}
						onChange={handleToYearChange}
						className={classes.selectEmpty}
						MenuProps={{ classes: { paper: classes.menuPaper } }}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						{treeForestCoverArea.year.children.map((item) => (
							<MenuItem key={item.id} value={item.id}>
								{item.name}
							</MenuItem>
						))}
					</Select>
					<FormHelperText>Required</FormHelperText>
				</FormControl>
				{warning ? (
					<Typography variant="subtitle2" color="error">
						Warning: {warning}
					</Typography>
				) : null}
			</div>
		</div>
	);
};

export default ForestCoverAreaPeriodOfCity;
