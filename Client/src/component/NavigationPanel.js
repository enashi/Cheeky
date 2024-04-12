import React from 'react';
import { BrowserRouter as Router, Redirect, Switch,Route} from 'react-router-dom';
import Home from "./Page/Home";
import Profil from "./Page/Profil";
import Contact from "./Page/Contact";
import SignIn from './register/SignIn';
import SignUp from './register/SignUp';
import Conditions from './Utilitaire/Conditions';
import VisitProfil from './Page/Profil/VisitProfil';

const NavigationPanel = () => {
	return (
		<Router>
			<Switch>
				<Route path ="/" exact component = {Home} />
				<Route path ="/profil" exact component = {Profil} />
				<Route path ="/Contact" exact component = {Contact}/>
				<Route path ="/visitprofil/:id" exact component = {VisitProfil}/>
				<Route path ="/Conditions" exact component = {Conditions} />
				<Route path ="/SignIn" exact component = {SignIn}/>
				<Route path ="/SignUp" exact component = {SignUp}/>
				<Redirect to="/" />
			</Switch>
		</Router>  
	);
};

export default NavigationPanel;