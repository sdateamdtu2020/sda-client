import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slice/dashboardSlice";

const rootReducer = {
	dashboard: dashboardReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
