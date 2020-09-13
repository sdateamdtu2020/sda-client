import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Footer } from "./components";
import GlobalStyle from "./GlobalStyles";

import { NotFound, Spinner } from "./components/UI/";
import ScrollToTop from "./components/ScrollToTop";
const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const About = React.lazy(() => import("./pages/About/About"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const Contact = React.lazy(() => import("./pages/Contact/Contact"));

function App() {
	return (
		<Suspense fallback={<Spinner />}>
			<Router>
				<GlobalStyle />
				<ScrollToTop />
				<Navbar />
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/about" exact component={About} />
					<Route path="/dashboard" exact component={Dashboard} />
					<Route path="/contact" exact component={Contact} />
					<Route component={NotFound} />
				</Switch>
				<Footer />
			</Router>
		</Suspense>
	);
}

export default App;
