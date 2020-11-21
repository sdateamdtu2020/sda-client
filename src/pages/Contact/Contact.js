import React from "react";
import { InfoSection, Navbar, Footer } from "../../components";
import { homeObjOne, homeObjTwo } from "./Data";
const Contact = () => {
	return (
		<>
			<Navbar />
			<InfoSection {...homeObjOne} />
			<InfoSection {...homeObjTwo} />
			<Footer />
		</>
	);
};

export default Contact;
