import axios from "axios";
import { FOREST_COVER_AREA } from "../app/ItemTypes";

const url = `http://server.sda-research.ml`;

// - /climate/humidity/city/:cityid;
// - /climate/humidity/year/:yearid;
// - /climate/humidity/city/:cityid/year/yearid;
// - /climate/humidity/city/danang/year/2018

// - /climate/rainfall/city/:cityid;
// - /climate/rainfall/year/:yearid;
// - /climate/rainfall/city/:cityid/year/yearid;

// - /climate/temperature/city/:cityid;
// - /climate/temperature/year/:yearid;
// - /climate/temperature/city/:cityid/year/yearid;

// - /industry/city/:cityid;
// - /industry/year/:yearid;
// - /industry/city/:cityid/year/yearid;

// - /forest/afforestation/city/:cityid;
// - /forest/afforestation/year/:yearid;
// - /forest/afforestation/city/:cityid/year/:yearid;

// - /forest/forestcover/city/:cityid;
// - /forest/forestcover/year/:yearid;
// - /forest/forestcover/city/:cityid/year/:yearid;

// - /population/population/city/:cityid;
// - /population/population/year/:yearid;
// - /population/population/city/:cityid/year/:yearid;

// - /merge/dc1/:dc1/dc2/:dc2/s1/:s1/s2/:s2/city/:cityId/fYear/:fYear/tYear/:tYear

//   - /merge/dc1/dcclimate/dc2/dcclimate/s1/rainfall/s2/temperature/city/danang/fyear/2012/tyear/2018

// - /merge/dc1/:dc1/dc2/:dc2/dc3/:dc3/s1/:s1/s2/:s2/s3:/s3/city/:cityId/fYear/:fYear/tYear/:tYear
//   - /merge/dc1/dcclimate/dc2/dcindustry/dc3/dcforest/s1/rainfall/s2/industry/s3/forestcover/city/danang/fyear/2012/tyear/2018

