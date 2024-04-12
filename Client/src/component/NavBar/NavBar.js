import React from 'react';
import { useContext } from 'react';
import NavBarHome from "./NavBarHome";
import { Link } from 'react-router-dom';
import { UidContext } from "../AppContext";

const NavBar = () => {

	const uid = useContext(UidContext);

	return (
	<div id="NavBar">
		<div>
			<Link className="Logo" to="/">
				<img src="./img/icons/logo.png" width="70" heigth="70" alt="" />
			</Link>
			<Link className="Titre" to='/'>
				<h1>Cheeky</h1>
			</Link>

			{uid ? (
				NavBarHome
			) : (
				<div className="Menu">
					<ul>
						<li className="Active">
							<a href="/#">
								<img src="./img/icons/menu-alt.png" alt=""/>
							</a>
							<ul className="MenuCRS">
								<li className="CRS">
									<Link to='/SignIn'>
										Sign In
									</Link>
								</li>
								<li className="CRS">
									<Link to='/SignUp'>
										Sign Up
									</Link>
								</li>
								<li className="CRS">
									<Link to='/Contact'>
										Contact
									</Link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			)}
		</div>
	</div>)
}

export default NavBar;