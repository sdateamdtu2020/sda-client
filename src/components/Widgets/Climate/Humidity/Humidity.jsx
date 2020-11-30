import React from "react";

import { useStyles } from "./Humidity.elements";
import { IconButton } from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";

import { AiFillCloseCircle } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdExpandLess, MdExpandMore, MdExitToApp } from "react-icons/md";

import { treeHumidity } from "../../../../data";

import {
	setItemIsSelect,
	setInfoWidget,
} from "../../../../app/slice/dashboardSlice";
import { useDispatch } from "react-redux";

const Humidity = ({ id, data, inputs, outputs }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [expanded, setExpanded] = React.useState([]);
	const [selected, setSelected] = React.useState([]);

	const handleToggle = (event, nodeIds) => {
		setExpanded(nodeIds);
	};

	const handleSelect = (event, nodeIds) => {
		setSelected(nodeIds);
		const action = setItemIsSelect(nodeIds);
		dispatch(action);
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
					<p className={classes.headerTitle}>{treeHumidity.name}</p>
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
				<TreeView
					className={classes.treeView}
					defaultCollapseIcon={<MdExpandLess />}
					defaultExpandIcon={<MdExpandMore />}
					defaultEndIcon={<MdExitToApp />}
					expanded={expanded}
					selected={selected}
					onNodeToggle={handleToggle}
					onNodeSelect={handleSelect}
					multiSelect
				>
					{treeHumidity.data.map((item) => (
						<TreeItem
							nodeId={`${treeHumidity.id}-${item.id}`}
							label={item.name}
							key={item.id}
						>
							{item.children.map((children) => (
								<TreeItem
									nodeId={`${treeHumidity.id}-${item.id}-${children.id}`}
									label={children.name}
									key={children.id}
								/>
							))}
						</TreeItem>
					))}
				</TreeView>
			</div>
			<div className={classes.footer}>
				<p> Tip: Control-Click to select multiple provinces</p>
			</div>
		</div>
	);
};

export default Humidity;
