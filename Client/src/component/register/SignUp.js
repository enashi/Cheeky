import React, { useState } from 'react';
import axios from 'axios';
import SignIn from "./SignIn";
import NavBarSignUp from '../NavBar/NavBarSignUp';

const SignUp = () => {
	const [formSubmit, setFormSubmit] = useState(false); //ca permet de swip quand on a fini l'enregistrement, qu'on reste pas sur la même page
	const [pseudo, setPseudo] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [controlPassword, setControlPassword] = useState('');

	const handleRegister = async (e) => {
		e.preventDefault();
		const terms = document.getElementById("terms");
		const pseudoError = document.querySelector(".pseudo.error");
		const emailError = document.querySelector(".email.error");
		const passwordError = document.querySelector(".password.error");
		const passwordConfirmError = document.querySelector(
		".password-confirm.error"
		);
		const termsError = document.querySelector(".terms.error");

		passwordConfirmError.innerHTML = "";
		termsError.innerHTML = "";

		if (password !== controlPassword || !terms.checked) {
		if (password !== controlPassword)
			passwordConfirmError.innerHTML =
			"Les mots de passe ne correspondent pas";

		if (!terms.checked)
			termsError.innerHTML = "Veuillez valider les conditions générales";
		} else {
		await axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}api/user/register`,
			data: {
			pseudo,
			email,
			password,
			},
		})
			.then((res) => {
			console.log(res);
			if (res.data.errors) {
				// si  y a des erreurs alors on renvoie dans le serveur la ou on gère les erreurs
				pseudoError.innerHTML = res.data.errors.pseudo;
				emailError.innerHTML = res.data.errors.email;
				passwordError.innerHTML = res.data.errors.password;
			}else {
				setFormSubmit(true);
			}
			})
			.catch((err) => console.log(err));
		} 
	};

	return (
		<>
			{formSubmit ? (
				<>
					<SignIn />
					<span></span>
					<h4 className="success">
						Bravo, connecte toi maintenant !
					</h4>
				</>
			) : (
				<div>
					<NavBarSignUp/>
					<form id="Create" action="" onSubmit={handleRegister}>
						<h4> Register </h4>
						<input
							type="text"
							name="pseudo"
							id="pseudo"
							placeholder='Pseudo'
							onChange={(e) => setPseudo(e.target.value)}
							value={pseudo}
						/>
						
						<div className="pseudo error"></div>
						<br />
						
						<input
							type="text"
							name="email"
							id="email"
							placeholder='Email'
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						
						<div className="email error"></div>
						<br />
						
						<input
							type="password"
							name="password"
							id="password"
							placeholder='Mot de passe'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
						
						<div className="password error"></div>
						<br />
						
						<input
							type="password"
							name="password"
							id="password-conf"
							placeholder='Confirmer mot de passe'
							onChange={(e) => setControlPassword(e.target.value)}
							value={controlPassword}
						/>
						
						<div className="password-confirm error"></div>
						<br />
						
						<input type="checkbox" id="terms"/>
						
						<label htmlFor="terms">
							J'accepte les{" "}
							<a href="/Conditions" target="_blank" rel="noopener noreferrer">{/* noopener et noreferrer c'est pour avoir plus de sécurité */}conditions générales</a>
						</label>
						
						<div className="terms error"></div>
						<br />
						
						<button className="Submit">
								Valider Inscription
						</button>
					</form>
				</div>
			)}
		</>
	);
};

export default SignUp;