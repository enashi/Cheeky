import React from 'react';
import NavBarContact from '../NavBar/NavBarContact'

export default class Contact extends React.Component{

	render(){

		return <div id="ContactForm">
			<NavBarContact/>
			<div className = "entete">
				<h1>
					Informations utiles
				</h1>
			</div>
			<div id = "CorpsContact">
				<div className = "Etudiant1">
					<form id="Danny" className="Input">
						<h4>
							BOUREKH
						</h4>
						<h4>
							Zidane
						</h4>
						<h4>
							3677063
						</h4>
						<h4>
							Groupe du Lundi
						</h4>
						<h4>
							<a href="mailto:danny.vang@etu.sorbonne-universite.fr:" rel = "nofollow">
								zidane.bourekh@etu.sorbonne-universite.fr
							</a>
						</h4>
					</form>
				</div>
				<div className = "Etudiant2">
					<form id="Ihsane" className="Input">
						<h4>
							BOUBRIK
						</h4>
						<h4>
							Ihsane 
						</h4>
						<h4>
							3670795
						</h4>
						<h4>
							Groupe du Mardi
						</h4>
						<h4>
							<a href="mailto:ihsane.boubrik@etu.sorbonne-universite.fr:" rel = "nofollow">
								ihsane.boubrik@etu.sorbonne-universite.fr
							</a>
						</h4>
				   	</form>
				</div>
			</div>
		</div>
	}
}