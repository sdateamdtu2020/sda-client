import React, { useEffect } from "react";
import { useStyles } from "./MashupContent.elements";

import Diagram, { useSchema } from "beautiful-react-diagrams";
import "beautiful-react-diagrams/styles.css";

import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
	ITEM,
	CLIMATE,
	HUMIDITY,
	YEAR,
	CITY,
	PERIOD_OF_CITY,
	VISUALIZATION,
	CHART,
	COLUMN,
	LINE,
	MAPS,
	TABLE,
	TEMPERATURE,
	RAINFALL,
	STATISTICS_MERGE,
	OPERATORS,
	LINE_TWO_AXIS,
	LINE_THREE_AXIS,
	INDUSTRY,
	INDUSTRY_PRODUCTION,
	FOREST,
	AFFORESTATION,
	POPULATION,
	POPULATION_PRODUCTION,
	FOREST_COVER_AREA,
} from "../../app/ItemTypes";

import {
	HumidityYear,
	HumidityCity,
	HumidityPeriodOfCity,
	ColumnChart,
	Maps,
	LineChart,
	Table,
	TemperatureCity,
	TemperatureYear,
	TemperaturePeriodOfCity,
	RainfallYear,
	RainfallCity,
	RainfallPeriodOfCity,
	StatisticsMerge,
	LineChartTwoAxis,
	LineChartThreeAxis,
	IndustryProductionYear,
	IndustryProductionCity,
	IndustryProductionPeriodOfCity,
	AfforestationYear,
	AfforestationCity,
	AfforestationPeriodOfCity,
	PopulationYear,
	PopulationCity,
	PopulationPeriodOfCity,
	ForestCoverAreaYear,
	ForestCoverAreaCity,
	ForestCoverAreaPeriodOfCity,
} from "../../components/Widgets";
import {
	removeIdNode,
	setColorRange,
	setColumnCategories,
	setColumnData,
	setColumnTitle,
	setColumnUnit,
	setIdNewNode,
	setItemIsSelectCity,
	setItemIsSelectYear,
	setLineCategories,
	setLineData,
	// setLineThreeAxisCategories,
	// setLineThreeAxisData,
	// setLineThreeAxisTitle,
	// setLineThreeAxisYAxis,
	setLineTitle,
	// setLineTwoAxisCategories,
	// setLineTwoAxisData,
	// setLineTwoAxisTitle,
	// setLineTwoAxisYAxis,
	setLineUnit,
	setMerge,
	// setMergeCategories,
	// setMergeData,
	// setMergeTitle,
	// setMergeYAxis,
	setNavbarNewOnClick,
	setOutput,
	setPeriodOfCityFromYear,
	setPeriodOfCityName,
	setPeriodOfCityToYear,
	setTableData,
	setTableTitle,
	setTableUnit,
} from "../../app/slice/dashboardSlice";

const initialSchema = {
	nodes: [],
};

