import axios from "axios";

const urlCaMau = "http://localhost:5000/results";
const urlHaNoi = "http://localhost:5001/results";

export const getHumidityData = async () => {
	try {
		const { data } = await axios.get(`${urlCaMau}`);
		return data;
	} catch (error) {
		console.log("error", error);
	}
};

export const getHumidityDataHanoi = async () => {
	try {
		const { data } = await axios.get(`${urlHaNoi}`);
		return data;
	} catch (error) {
		console.log("error", error);
	}
};
