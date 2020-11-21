import React from "react";
import { InfoSection, Navbar, Footer } from "../../components";
import { homeObjOne, homeObjTwo, homeObjThree } from "./Data";

const Home = () => {
	return (
		<>
			<Navbar />
			<InfoSection {...homeObjOne} />
			<InfoSection {...homeObjTwo} />
			<InfoSection {...homeObjThree} />
			<Footer />
		</>
	);
};

export default Home;
