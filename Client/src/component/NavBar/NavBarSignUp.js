import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBarSignUp() {
	return(
		<div id="Sign">
			<div id="NavBar">
				<div>
					<Link className="Logo" to="/">
						<img src="./img/icons/logo.png"  width="70" heigth="70" alt="" />
					</Link>
					<Link className="Titre" to='/'>
						<h1>Cheeky</h1>
					</Link>
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
										<Link to='/Contact'>
											Contact
										</Link>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};