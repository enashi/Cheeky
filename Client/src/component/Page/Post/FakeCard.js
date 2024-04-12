import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from "../../AppContext"; 
import Popup from 'reactjs-popup'; //petite librairie qui gère les popups
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { fakePost, unfakePost } from '../../Utilitaire/actions/post.actions';

const FakeButton = ({post}) => {
	const [faked, setFaked] = useState(false); //pour voir si c'est liké de base ou non (ici non)
	const uid = useContext(UidContext); //on récupère seulement l'uid de notre utilisateur
	const dispatch = useDispatch(); // pour lancer notre fonction

	const fake = () => {
		dispatch(fakePost(post._id, uid))
		setFaked(true);
	}
    
	const unfake = () => {
        dispatch(unfakePost(post._id, uid))
		setFaked(false);
	}

	useEffect(() => { 
		if (post.fake.includes(uid)) setFaked(true) //on regarde si l'id de notre utilisateur est dans le tableau des likes du post
		else setFaked(false)
	}, [uid, post.fake, faked]) //on lance quand on récup le uid, et on le relance quand on a la tableau des posts et quand on like

	return (
		<div className="liked-container">
			{uid === null && /*Si on est pas connecté alors on peut pas like le post */
				<Popup trigger={<img src="./img/icons/close-2.png" width="20px" height="20px" alt="fake" />} position={
					['bottom center', 'bottom right', 'bottom left']
				} closeOnDocumentClick> {/* dès qu'on clique ailleurs ca ferme la fenetre */}
				</Popup>
			}
			{uid && faked === false && (
				<img src="./img/icons/close-2.png" width="20px" height="20px" onClick={fake} alt="fake" />
			)}
			{uid && faked && (
				<img src="./img/icons/close.png" width="20px" height="20px" onClick={unfake} alt="unfake" />
			)}
			<span>{post.fake.length}</span>
		</div>
	);
};

export default FakeButton;