import React, { useContext } from 'react';
import Log from '../register';
import {UidContext} from "../AppContext";
import UpdateProfil from './Profil/UpdateProfil';

const Profil = () => {
	const uid = useContext(UidContext); // cette variable permet d'avoir l'id  de l'utilisateur s'il est connecté

	return (
  		<div className="profil-page">
			{uid ? (
				<UpdateProfil />
			) : (
				<div className="log-container">
					<Log signin={false} signup={true} />
				</div>
			)}
		</div>
	);
};

export default Profil;