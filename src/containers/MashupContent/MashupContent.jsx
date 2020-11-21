import React from "react";
import { useStyles } from "./MashupContent.elements";

import Diagram, { useSchema } from "beautiful-react-diagrams";
import "beautiful-react-diagrams/styles.css";

import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import {
	CLIMATE_HUMIDITY,
	CLIMATE_TEMPERATURE,
	ITEM,
	VIZ_LINECHART,
	VIZ_COLUMNCHART,
	VIZ_MAPS,
	INDUSTRY_PRODUCTION,
} from "../../app/ItemTypes";

import {
	Humidity,
	LineChart,
	ColumnChart,
	Maps,
	Industry,
	Temperature,
} from "../../components/Widgets";

const initialSchema = {
	nodes: [],
};

const MashupContent = () => {
	const classes = useStyles();

	const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);
	const isDropItem = useSelector((state) => state.dashboard.toolbar.isDragItem);

	// dnd from list to container
	const [, dropList] = useDrop({
		accept: ITEM,
		drop: (item, monitor) => {
			addNewNode(monitor.getClientOffset().x, monitor.getClientOffset().y);
			return undefined;
		},
	});

	const getWidget = (id) => {
		switch (id) {
			case CLIMATE_HUMIDITY:
				return Humidity;
			case VIZ_LINECHART:
				return LineChart;
			case VIZ_COLUMNCHART:
				return ColumnChart;
			case VIZ_MAPS:
				return Maps;
			case INDUSTRY_PRODUCTION:
				return Industry;
			case CLIMATE_TEMPERATURE:
				return Temperature;
			default:
				break;
		}
	};

	const deleteNodeFromSchema = (id) => {
		const nodeToRemove = schema.nodes.find((node) => node.id === id);
		removeNode(nodeToRemove);
	};

	const addNewNode = (x, y) => {
		const nextNode = {
			id: `${isDropItem}-${schema.nodes.length + 1}`,
			coordinates: [x - 200, y - 70],
			render: getWidget(isDropItem),
			data: { onClick: deleteNodeFromSchema },
			inputs: [{ id: `port-${Math.random()}` }],
			outputs: [{ id: `port-${Math.random()}` }],
		};

		addNode(nextNode);
	};

	return (
		<div className={classes.mashupContent} ref={dropList}>
			<Diagram schema={schema} onChange={onChange} />
		</div>
	);
};

export default MashupContent;
