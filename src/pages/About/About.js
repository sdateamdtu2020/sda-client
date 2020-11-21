import React from "react";
import { InfoSection, Navbar, Footer } from "../../components";
import { homeObjOne, mentor1, mentor2, hoa, tins, dong, kieu } from "./Data";
const About = () => {
	return (
		<>
			<Navbar />
			<InfoSection {...homeObjOne} />
			<InfoSection {...mentor1} />
			<InfoSection {...mentor2} />

			<InfoSection {...hoa} />
			<InfoSection {...tins} />
			<InfoSection {...dong} />
			<InfoSection {...kieu} />

			<Footer />
		</>
	);
};

export default About;
