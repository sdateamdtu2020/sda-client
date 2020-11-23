import React from "react";
import Modal from "@material-ui/core/Modal";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../app/slice/dashboardSlice";
import { useStyles } from "./Modal.elements";

const ModalComponent = ({ children, id }) => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const isOpen = useSelector((state) => state.dashboard.modal[id]);

	const handleClose = () => {
		const action = setModal(id);
		dispatch(action);
	};

	return (
		<Modal
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			className={classes.modal}
		>
			{children}
		</Modal>
	);
};

export default ModalComponent;
