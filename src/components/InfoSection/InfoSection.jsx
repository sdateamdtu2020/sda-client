import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "../../GlobalStyles";
import {
	InfoSec,
	InfoRow,
	InfoColumn,
	TextWrapper,
	TopLine,
	Heading,
	Subtitle,
	ImgWrapper,
	Img,
} from "./InfoSection.elements";
const InfoSection = ({
	lightBg,
	imgStart,
	lightTopLine,
	topLine,
	lightText,
	headline,
	lightTextDesc,
	description,
	primary,
	urlLinkBtn,
	buttonLabel,
	img,
	alt,
	start,
}) => {
	return (
		<>
			<InfoSec lightBg={lightBg}>
				<Container>
					<InfoRow imgStart={imgStart}>
						<InfoColumn>
							<TextWrapper>
								<TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
								<Heading lightText={lightText}>{headline}</Heading>
								<Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
								<Link to={urlLinkBtn}>
									<Button big fontBig primary={primary}>
										{buttonLabel}
									</Button>
								</Link>
							</TextWrapper>
						</InfoColumn>
						<InfoColumn>
							<ImgWrapper start={start}>
								<Img src={img} alt={alt} />
							</ImgWrapper>
						</InfoColumn>
					</InfoRow>
				</Container>
			</InfoSec>
		</>
	);
};

export default InfoSection;
