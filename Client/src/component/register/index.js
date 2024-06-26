import React, { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Log = ( props ) => {
	const [signUpModal,setSignUpModal] = useState(props.signup); /* le props.signup permet par exemple quand on appel la page profil de donner des paramètre et faire en sorte que ce soir signup en premier ou l'inverse*/
	const [signInModal,setSignInModal] = useState(props.signin);

	const handleModals = (e) => {
		if(e.target.id === "register"){
			setSignInModal(false);
			setSignUpModal(true);
		} else if(e.target.id === "login"){
			setSignUpModal(false);
			setSignInModal(true);
		}
	}

	return (
		<div className="connection-form">
			<div className ="form-container">
			   <ul>
				<li onClick ={handleModals} id="register" className={signUpModal ? "active-btn" : null}>S'inscrire</li>
				<li onClick ={handleModals} id="login" className={signInModal ? "active-btn" : null}>Se connecter</li> {/* active-btn est une classe créer en css pour quand on va sur le bouton il devient lumineux*/}
				</ul> 
				{signUpModal && <SignUp />} {/* ici c'est true alors on retourne le formulaire d'inscription */}
				{signInModal && <SignIn />}
			</div>
		</div>
	);
};

export default Log;