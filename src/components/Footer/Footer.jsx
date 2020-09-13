import React from "react";
import logoImg from "../../assets/img/logo.png";
import { FaGithub } from "react-icons/fa";
import {
	FooterContainer,
	LogoImg,
	SocialIconLink,
	SocialIcons,
	SocialLogo,
	SocialMedia,
	SocialMediaWrap,
	WebsiteRights,
} from "./Footer.elements";
const Footer = () => {
	return (
		<FooterContainer>
			<SocialMedia>
				<SocialMediaWrap>
					<SocialLogo to="/">
						<LogoImg src={logoImg} alt="logo" />
					</SocialLogo>
					<WebsiteRights>SDA-Team © 2020</WebsiteRights>
					<SocialIcons>
						<SocialIconLink
							href="https://github.com/sdateamdtu2020"
							target="_blank"
							aria-label="Facebook"
						>
							<FaGithub />
						</SocialIconLink>
					</SocialIcons>
				</SocialMediaWrap>
			</SocialMedia>
		</FooterContainer>
	);
};

export default Footer;
