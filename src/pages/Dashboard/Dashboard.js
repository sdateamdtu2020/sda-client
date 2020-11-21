import React from "react";
import DashboardContainer from "../../containers/Dashboard";
import { NavbarDashboard } from "../../components";
const Dashboard = () => {
	return (
		<>
			<NavbarDashboard />
			<DashboardContainer />
		</>
	);
};

export default Dashboard;
