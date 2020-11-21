import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	navbar: {
		height: "60px",
		display: "flex",
		position: "sticky",
		top: 0,
		zIndex: "999",
		background: theme.palette.primary.main,
		marginBottom: "2px",
	},
	logo: {
		width: "185px",
		display: "flex",
		justifyContent: "center",
	},
	logoImg: {
		height: "60px",
		padding: "5px",
		display: "flex",
		alignItems: "center",
	},
	groupButton: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));
