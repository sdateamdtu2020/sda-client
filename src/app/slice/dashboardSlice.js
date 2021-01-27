import { createSlice } from "@reduxjs/toolkit";
import { DASHBOARD } from "../ItemTypes";

const dashboard = createSlice({
	name: DASHBOARD,
	initialState: {
		navbar: {
			newOnClick: false,
			helpOnClick: false,
			example1OnClick: false,
			example2OnClick: false,
			example3OnClick: false,
			spinner: false,
		},
		toolbar: {
			isOpen: {
				climate: {
					isOpen: false,
					children: {
						temperature: false,
						humidity: false,
						rainfall: false,
					},
				},
				atmosphere: {
					isOpen: false,
				},
				population: {
					isOpen: false,
					children: {
						population: false,
					},
				},
				industry: {
					isOpen: false,
					children: {
						production: false,
					},
				},
				forest: {
					isOpen: false,
					children: {
						afforestation: false,
						forestCoverArea: false,
					},
				},
				operators: {
					isOpen: false,
				},
				visualization: {
					isOpen: true,
					children: {
						chart: true,
					},
				},
			},
			isDragItem: "",
			item: {
				indexItems: "",
				indexItem: "",
				indexChildren: "",
			},
		},
		mashupContent: {
			itemIsSelectYear: [],
			itemIsSelectCity: [],
			itemIsSelect: [],
			port: [],
			portCanLinked: false,
			node: [],
			periodOfCity: {
				city: "",
				fromYear: "",
				toYear: "",
			},
			merge: [],
		},
		info: {
			isOpen: {
				properties: false,
				widgetInfos: true,
				outputLog: true,
			},
			widget: "",
			output: [],
		},
		viz: {
			maps: {
				title: "",
				data: [],
				dataClasses: [
					{
						to: 80,
					},
					{ from: 80, to: 100 },
					{ from: 100, to: 110 },
					{ from: 110, to: 120 },
					{ from: 120, to: 130 },
					{ from: 130 },
				],
			},
			column: {
				title: "",
				categories: [],
				data: [],
				unit: "",
			},
			line: {
				title: "",
				categories: [],
				data: [],
				unit: "",
			},
			lineTwoAxis: {
				title: "",
				yAxis: [],
				data: [],
				categories: [],
			},
			lineThreeAxis: {
				title: "",
				yAxis: [],
				data: [],
				categories: [],
			},
			table: {
				data: [],
				unit: "",
			},
			merge: {
				categories: [],
				data: [],
				title: "",
				yAxis: [],
			},
		},
		modal: {
			isDevelop: false,
		},
	},
	reducers: {
		setToolbarIsOpen: (state, action) => {
			state.toolbar.isOpen[action.payload].isOpen = !state.toolbar.isOpen[
				action.payload
			].isOpen;
		},
		setToolbarChildrenIsOpen: (state, action) => {
			const cube = action.payload.split("-")[0];
			const idChildren = action.payload.split("-")[1];
			state.toolbar.isOpen[cube].children[idChildren] = !state.toolbar.isOpen[
				cube
			].children[idChildren];
		},
		setIsDragItem: (state, action) => {
			state.toolbar.isDragItem = action.payload;
		},
		setItemIsSelect: (state, action) => {
			state.mashupContent.itemIsSelect = action.payload;
		},
		setInfoIsOpen: (state, action) => {
			state.info.isOpen[action.payload] = !state.info.isOpen[action.payload];
		},
		setInfoWidget: (state, action) => {
			state.info.widget = action.payload;
		},
		setIndexItems: (state, action) => {
			state.toolbar.item.indexItems = action.payload;
		},
		setIndexItem: (state, action) => {
			state.toolbar.item.indexItem = action.payload;
		},
		setIndexChildren: (state, action) => {
			state.toolbar.item.indexChildren = action.payload;
		},
		setOutput: (state, action) => {
			if (action.payload === "clear") {
				state.info.output = [];
			} else {
				state.info.output.unshift(action.payload);
			}
		},
		setMapsData: (state, action) => {
			const data = action.payload;
			data.map((item) => state.viz.maps.data.push(item));
		},
		setTitleMaps: (state, action) => {
			state.viz.maps.title = action.payload;
		},
		setModal: (state, action) => {
			state.modal[action.payload] = !state.modal[action.payload];
		},
		setPortIsLinked: (state, action) => {
			state.mashupContent.port = action.payload;
		},
		setPortCanLinked: (state, action) => {
			state.mashupContent.portCanLinked = action.payload;
		},
		setIdNewNode: (state, action) => {
			state.mashupContent.node.push(action.payload);
		},
		removeIdNode: (state, action) => {
			state.mashupContent.node = [];
			state.viz = {
				maps: {
					title: "",
					data: [],
				},
				column: {
					categories: [],
					data: [],
					unit: "",
					title: "",
				},
				line: {
					categories: [],
					data: [],
					unit: "",
					title: "",
				},
				table: {
					title: "",
					data: [],
					unit: "",
				},
			};
		},
		setNavbarNewOnClick: (state, action) => {
			state.navbar.newOnClick = action.payload;
		},
		setSpinner: (state, action) => {
			state.navbar.spinner = action.payload;
		},
		setColorRange: (state, action) => {
			state.viz.maps.dataClasses = action.payload;
		},
		setColumnCategories: (state, action) => {
			state.viz.column.categories = action.payload;
		},
		setLineCategories: (state, action) => {
			state.viz.line.categories = action.payload;
		},
		setColumnData: (state, action) => {
			const data = action.payload;
			state.viz.column.data = data;
		},
		setTableData: (state, action) => {
			state.viz.table.data = action.payload;
		},
		setLineData: (state, action) => {
			const data = action.payload;
			state.viz.line.data = data;
		},
		setColumnTitle: (state, action) => {
			state.viz.column.title = action.payload;
		},
		setLineTitle: (state, action) => {
			state.viz.line.title = action.payload;
		},
		setTableTitle: (state, action) => {
			state.viz.table.title = action.payload;
		},
		setColumnUnit: (state, action) => {
			state.viz.column.unit = action.payload;
		},
		setLineUnit: (state, action) => {
			state.viz.line.unit = action.payload;
		},
		setTableUnit: (state, action) => {
			state.viz.table.unit = action.payload;
		},
		setPeriodOfCityName: (state, action) => {
			state.mashupContent.periodOfCity.city = action.payload;
		},
		setPeriodOfCityFromYear: (state, action) => {
			state.mashupContent.periodOfCity.fromYear = action.payload;
		},
		setPeriodOfCityToYear: (state, action) => {
			state.mashupContent.periodOfCity.toYear = action.payload;
		},
		setMerge: (state, action) => {
			state.mashupContent.merge = action.payload;
		},
		setMergeCategories: (state, action) => {
			state.viz.merge.categories = action.payload;
		},
		setMergeData: (state, action) => {
			state.viz.merge.data = action.payload;
		},
		setMergeTitle: (state, action) => {
			state.viz.merge.title = action.payload;
		},
		setMergeYAxis: (state, action) => {
			state.viz.merge.yAxis = action.payload;
		},
		setLineTwoAxisTitle: (state, action) => {
			state.viz.lineTwoAxis.title = action.payload;
		},
		setLineTwoAxisYAxis: (state, action) => {
			state.viz.lineTwoAxis.yAxis = action.payload;
		},
		setLineTwoAxisData: (state, action) => {
			state.viz.lineTwoAxis.data = action.payload;
		},
		setLineTwoAxisCategories: (state, action) => {
			state.viz.lineTwoAxis.categories = action.payload;
		},
		setLineThreeAxisTitle: (state, action) => {
			state.viz.lineThreeAxis.title = action.payload;
		},
		setLineThreeAxisYAxis: (state, action) => {
			state.viz.lineThreeAxis.yAxis = action.payload;
		},
		setLineThreeAxisData: (state, action) => {
			state.viz.lineThreeAxis.data = action.payload;
		},
		setLineThreeAxisCategories: (state, action) => {
			state.viz.lineThreeAxis.categories = action.payload;
		},
		setItemIsSelectYear: (state, action) => {
			state.mashupContent.itemIsSelectYear = action.payload;
		},
		setItemIsSelectCity: (state, action) => {
			state.mashupContent.itemIsSelectCity = action.payload;
		},
	},
});

