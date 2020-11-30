import axios from "axios";

const url = `http://server.sda-research.ml:9876`;

// - /climate/humidity/city/:cityid;
// - /climate/humidity/year/:yearid;
// - /climate/humidity/city/:cityid/year/yearid;

// - /climate/rainfall/city/:cityid;
// - /climate/rainfall/year/:yearid;
// - /climate/rainfall/city/:cityid/year/yearid;

// - /climate/temperature/city/:cityid;
// - /climate/temperature/year/:yearid;
// - /climate/temperature/city/:cityid/year/yearid;

// - /industry/city/:cityid;
// - /industry/year/:yearid;
// - /industry/city/:cityid/year/yearid;

export const getHumidityByYear = async (year) => {
	try {
		const { data } = await axios.get(`${url}/climate/humidity/year/${year}`);
		console.log("data: ", data);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getIndustryByYear = async (year) => {
	try {
		const { data } = await axios.get(`${url}/industry/year/${year}`);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getTemperatureByYear = async (year) => {
	try {
		const { data } = await axios.get(`${url}/climate/temperature/year/${year}`);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getRainfallByYear = async (year) => {
	try {
		const { data } = await axios.get(`${url}/climate/rainfall/year/${year}`);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getHumidityByCity = async (city) => {
	try {
		const { data } = await axios.get(`${url}/climate/humidity/city/${city}`);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getTemperatureByCity = async (city) => {
	try {
		const { data } = await axios.get(`${url}/climate/temperature/city/${city}`);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getRainfallByCity = async (city) => {
	try {
		const { data } = await axios.get(`${url}/climate/rainfall/city/${city}`);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getIndustryByCity = async (city) => {
	try {
		const { data } = await axios.get(`${url}/industry/city/${city}`);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};