const MashupContent = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);
	const isDropItem = useSelector((state) => state.dashboard.toolbar.isDragItem);

	const navbarNewOnClick = useSelector(
		(state) => state.dashboard.navbar.newOnClick
	);
	const nodeId = useSelector((state) => state.dashboard.mashupContent.node);

	// dnd from list to container
	const [, dropList] = useDrop({
		accept: ITEM,
		drop: (item, monitor) => {
			addNewNode(monitor.getClientOffset().x, monitor.getClientOffset().y);
			return undefined;
		},
	});

	const getWidget = (id) => {
		const idArray = id.split("-");
		const dataCube = idArray[0];
		const dataSet = idArray[1];
		const filter = idArray[2];

		switch (dataCube) {
			case CLIMATE:
				if (dataSet === HUMIDITY) {
					if (filter === YEAR) {
						return HumidityYear;
					} else if (filter === CITY) {
						return HumidityCity;
					} else if (filter === PERIOD_OF_CITY) {
						return HumidityPeriodOfCity;
					}
				} else if (dataSet === TEMPERATURE) {
					if (filter === YEAR) {
						return TemperatureYear;
					} else if (filter === CITY) {
						return TemperatureCity;
					} else if (filter === PERIOD_OF_CITY) {
						return TemperaturePeriodOfCity;
					}
				} else if (dataSet === RAINFALL) {
					if (filter === YEAR) {
						return RainfallYear;
					} else if (filter === CITY) {
						return RainfallCity;
					} else if (filter === PERIOD_OF_CITY) {
						return RainfallPeriodOfCity;
					}
				}
				break;
			case INDUSTRY:
				if (dataSet === INDUSTRY_PRODUCTION) {
					if (filter === YEAR) {
						return IndustryProductionYear;
					} else if (filter === CITY) {
						return IndustryProductionCity;
					} else if (filter === PERIOD_OF_CITY) {
						return IndustryProductionPeriodOfCity;
					}
				}
				break;
			case FOREST:
				if (dataSet === AFFORESTATION) {
					if (filter === YEAR) {
						return AfforestationYear;
					} else if (filter === CITY) {
						return AfforestationCity;
					} else if (filter === PERIOD_OF_CITY) {
						return AfforestationPeriodOfCity;
					}
				} else if (dataSet === FOREST_COVER_AREA) {
					if (filter === YEAR) {
						return ForestCoverAreaYear;
					} else if (filter === CITY) {
						return ForestCoverAreaCity;
					} else if (filter === PERIOD_OF_CITY) {
						return ForestCoverAreaPeriodOfCity;
					}
				}
				break;
			case POPULATION:
				if (dataSet === POPULATION_PRODUCTION) {
					if (filter === YEAR) {
						return PopulationYear;
					} else if (filter === CITY) {
						return PopulationCity;
					} else if (filter === PERIOD_OF_CITY) {
						return PopulationPeriodOfCity;
					}
				}
				break;
			case OPERATORS:
				if (dataSet === STATISTICS_MERGE) {
					return StatisticsMerge;
				}
				break;
			case VISUALIZATION:
				if (dataSet === CHART) {
					if (filter === COLUMN) {
						return ColumnChart;
					} else if (filter === LINE) {
						return LineChart;
					} else if (filter === LINE_TWO_AXIS) {
						return LineChartTwoAxis;
					} else if (filter === LINE_THREE_AXIS) {
						return LineChartThreeAxis;
					}
				} else if (dataSet === MAPS) {
					return Maps;
				} else if (dataSet === TABLE) {
					return Table;
				}
				break;
			default:
				break;
		}
	};

	const deleteNodeFromSchema = (id) => {
		const nodeToRemove = schema.nodes.find((node) => node.id === id);
		removeNode(nodeToRemove);
	};

	const addNewNode = (x, y) => {
		const id = `${isDropItem}-${schema.nodes.length + 1}`;
		const nextNode = {
			id: id,
			coordinates: [x - 200, y - 70],
			render: getWidget(isDropItem),
			data: { onClick: deleteNodeFromSchema },
			inputs: [{ id: `portOut-${isDropItem}` }],
			outputs: [{ id: `port-${isDropItem}` }],
		};
		const action = setIdNewNode(id);
		dispatch(action);

		addNode(nextNode);
	};

	useEffect(() => {
		if (navbarNewOnClick === true) {
			nodeId.map((id) => deleteNodeFromSchema(id));

			let action = setNavbarNewOnClick(false);
			dispatch(action);
			action = removeIdNode();
			dispatch(action);
			action = setOutput("clear");
			dispatch(action);
			action = setMerge([]);
			dispatch(action);
			action = setItemIsSelectYear([]);
			dispatch(action);
			action = setItemIsSelectCity([]);
			dispatch(action);
			action = setPeriodOfCityName("");
			dispatch(action);
			action = setPeriodOfCityFromYear("");
			dispatch(action);
			action = setPeriodOfCityToYear("");
			dispatch(action);
			action = setColorRange([]);
			dispatch(action);
			action = setColumnCategories([]);
			dispatch(action);
			action = setLineCategories([]);
			dispatch(action);
			action = setColumnData([]);
			dispatch(action);
			action = setTableData([]);
			dispatch(action);
			action = setLineData([]);
			dispatch(action);
			action = setColumnTitle("");
			dispatch(action);
			action = setLineTitle("");
			dispatch(action);
			action = setTableTitle("");
			dispatch(action);
			action = setColumnUnit("");
			dispatch(action);
			action = setLineUnit("");
			dispatch(action);
			action = setTableUnit("");
			dispatch(action);
			// action = setMergeCategories([]);
			// dispatch(action);
			// action = setMergeData([]);
			// dispatch(action);
			// action = setMergeTitle("");
			// dispatch(action);
			// action = setMergeYAxis([]);
			// dispatch(action);
			// action = setLineTwoAxisTitle("");
			// dispatch(action);
			// action = setLineTwoAxisYAxis([]);
			// dispatch(action);
			// action = setLineTwoAxisData([]);
			// dispatch(action);
			// action = setLineTwoAxisCategories([]);
			// dispatch(action);
			// action = setLineThreeAxisTitle("");
			// dispatch(action);
			// action = setLineThreeAxisYAxis([]);
			// dispatch(action);
			// action = setLineThreeAxisData([]);
			// dispatch(action);
			// action = setLineThreeAxisCategories([]);
			dispatch(action);
		}
		// eslint-disable-next-line
	}, [navbarNewOnClick]);

	return (
		<div className={classes.mashupContent} ref={dropList}>
			<Diagram schema={schema} onChange={onChange} />
		</div>
	);
};

export default MashupContent;
