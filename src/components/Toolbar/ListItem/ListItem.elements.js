import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
}));
