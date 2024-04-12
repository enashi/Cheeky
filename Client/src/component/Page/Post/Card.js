import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePost } from '../../Utilitaire/actions/post.actions';
import Follow from '../Profil/Follow';
import { dateParser, isEmpty } from '../../Utilitaire/Util';
import LikeButton from './LikeButton';
import DeleteCard from './DeleteCard';
import CardComment from './CardComment';
import { NavLink } from 'react-router-dom';
import FakeButton from './FakeCard';

// récupère toute les informations du posts qui est décomposé (id, les commentaires ...)
const Card = ({ post }) => {
	const [isUpdated, setIsUpdated] = useState(false); //pour modifier le  post
	const [textUpdate, setTextUpdate] = useState(null);
	const [showComments, setShowComments] = useState(false); //pour montrer les commentaires, de bases on les voit pas
	const usersData = useSelector((state) => state.usersReducer); //toute la base de données de nos utilisateurs
	const userData = useSelector((state) => state.userReducer); //data de notre utilisateur
	const dispatch = useDispatch(); //permet d'envoyer l'action

	const updateItem = () => {
		if (textUpdate) { //si jamais si texte contient quelque chose alors on peut modifier
			dispatch(updatePost(post._id, textUpdate))
		}
		setIsUpdated(false);
	}

	return (
		<li className="card-container" key={post._id}>
			<div className='Card'>
				<div className="card-left">
					<NavLink exact to={'/visitprofil/'+ post.posterId}>
						<img src={
							!isEmpty(usersData[0]) && /*Si jamais on réclame une photo ou une data qui n'a pas encore été cherché alors il renvoie une erreur */
								usersData.map((user) => { /* On se map nos utilisateurs pour trouver l'image de notre utilisateur*/
									if (user._id === post.posterId)  /* on fait ca car si l'utilisateur change d'image alors on actualise aussi, sinon on afiche que son ancienne image*/
										return user.picture;
									else return null;
								}).join("") /* Pour éviter de mettre des virgules entre chaque element, on remplace par une chaine vide */
							}
							width="50px"
							height="50px"
							alt="poster-pic"
						/>
					</NavLink>
				</div>
				<div className="card-right">
					<div className="card-header">
						<div className="pseudo">
							<NavLink exact to={'/visitprofil/'+ post.posterId}>
								<h2>
									{!isEmpty(usersData[0]) && /*On cherche de facon dynamique le pseudo de l'utilisateur, On fait la même chose qu'au dessus */
										usersData.map((user) => {
											if (user._id === post.posterId)
												return user.pseudo;
											else return null;
										}).join("")
									}
								</h2>
							</NavLink>
							{post.posterId !== userData._id && ( /* évite de ce follow lui même */
								<Follow idToFollow={post.posterId} type={'card'} />
							)}
						</div> {/* on affiche la date du post */}
						<span> {dateParser(post.createdAt)}</span>
					</div>
					
					{isUpdated === false && <p> {post.message}</p>}
					{isUpdated && (
						<div className="update-post">
							<textarea
								defaultValue={post.message}
								onChange={(e) => setTextUpdate(e.target.value)}
							/>
							<div className="button-container">
								<button className="btn" onClick={updateItem}>
									Valider modification
								</button>
							</div>
						</div>
					)}
					{post.picture && (
						<img src={post.picture} alt="card-pic" className="card-pic" />
					)}
					{post.video && ( /* pour mettre la vidéo à une certaine taille dans le post, ce sont les paramètres pour afficher des vidéos youtube */
						<iframe
							width="500"
							height="300"
							src={post.video}
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							title={post._id}
						></iframe>
					)}
					{userData._id === post.posterId && ( /* donne la posiblité d'édit notre post uniquement si c'est le notre */
						<div className="button-container">
							<div onClick={() => setIsUpdated(!isUpdated)} /* Permet de retirer l'édition quand on clique sur le bouton */>
								<img src="./img/icons/edit.svg" width="20px" height="20px" alt="edit" />
							</div>
							
							<DeleteCard id={post._id} />
						</div>
					)}
					<div className="card-footer"> {/* Pour afficher tout les commentaires  */}
						<div className="comment-icon">
							<img onClick={() => setShowComments(!showComments)}
								src="./img/icons/message1.svg"
								alt="comment"
								width="20px" 
								height="20px"
							/>
							<span> {post.comments.length}</span>
						</div>
							
						<LikeButton post={post} /> {/* pour récup les données et voir les likes de chaque post*/} 
						<FakeButton post={post} />
					</div>
						
					{showComments && <CardComment post={post} />}
				</div>
			</div>
		</li>
	);
};

export default Card;