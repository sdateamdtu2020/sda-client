import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	node: {
		border: "1px solid #000",
		borderRadius: "5px",
		backgroundColor: "rgb(255, 255, 255, 0.9)",
	},
	header: {
		width: "100%",
		height: "25px",
		backgroundColor: "#3366cc",
		display: "flex",
		justifyContent: "space-between",
		padding: "2px 10px",
	},
	headerLeft: {},
	headerCenter: {},
	headerTitle: {
		fontSize: "16px",
		color: "white",
		fontWeight: "bold",
	},
	headerRight: {
		color: "white",
	},
	body: {
		border: "1px solid #000",
		margin: "10px",
		overflowY: "auto",
	},
	footer: {
		margin: "10px",
	},
	portOut: {
		position: "absolute",
		top: "50%",
		right: "-8px",
	},
	treeView: {
		height: "216px",
		flexGrow: "1",
		maxWidth: "400px",
	},
}));
