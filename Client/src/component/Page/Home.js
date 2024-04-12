import React, { useContext } from 'react';
import { UidContext } from '../AppContext';
import NewPostForm from './Post/NewPostForm';
import Acceuil from '../Page/Acceuil';
import FriendsHint from './Profil/FriendsHint';
import NavBarHome from '../NavBar/NavBarHome';
import Thread from './Thread';

const Home = () => {
	const uid = useContext(UidContext);

	return (
		<div id= "home">
			<div className="main">
				{uid ? (
					<div>
						<NavBarHome/>
						<div className='main-home'>
							<NewPostForm /> 
							<Thread />
						</div>
						<div className="right-side">
							<div className="right-side-container">
								<div className="wrapper">
									<FriendsHint />
								</div>
							</div>
						</div>
					</div>
				) : (
					< Acceuil />/* si on est connecté alors on peut poster sinon on a le formulaire pour se log*/
				)} 
			</div>
		</div>
	);
};

export default Home;