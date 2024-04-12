import React from "react";
import axios from "axios";
import cookie from "js-cookie"; //permet de gérer les cookie en react (en FRONT)

const Logout = () => {
	const removeCookie = (key) => {
		if (window !== "undefined") {
			cookie.remove(key, { expires: 1 });
		}
	};

	const logout = async () => {
		await axios({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}api/user/logout`,
			withCredentials: true,
		})
			.then(() => removeCookie("jwt"))
			.catch((err) => console.log(err));
		
		window.location = "/";
	};

	return (
		<div id="Lougout">
			<li onClick={logout}>
				<img src="./img/icons/logout.svg" width="30" height="30" alt="logout" />
			</li>
		</div>
		
	);
};

export default Logout;