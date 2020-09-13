import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

import {
	MobileIcon,
	Nav,
	NavbarContainer,
	NavLogo,
	NavLogoImg,
	NavMenu,
	NavItem,
	NavLinks,
} from "./Navbar.elements";
import logoImg from "../../assets/img/logo.png";

const Navbar = () => {
	const [click, setClick] = useState(false);

	const handleClick = () => {
		setClick(!click);
	};

	const closeMobileMenu = () => {
		setClick(false);
	};

	return (
		<>
			<IconContext.Provider value={{ color: "#fff" }}>
				<Nav>
					<NavbarContainer>
						<NavLogo to="/" onClick={closeMobileMenu}>
							<NavLogoImg src={logoImg} alt="logo" />
						</NavLogo>
						<MobileIcon onClick={handleClick}>
							{click ? <FaTimes /> : <FaBars />}
						</MobileIcon>
						<NavMenu onClick={handleClick} click={click}>
							<NavItem>
								<NavLinks to="/">Home</NavLinks>
							</NavItem>
							<NavItem>
								<NavLinks to="/dashboard">Dashboard</NavLinks>
							</NavItem>
							<NavItem>
								<NavLinks to="/about">About</NavLinks>
							</NavItem>
							<NavItem>
								<NavLinks to="/contact">Contact</NavLinks>
							</NavItem>
						</NavMenu>
					</NavbarContainer>
				</Nav>
			</IconContext.Provider>
		</>
	);
};

export default Navbar;
