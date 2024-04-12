import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from "../../AppContext"; 
import Popup from 'reactjs-popup'; //petite librairie qui gère les popups
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../Utilitaire/actions/post.actions';

const LikeButton = ({post}) => {
	const [liked, setLiked] = useState(false); //pour voir si c'est liké de base ou non (ici non)
	const uid = useContext(UidContext); //on récupère seulement l'uid de notre utilisateur
	const dispatch = useDispatch(); // pour lancer notre fonction

	const like = () => {
		dispatch(likePost(post._id, uid))
		setLiked(true);
	}
    
	const unlike = () => {
		dispatch(unlikePost(post._id, uid))
		setLiked(false);
	}

	useEffect(() => { 
		if (post.likers.includes(uid)) setLiked(true) //on regarde si l'id de notre utilisateur est dans le tableau des likes du post
		else setLiked(false)
	}, [uid, post.likers, liked]) //on lance quand on récup le uid, et on le relance quand on a la tableau des posts et quand on like

	return (
		<div className="liked-container">
			{uid === null && /*Si on est pas connecté alors on peut pas like le post */
				<Popup trigger={<img src="./img/icons/heart.svg" width="20px" height="20px" alt="like" />} position={
					['bottom center', 'bottom right', 'bottom left']
				} closeOnDocumentClick> {/* dès qu'on clique ailleurs ca ferme la fenetre */}
				
				<div> 
					Connectez-vous pour pouvoir aimer ce post ! 
				</div>
				
				</Popup>
			}
			{uid && liked === false && (
				<img src="./img/icons/heart.svg" width="20px" height="20px" onClick={like} alt="like" />
			)}
			{uid && liked && (
				<img src="./img/icons/heart-filled.svg" width="20px" height="20px" onClick={unlike} alt="unlike" />
			)}
			<span>{post.likers.length}</span>
		</div>
	);
};

export default LikeButton;