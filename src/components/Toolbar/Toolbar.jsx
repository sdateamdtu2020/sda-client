import React from "react";

import { useStyles } from "./Toolbar.elements";

import {
	ListSubheader,
	List,
	ListItem,
	ListItemText,
	Collapse,
} from "@material-ui/core";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import {
	setToolbarIsOpen,
	setToolbarChildrenIsOpen,
} from "../../app/slice/dashboardSlice";

import ListItemComponent from "./ListItem/ListItem";

const Toolbar = ({ listItems }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const isOpen = useSelector((state) => state.dashboard.toolbar.isOpen);

	const handleClick = (object) => {
		console.log("object: ", object);
		const action = setToolbarIsOpen(object);
		dispatch(action);
	};

	const handleClickChildren = (object) => {
		const action = setToolbarChildrenIsOpen(object);
		dispatch(action);
	};

	return (
		<div className={classes.toolbar}>
			<List
				component="nav"
				aria-labelledby="nested-list"
				subheader={
					<ListSubheader
						className={classes.subHeader}
						component="div"
						id="nested-list-subheader"
					>
						Widgets
					</ListSubheader>
				}
			>
				{listItems.map((items, indexItems) => (
					<div key={items.id}>
						<ListItem
							className={`${classes.listItem} ${
								isOpen[items.id].isOpen ? classes.isOpen : null
							}`}
							button
							onClick={() => handleClick(items.id)}
						>
							<ListItemText primary={items.name} />
							{isOpen[items.id].isOpen ? <MdExpandLess /> : <MdExpandMore />}
						</ListItem>
						<Collapse
							className={classes.collapse}
							in={isOpen[items.id].isOpen}
							timeout="auto"
							unmountOnExit
						>
							<List component="div" disablePadding>
								{items.collapseItem.map((item, indexItem) => {
									return item.children === undefined ? (
										<ListItemComponent
											key={item.id}
											primary={item.name}
											id={`${items.id}-${item.id}`}
											indexItems={indexItems}
											indexItem={indexItem}
											indexChildren="0"
											disabled={item.disabled}
										/>
									) : (
										<div key={item.id}>
											<ListItem
												className={`${classes.listItem}`}
												button
												onClick={() =>
													handleClickChildren(`${items.id}-${item.id}`)
												}
											>
												<ListItemText primary={item.name} />
												{isOpen[items.id].children[item.id] ? (
													<MdExpandLess />
												) : (
													<MdExpandMore />
												)}
											</ListItem>
											<Collapse
												className={classes.collapse}
												in={isOpen[items.id].children[item.id]}
												timeout="auto"
												unmountOnExit
											>
												<List component="div" disablePadding>
													{item.children.map((children, indexChildren) => (
														<ListItemComponent
															key={`${item.id}-${children.id}`}
															primary={children.name}
															indexItems={indexItems}
															indexItem={indexItem}
															indexChildren={indexChildren}
															disabled={children.disabled}
															id={`${items.id}-${item.id}-${children.id}`}
														/>
													))}
												</List>
											</Collapse>
										</div>
									);
								})}
							</List>
						</Collapse>
					</div>
				))}
			</List>
		</div>
	);
};

export default Toolbar;
