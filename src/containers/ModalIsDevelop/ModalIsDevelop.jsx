import React from "react";
import { useStyles } from "./ModalIsDevelop.elements";
import { IconButton, Button, Typography } from "@material-ui/core";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModal } from "../../app/slice/dashboardSlice";
import { ModalComponent } from "../../components";

const ModalIsDevelop = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const handleOnClose = () => {
		const action = setModal("isDevelop");
		dispatch(action);
	};

	return (
		<ModalComponent id="isDevelop">
			<div className={classes.paper}>
				<IconButton
					aria-label="delete"
					size="medium"
					color="inherit"
					onClick={handleOnClose}
					className={classes.closeBtn}
				>
					<AiFillCloseCircle />
				</IconButton>
				<Typography variant="h5" gutterBottom>
					This feature is developing...
				</Typography>
				<Typography variant="subtitle1" gutterBottom>
					Maybe it doesn't work on your device.
				</Typography>
				<Typography variant="subtitle1" gutterBottom>
					Contact with us if you have any question.
				</Typography>
				<Link to="/contact" className={classes.link}>
					<Button
						size="small"
						variant="contained"
						color="primary"
						className={classes.button}
					>
						Contact us
					</Button>
				</Link>
			</div>
		</ModalComponent>
	);
};

export default ModalIsDevelop;
