import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setNavbarBtnOnClick } from "../../app/slice/dashboardSlice";

import LogoImg from "../../assets/img/logo.png";
import { useStyles } from "./NavbarDashboard.elements";
import { ButtonGroup, Button } from "@material-ui/core";
import { FaPlusCircle, FaQuestionCircle } from "react-icons/fa";

const NavbarDashboard = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const handleButton = (id) => {
		const action = setNavbarBtnOnClick(id);
		dispatch(action);
	};

	return (
		<div className={classes.navbar}>
			<div className={classes.logo}>
				<Link to="/">
					<img className={classes.logoImg} src={LogoImg} alt="logo" />
				</Link>
			</div>
			<div className={classes.groupButton}>
				<ButtonGroup
					variant="contained"
					color="primary"
					aria-label="group-button"
				>
					<Button
						startIcon={<FaPlusCircle />}
						onClick={() => handleButton("new")}
					>
						New
					</Button>
					<Button
						startIcon={<FaQuestionCircle />}
						onClick={() => handleButton("help")}
					>
						Help
					</Button>
					<Button onClick={() => handleButton("example-1")}>Example 1</Button>
					<Button onClick={() => handleButton("example-2")}>Example 2</Button>
					<Button onClick={() => handleButton("example-3")}>Example 3</Button>
				</ButtonGroup>
			</div>
		</div>
	);
};

export default NavbarDashboard;