export const getDataCityInYear = async (dataCube, dataSet, city, year) => {
	if (dataSet === FOREST_COVER_AREA) {
		dataSet = "forestcover";
	}
	console.log("url", `${url}/${dataCube}/${dataSet}/city/${city}/year/${year}`);
	try {
		const data = axios.get(
			`${url}/${dataCube}/${dataSet}/city/${city}/year/${year}`
		);
		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getDataMergeThreeWidgetPeriodOfCity = async (
	dataCube1,
	dataSet1,
	dataCube2,
	dataSet2,
	dataCube3,
	dataSet3,
	city,
	fYear,
	tYear
) => {
	if (dataSet1 === FOREST_COVER_AREA) {
		dataSet1 = "forestcover";
	}
	if (dataSet2 === FOREST_COVER_AREA) {
		dataSet2 = "forestcover";
	}
	if (dataSet3 === FOREST_COVER_AREA) {
		dataSet3 = "forestcover";
	}
	try {
		console.log(
			"url",
			`${url}/merge/dc1/dc${dataCube1}/dc2/dc${dataCube2}/dc3/dc${dataCube3}/s1/${dataSet1}/s2/${dataSet2}/s3/${dataSet3}/city/${city}/fyear/${fYear}/tyear/${tYear}`
		);
		const { data } = await axios.get(
			`${url}/merge/dc1/dc${dataCube1}/dc2/dc${dataCube2}/dc3/dc${dataCube3}/s1/${dataSet1}/s2/${dataSet2}/s3/${dataSet3}/city/${city}/fyear/${fYear}/tyear/${tYear}`
		);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getDataMergeTwoWidgetPeriodOfCity = async (
	dataCube1,
	dataSet1,
	dataCube2,
	dataSet2,
	city,
	fYear,
	tYear
) => {
	try {
		if (dataSet1 === FOREST_COVER_AREA) {
			dataSet1 = "forestcover";
		}
		if (dataSet2 === FOREST_COVER_AREA) {
			dataSet2 = "forestcover";
		}

		console.log(
			"url",
			`${url}/merge/dc1/dc${dataCube1}/dc2/dc${dataCube2}/s1/${dataSet1}/s2/${dataSet2}/city/${city}/fyear/${fYear}/tyear/${tYear}`
		);
		const { data } = await axios.get(
			`${url}/merge/dc1/dc${dataCube1}/dc2/dc${dataCube2}/s1/${dataSet1}/s2/${dataSet2}/city/${city}/fyear/${fYear}/tyear/${tYear}`
		);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getIndustryByPeriodOfCity = async (city, fYear, tYear) => {
	try {
		console.log(
			"url",
			`${url}/industry/industry/city/${city}/fYear/${fYear}/tYear/${tYear}`
		);
		const { data } = await axios.get(
			`${url}/industry/industry/city/${city}/fYear/${fYear}/tYear/${tYear}`
		);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getRainfallByPeriodOfCity = async (city, fYear, tYear) => {
	try {
		console.log(
			"url",
			`${url}/climate/rainfall/city/${city}/fYear/${fYear}/tYear/${tYear}`
		);
		const { data } = await axios.get(
			`${url}/climate/rainfall/city/${city}/fYear/${fYear}/tYear/${tYear}`
		);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getTemperatureByPeriodOfCity = async (city, fYear, tYear) => {
	try {
		const { data } = await axios.get(
			`${url}/climate/temperature/city/${city}/fYear/${fYear}/tYear/${tYear}`
		);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getHumidityByPeriodOfCity = async (city, fYear, tYear) => {
	try {
		const { data } = await axios.get(
			`${url}/climate/humidity/city/${city}/fYear/${fYear}/tYear/${tYear}`
		);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getAfforestationByPeriodOfCity = async (city, fYear, tYear) => {
	try {
		const { data } = await axios.get(
			`${url}/forest/afforestation/city/${city}/fYear/${fYear}/tYear/${tYear}`
		);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getForestCoverAreaByPeriodOfCity = async (city, fYear, tYear) => {
	try {
		const { data } = await axios.get(
			`${url}/forest/forestcover/city/${city}/fYear/${fYear}/tYear/${tYear}`
		);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getPopulationByPeriodOfCity = async (city, fYear, tYear) => {
	try {
		const { data } = await axios.get(
			`${url}/population/population/city/${city}/fYear/${fYear}/tYear/${tYear}`
		);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getHumidityByYear = async (year) => {
	try {
		const { data } = await axios.get(`${url}/climate/humidity/year/${year}`);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getIndustryByYear = async (year) => {
	try {
		const { data } = await axios.get(`${url}/industry/industry/year/${year}`);

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

export const getAfforestationByYear = async (year) => {
	try {
		console.log("url", `${url}/forest/afforestation/year/${year}`);
		const { data } = await axios.get(
			`${url}/forest/afforestation/year/${year}`
		);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getForestCoverAreaByYear = async (year) => {
	console.log("url", `${url}/forest/forestcover/year/${year}`);
	try {
		const { data } = await axios.get(`${url}/forest/forestcover/year/${year}`);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getPopulationByYear = async (year) => {
	try {
		const { data } = await axios.get(
			`${url}/population/population/year/${year}`
		);

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
		const { data } = await axios.get(`${url}/industry/industry/city/${city}`);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getAfforestationByCity = async (city) => {
	try {
		const { data } = await axios.get(
			`${url}/forest/afforestation/city/${city}`
		);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getForestCoverAreaByCity = async (city) => {
	try {
		const { data } = await axios.get(`${url}/forest/forestcover/city/${city}`);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};

export const getPopulationByCity = async (city) => {
	try {
		const { data } = await axios.get(
			`${url}/population/population/city/${city}`
		);

		return data;
	} catch (error) {
		console.log("error: ", error);
	}
};
