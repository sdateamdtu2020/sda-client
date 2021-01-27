import React from "react";

import { useStyles } from "./IndustryProduction.elements";
import { IconButton } from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";

import { AiFillCloseCircle } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";
import { MdExpandLess, MdExpandMore, MdExitToApp } from "react-icons/md";

import { treeIndustryProduction } from "../../../../../data/index";

import {
	setItemIsSelect,
	setInfoWidget,
	setItemIsSelectYear,
} from "../../../../../app/slice/dashboardSlice";
import { useDispatch } from "react-redux";

const IndustryProductionYear = ({ id, data, inputs, outputs }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [expanded, setExpanded] = React.useState([]);
	const [selected, setSelected] = React.useState([]);

	const handleToggle = (event, nodeIds) => {
		setExpanded(nodeIds);
	};

	const handleSelect = (event, nodeIds) => {
		setSelected(nodeIds);
		let action = setItemIsSelect(nodeIds);
		dispatch(action);
		action = setItemIsSelectYear(nodeIds);
		dispatch(action);
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
					<p className={classes.headerTitle}>{treeIndustryProduction.name}</p>
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
					<TreeItem
						nodeId={`${treeIndustryProduction.id}-${treeIndustryProduction.year.id}`}
						label={treeIndustryProduction.year.name}
					>
						{treeIndustryProduction.year.children.map((item) => (
							<TreeItem
								nodeId={`${treeIndustryProduction.id}-${treeIndustryProduction.year.id}-${item.id}`}
								label={item.name}
								key={item.id}
							/>
						))}
					</TreeItem>
				</TreeView>
			</div>
		</div>
	);
};

export default IndustryProductionYear;
