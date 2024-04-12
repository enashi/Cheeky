import React from 'react';
import NavBar from '../NavBar/NavBar';

export default class Acceuil extends React.Component{
	render (){
		return <div id="AcceuilForm">
			<NavBar/>
			<h1 className="Acceuil">
				Bienvenue à l'expérience Cheeky
			</h1>
		</div>
	}
}
