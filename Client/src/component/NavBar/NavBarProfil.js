import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../register/Logout';

export default class NavBarHome extends React.Component{
	render(){
		return <div id="NavBar">
			<div>
				<Link className="Logo" to="/Home">
					<img src="./img/icons/logo.png"  width="70" heigth="70" alt="" />
				</Link>
				<Link className="Titre" to='/Home'>
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
									<Link to='/Home'>
										Home
									</Link>
								</li>
								<li className="CRS">
									<Logout/>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
	}
}