import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 *{
   box-sizing: border-box;
   margin: 0;
   padding: 0;
   font-family: "Source Sans Pro", sans-serif;
 }
  ::-webkit-scrollbar {
    width: 12px;
  }
 
  /* Track */
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: rgba(0,0,0,0.8); 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(0,0,0,0.4); 
  }
`;

export const Container = styled.div`
	width: 100%;
	max-width: 1200px;
	margin-right: auto;
	margin-left: auto;
	padding-right: 50px;
	padding-left: 50px;

	z-index: 1;

	@media screen and (max-width: 991px) {
		padding-right: 30px;
		padding-left: 30px;
		overflow-x: hidden;
	} ;
`;

export const Button = styled.button`
	border-radius: 4px;
	background: ${({ primary }) => (primary ? "#4B59F7" : "#0467FB")};
	white-space: nowrap;
	padding: ${({ big }) => (big ? "12px 64px" : "10px 20px")};
	color: #fff;
	font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
	outline: none;
	cursor: pointer;
	border: none;

	&:hover {
		transition: all 0.3s ease-out;
		background: #fff;
		background: ${({ primary }) => (primary ? "#0467FB" : "#4B59F7")};
	}

	@media screen and (max-width: 960px) {
		width: 100%;
	}
`;

export default GlobalStyle;
