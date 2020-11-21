import React from "react";
import { useStyles } from "./Info.elements";
import {
	ListSubheader,
	List,
	ListItem,
	ListItemText,
	Collapse,
} from "@material-ui/core";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

import { setInfoIsOpen } from "../../app/slice/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { PROPERTIES, OUTPUT_LOG, WIDGET_INFOS } from "../../app/ItemTypes";
import { Properties, OutputLog, WidgetInfo } from "../../components";

const Info = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const isOpen = useSelector((state) => state.dashboard.info.isOpen);

	const handleClick = (object) => {
		const action = setInfoIsOpen(object);
		dispatch(action);
	};
	return (
		<div className={classes.info}>
			<List
				component="nav"
				aria-labelledby="nested-list"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Information
					</ListSubheader>
				}
			>
				<ListItem
					className={`${classes.listItem} ${
						isOpen[PROPERTIES] ? classes.isOpen : null
					}`}
					button
					onClick={() => handleClick(PROPERTIES)}
				>
					<ListItemText primary="Properties" />
					{isOpen[PROPERTIES] ? <MdExpandLess /> : <MdExpandMore />}
				</ListItem>
				<Collapse
					className={classes.collapse}
					in={isOpen[PROPERTIES]}
					timeout="auto"
					unmountOnExit
				>
					<Properties />
				</Collapse>

				<ListItem
					className={`${classes.listItem} ${
						isOpen[WIDGET_INFOS] ? classes.isOpen : null
					}`}
					button
					onClick={() => handleClick(WIDGET_INFOS)}
				>
					<ListItemText primary="Widget Infos" />
					{isOpen[WIDGET_INFOS] ? <MdExpandLess /> : <MdExpandMore />}
				</ListItem>
				<Collapse
					className={classes.collapse}
					in={isOpen[WIDGET_INFOS]}
					timeout="auto"
					unmountOnExit
				>
					<WidgetInfo />
				</Collapse>

				<ListItem
					className={`${classes.listItem} ${
						isOpen[OUTPUT_LOG] ? classes.isOpen : null
					}`}
					button
					onClick={() => handleClick(OUTPUT_LOG)}
				>
					<ListItemText primary="Output Log" />
					{isOpen[OUTPUT_LOG] ? <MdExpandLess /> : <MdExpandMore />}
				</ListItem>
				<Collapse
					className={classes.collapse}
					in={isOpen[OUTPUT_LOG]}
					timeout="auto"
					unmountOnExit
				>
					<OutputLog />
				</Collapse>
			</List>
		</div>
	);
};

export default Info;