const { reducer, actions } = dashboard;

export const {
	setToolbarIsOpen,
	setIsDragItem,
	setItemIsSelect,
	setInfoIsOpen,
	setInfoWidget,
	setIndexItems,
	setIndexItem,
	setIndexChildren,
	setOutput,
	setTitleMaps,
	setMapsData,
	setColumnCategories,
	setColumnData,
	setLineCategories,
	setLineData,
	setModal,
	setTableData,
	setPortIsLinked,
	setPortCanLinked,
	setIdNewNode,
	removeIdNode,
	setNavbarNewOnClick,
	setSpinner,
	setColorRange,
	setColumnTitle,
	setLineTitle,
	setColumnUnit,
	setLineUnit,
	setTableUnit,
	setTableTitle,
	setToolbarChildrenIsOpen,
	setPeriodOfCityName,
	setPeriodOfCityFromYear,
	setPeriodOfCityToYear,
	setMerge,
	setMergeCategories,
	setMergeTitle,
	setMergeData,
	setLineTwoAxisTitle,
	setLineTwoAxisYAxis,
	setLineTwoAxisData,
	setMergeYAxis,
	setLineTwoAxisCategories,
	setLineThreeAxisTitle,
	setLineThreeAxisYAxis,
	setLineThreeAxisData,
	setLineThreeAxisCategories,
	setItemIsSelectYear,
	setItemIsSelectCity,
} = actions;

export default reducer;
