import React from "react";

import { useStyles } from "./Dashboard.elements";

import { Toolbar } from "../components";
import MashupContent from "./MashupContent/MashupContent";
import Info from "./Info/Info";
// import { useSelector, useDispatch } from "react-redux";

import { listItems } from "../data";
// import { setModal } from "../app/slice/dashboardSlice";
// import ModalIsDevelop from "./ModalIsDevelop/ModalIsDevelop";

const DashboardContainer = () => {
	const classes = useStyles();
	// const dispatch = useDispatch();

	// const isDevelop = useSelector((state) => state.dashboard.modal.isDevelop);

	// useEffect(() => {
	// 	const action = setModal("isDevelop");
	// 	dispatch(action);
	// }, [dispatch]);

	return (
		<div className={classes.dashboard}>
			{/* {isDevelop ? <ModalIsDevelop /> : null} */}

			<Toolbar listItems={listItems} />
			<MashupContent />
			<Info />
		</div>
	);
};

export default DashboardContainer;
