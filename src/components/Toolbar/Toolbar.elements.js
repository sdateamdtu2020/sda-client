import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	toolbar: {
		// 60px: navbar
		// 2px: marginBottom navbar
		// 2px: marginBottom dashboard
		height: "calc( 100vh - 60px - 2px - 2px)",
		width: "195px",
		overflowY: "scroll",
		backgroundColor: "rgb(242, 242, 242)",
		border: "1px solid #000",
		marginRight: "2px",
	},
	collapse: {
		paddingLeft: 10,
		paddingRight: 10,
	},
	listItem: {
		borderBottom: "1px solid rgba(0,0,0,0.2)",
	},
	isOpen: {
		backgroundColor: theme.palette.primary.main,
		color: "white",

		"&:hover": {
			backgroundColor: theme.palette.primary.dark,
		},
	},
	subHeader: {
		background: theme.palette.primary.light,
		borderBottom: "1px solid rgba(0,0,0,0.2)",
		cursor: "default",
		color: "white",
		userSelect: "none",
	},
}));
