import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	info: {
		// 60px: navbar
		// 2px: marginBottom navbar
		// 2px: marginBottom dashboard
		height: "calc( 100vh - 60px - 2px - 2px)",
		width: "320px",

		marginLeft: "2px",
		border: "1px solid #000",
		backgroundColor: "rgb(242, 242, 242)",
		overflowY: "auto",
	},
	listItem: {
		borderTop: "1px solid rgba(0,0,0,0.2)",

		borderBottom: "1px solid rgba(0,0,0,0.2)",
	},
	collapse: {
		paddingLeft: 10,
		paddingRight: 10,
	},
	isOpen: {
		backgroundColor: theme.palette.primary.main,
		color: "white",

		"&:hover": {
			backgroundColor: theme.palette.primary.dark,
		},
	},
}));
