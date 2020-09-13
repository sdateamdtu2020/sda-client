import styled from "styled-components";
import { Link } from "react-router-dom";
export const FooterContainer = styled.div`
	background-color: #101522;
	padding: 0.5rem 1rem 0.5rem 1rem;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const SocialMedia = styled.section`
	width: 100%;
	max-width: 1200px;
`;

export const SocialMediaWrap = styled.div`
	width: 90%;
	max-width: 1200px;
	margin: 0.5rem auto 0.5rem auto;

	display: flex;
	justify-content: space-between;
	align-items: center;

	@media screen and (max-width: 820px) {
		flex-direction: column;
	}
`;

export const SocialLogo = styled(Link)`
	color: #fff;
	text-decoration: none;
	font-size: 2rem;

	display: flex;
	justify-self: flex-start;
	align-items: center;

	cursor: pointer;
`;

export const LogoImg = styled.img`
	padding-right: 0;
	border: 0;
	vertical-align: middle;
	display: inline-block;
	height: 60px;
`;

export const WebsiteRights = styled.small`
	color: #fff;
	margin: 16px 0;
	font-size: 1.2rem;
`;

export const SocialIcons = styled.div`
	/* width: 240px; */

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const SocialIconLink = styled.a`
	color: #fff;
	font-size: 24px;
	margin-left: 10px;
`;
