import React, { useState } from 'react';
import axios from "axios";
import NavBarSignIn from "../NavBar/NavBarSignIn";

const SignIn = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('');

	const handleLogin = (e) => {
		e.preventDefault(); /* Permet de pas recharger la page quand on clique sur Submit*/ 

		const emailError = document.querySelector(".email.error"); //permet de gérer les erreurs
		const passwordError = document.querySelector(".password.error");

		axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}api/user/login`, //ca correspond à la variable d'environnement, ca permet de pas tout réecrire si on change d'host
			withCredentials: true,
			data: {
				email,
				password,
			},
		})
			.then((res) => {
				console.log(res);
				if (res.data.errors) {
					emailError.innerHTML = res.data.errors.email;
					passwordError.innerHTML = res.data.errors.password;
				} else {
					window.location = "/"; // on va présenter notre token est on va être considéré comme connecté
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<NavBarSignIn/>
			<div className="LoginForm">
				<div className="Form_box">
					<div className="Input_login">
						<form action="" onSubmit={handleLogin}>
							<h4>Log In </h4>
							<input 
								type="text" 
								className="Input-Field" 
								placeholder="email"
								onChange = { (e) => {
									setEmail(e.target.value);
								}}/>
							<div className="email error"></div>
							<br />
							<input 
								type = "password" 
								className="Input-Field" 
								placeholder="Password"
								onChange = { (e) => {
									setPassword(e.target.value);
								}}/>
							<div className="password error"></div>
							<br />
							<button className="Submit">
								Log In
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;