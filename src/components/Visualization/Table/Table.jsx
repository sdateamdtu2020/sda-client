import React from "react";
import { useStyles } from "./Table.elements";

import {
	Table,
	TableBody,
	TableHead,
	TableCell,
	TableContainer,
	TableRow,
	Paper,
	Typography,
} from "@material-ui/core";

import { useSelector } from "react-redux";

const TableComponent = () => {
	const classes = useStyles();
	const tableData = useSelector((state) => state.dashboard.viz.table.data);
	const tableTitle = useSelector((state) => state.dashboard.viz.table.title);
	const tableUnit = useSelector((state) => state.dashboard.viz.table.unit);
	return (
		<div className={classes.tableComponent}>
			{tableTitle ? (
				<Typography variant="subtitle1" align="center" gutterBottom>
					{tableTitle} ({tableUnit})
				</Typography>
			) : null}
			<TableContainer component={Paper}>
				<Table className={classes.table} stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell align="left">City</TableCell>
							<TableCell align="left">Year</TableCell>
							<TableCell align="left">Value</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData.map((item, index) => (
							<TableRow hover key={index}>
								<TableCell align="left">{item.city}</TableCell>
								<TableCell align="left">{item.year}</TableCell>
								<TableCell align="right">{item.value}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default TableComponent;
