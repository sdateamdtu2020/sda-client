import React from "react";

import { useStyles } from "./ListItem.elements";
import { ListItem, ListItemText } from "@material-ui/core";

import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { ITEM } from "../../../app/ItemTypes";
import {
	setIsDragItem,
	setInfoWidget,
	setIndexItems,
	setIndexItem,
	setIndexChildren,
} from "../../../app/slice/dashboardSlice";

const ListItemComponent = ({
	id,
	primary,
	indexItems,
	indexItem,
	indexChildren,
	disabled,
}) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [, drag] = useDrag({
		item: { id, type: ITEM },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
		begin: () => {
			dragging(id, indexItems, indexItem, indexChildren);
		},
		end: () => {
			isDrop(id);
		},
	});

	const dragging = (id, indexItems, indexItem, indexChildren) => {
		let action = setIsDragItem(id);
		dispatch(action);
		action = setIndexItems(indexItems);
		dispatch(action);
		action = setIndexItem(indexItem);
		dispatch(action);
		action = setIndexChildren(indexChildren);
		dispatch(action);
		console.log("id: ", id);
		action = setInfoWidget(id);
		dispatch(action);
	};

	const isDrop = (id) => {
		let action = setIsDragItem("");
		dispatch(action);
		action = setIndexItems("");
		dispatch(action);
		action = setIndexItem("");
		dispatch(action);
		action = setIndexChildren("");
		dispatch(action);
	};

	return (
		<ListItem
			className={classes.listItem}
			button
			id={id}
			ref={drag}
			disabled={disabled ? true : false}
		>
			<ListItemText primary={primary} />
		</ListItem>
	);
};

export default ListItemComponent;
