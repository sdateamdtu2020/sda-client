import React from "react";

import { useStyles } from "./Maps.elements";
import { IconButton, Button } from "@material-ui/core";

import { AiFillCloseCircle } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";

import Maps from "../../../Visualization/Maps/Maps";

import { useSelector, useDispatch } from "react-redux";
import {
	setInfoWidget,
	setMapsData,
	setTitleMaps,
} from "../../../../app/slice/dashboardSlice";

const WidgetMaps = ({ id, data, inputs, outputs }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const itemIsSelect = useSelector(
		(state) => state.dashboard.mashupContent.itemIsSelect
	);

	const handleOnClick = () => {
		console.log("itemIsSelect", itemIsSelect);
		const name = itemIsSelect.split("-")[1];
		let action = setTitleMaps(name);
		dispatch(action);
		const data = [
			["vn-3655", 0], //viet nam
			["vn-qn", 92], //quang ninh
			["vn-kh", 106.8], //khanh hoa
			["vn-tg", 118.9], //tien giang
			["vn-bv", 99.5], //ba ria - vung tau
			["vn-bu", 107.8], //binh thuan
			["vn-hc", 105], //tp.ho chi minh
			["vn-br", 114.8], //ben tre
			["vn-st", 102], //soc trang
			["vn-pt", 97.5], //phu tho
			["vn-yb", 114.5], //yen bai
			["vn-hd", 99], //hai duong
			["vn-bn", 175], //bac ninh
			["vn-317", 108.9], //hung yen
			["vn-nb", 111.6], //ninh binh
			["vn-hm", 130.7], //ha nam
			["vn-ho", 128.7], //hoa binh
			["vn-vc", 97], //vinh phuc
			["vn-318", 105], //ha noi
			["vn-bg", 122.9], //bac giang
			["vn-tb", 106.5], //thai binh
			["vn-ld", 126], //lam dong
			["vn-bp", 114.7], //binh phuoc
			["vn-py", 113.4], //phu yen
			["vn-bd", 106.8], //binh dinh
			["vn-724", 121], //gia lai
			["vn-qg", 107.7], //quang ngai
			["vn-331", 107.4], //dong nai
			["vn-dt", 105.2], //dong thap
			["vn-la", 114.6], //long an
			["vn-3623", 103.9], //hai phong
			["vn-337", 135.4], //hau giang
			["vn-bl", 103.8], //bac lieu
			["vn-vl", 102.1], //vinh long
			["vn-tn", 121.4], //tay ninh
			["vn-ty", 106.7], //thai nguyen
			["vn-li", 101.2], //lai chau
			["vn-311", 117], //son la
			["vn-hg", 118.6], //ha giang
			["vn-nd", 116.4], //nam dinh
			["vn-328", 107], //ha tinh
			["vn-na", 109.7], //nghe an
			["vn-qb", 108.5], //quang binh
			["vn-723", 110.5], //dak lak
			["vn-nt", 110.9], //ninh thuan
			["vn-6365", 109.4], //dak nong
			["vn-299", 115.3], //kon tum
			["vn-300", 118.2], //quang nam
			["vn-qt", 113], //quang tri
			["vn-tt", 112.6], //thua thien hue
			["vn-da", 106], //da nang
			["vn-ag", 106.6], //an giang
			["vn-cm", 109.9], //ca mau
			["vn-tv", 116.2], //tra vinh
			["vn-cb", 99.1], //cao bang
			["vn-kg", 105.8], //kien giang
			["vn-lo", 104], //lao cai
			["vn-db", 105.4], //dien bien
			["vn-ls", 96.1], //lang son
			["vn-th", 107.9], //thanh hoa
			["vn-307", 74.9], //bac kan
			["vn-tq", 120.8], //tuyen quang
			["vn-bi", 110.4], //binh duong
			["vn-333", 104.6], //can tho
		];
		action = setMapsData(data);
		dispatch(action);
	};

	const handleQuestionButton = (id) => {
		id = id.split("-")[0];
		const action = setInfoWidget(id);
		dispatch(action);
	};

	return (
		<div className={classes.node}>
			<div className={classes.header}>
				<div className={classes.headerLeft} />
				<div className={classes.headerCenter}>
					<p className={classes.headerTitle}>Maps</p>
				</div>
				<div className={classes.headerRight}>
					<IconButton
						aria-label="delete"
						size="small"
						color="inherit"
						onClick={() => handleQuestionButton(id)}
					>
						<RiErrorWarningFill />
					</IconButton>
					<IconButton
						aria-label="delete"
						size="small"
						color="inherit"
						onClick={() => data.onClick(id)}
					>
						<AiFillCloseCircle />
					</IconButton>
				</div>
			</div>
			<div className={classes.button}>
				<Button
					size="small"
					variant="contained"
					color="primary"
					onClick={() => handleOnClick()}
				>
					Run
				</Button>
			</div>
			<div className={classes.body} draggable={false}>
				<div className={classes.portIn}>
					{inputs.map((port) =>
						React.cloneElement(port, {
							style: {
								width: "15px",
								height: "15px",
								background: "#1B263B",
								borderRadius: "50%",
							},
						})
					)}
				</div>
				<Maps />
			</div>
		</div>
	);
};

export default WidgetMaps;
