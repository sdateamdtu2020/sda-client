import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	closeBtn: {
		position: "absolute",
		top: 0,
		right: 0,
	},
	link: {
		textDecoration: "none",
	},
}));
