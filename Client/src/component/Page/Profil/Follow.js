import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../Utilitaire/actions/user.actions";
import { isEmpty } from "../../Utilitaire/Util";

const FollowHandler = ({ idToFollow, type }) => { //le type permet d'avoir un affichage pour suivre ou unfollow quelqu'un différent. Si c'est un card alors c'est un petit rond, sinon c'est un bouton classique
	const userData = useSelector((state) => state.userReducer);
	const [isFollowed, setIsFollowed] = useState(false);
	const dispatch = useDispatch();

	const handleFollow = () => {
		dispatch(followUser(userData._id, idToFollow));
		setIsFollowed(true);
	};

	const handleUnfollow = () => {
		dispatch(unfollowUser(userData._id, idToFollow));
		setIsFollowed(false);
	};

	//est appelé à chaque fois, il est relancé dès qu'on a de la userData
	// en Js on peut pas trop voir quand de la data est la de facon absolue
	//donc on export une fonction isEmpty qui retourne soit true ou false (true si vide)

	useEffect(() => {
		if (!isEmpty(userData.following)) { //si ce n'est pas vide  alors on lance  la fonction
			if (userData.following.includes(idToFollow)) {
				setIsFollowed(true);
			} else setIsFollowed(false);
		}
	}, [userData, idToFollow]);

	return (
		<div id="Follow">
			{isFollowed && !isEmpty(userData) && (  /* On regarde si la data n'est pas vide */
				<span onClick={handleUnfollow}>
					{type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
				</span>
			)}
			
			{isFollowed === false && !isEmpty(userData) && ( 
				<span onClick={handleFollow}>
					{type === "suggestion" && <button className="follow-btn">Suivre</button>}
				</span>
			)}
		</div>
	);
};

export default FollowHandler;