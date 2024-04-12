import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addComment, getPosts } from '../../Utilitaire/actions/post.actions';
import Follow from '../Profil/Follow';
import { isEmpty, timestampParser } from '../../Utilitaire/Util';
import EditDeleteComment from './EditDeleteComment';

const CardComment = ( { post } ) => {
	const [text, setText] = useState(""); //le texte de notre commentaire
	const usersData = useSelector((state) => state.usersReducer);
	const userData = useSelector((state) => state.userReducer);
	const dispatch = useDispatch(); //permet d'envoyer l'action

	const handleComment = (e) => {
		e.preventDefault(); //éviter de changer de page quand on clique sur confirmer
		
		if(text){
			dispatch(addComment(post._id, userData._id, text, userData.pseudo))
			.then(() => dispatch(getPosts())) //on récupère tout les postes de mongoDb -> le store va se mettre a jour avec l'id unique du poste,
			.then(() => setText('')); // on remet le texte du commentaire a vide si on veut en refaire un plus tard
		}
	}

	return (
		<div className="comments-container">
			{post.comments.map((comment) => { /*On montre tout les commentaires qui sont dans la liste du post */
				return (
					<div className={"comment-container" /* Quand on commente un post notre commentaire va être d'une autre couleur*/} key={comment._id}>
						<div className="left-part">
							<br></br>
							<NavLink exact to={'/visitprofil/'+ comment.commenterId}>
								<img 
									src={ /* on récupère l'image de facon dynamique comme pour les post*/
										!isEmpty(usersData[0]) && usersData.map((user) => {
											if (user._id === comment.commenterId) 
												return user.picture;
											return null;
										}).join("") 
									}    
									alt="commenter-pic"
									width="30px" 
									height="30px"
								/>
							</NavLink>
						</div>
						<div className="right-part">
							<div className="comment-header">
								<div className="pseudo">
									<NavLink exact to={'/visitprofil/'+ comment.commenterId}>
										<h3>{comment.commenterPseudo}</h3> {/* On récupère le commentaire de manière non dynamique car on peut pas changer de pseudo  */}
									</NavLink>
									{comment.commenterId !== userData._id && ( /*pour pouvoir follow la personne qui a commenté (on ne peut pas ce suivre soit-même) */
										<Follow
											idToFollow={comment.commenterId} 
											type={"card"} 
										/>
									)}
								</div>
								<span>{timestampParser(comment.timestamp)}</span> 
							</div>
							<p> {comment.text} </p>
							<EditDeleteComment comment={comment} postId={post._id} />
						</div>
					</div>
				)
			})}
			{userData._id && ( /* si jamais on est connecté alors on peut rajouter un commentaire*/
				<form action="" onSubmit={handleComment} className="comment-form">
					<input className='commentaire' type="text" name="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="Commentaire"/>
					<br/>
					<input className='commenter' type="submit" value="Envoyer" /> 
				</form>
			)}
		</div>
	);
};

export default CardComment;