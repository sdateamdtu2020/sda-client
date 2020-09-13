import React from "react";
import { InfoSection } from "../../components";
import { homeObjOne, mentor1, mentor2, hoa, tins, dong, kieu } from "./Data";
const About = () => {
	return (
		<>
			<InfoSection {...homeObjOne} />
			<InfoSection {...mentor1} />
			<InfoSection {...mentor2} />

			<InfoSection {...hoa} />
			<InfoSection {...tins} />
			<InfoSection {...dong} />
			<InfoSection {...kieu} />
		</>
	);
};

export default About;
