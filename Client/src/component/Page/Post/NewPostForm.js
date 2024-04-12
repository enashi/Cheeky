import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, getPosts } from '../../Utilitaire/actions/post.actions';
import { isEmpty } from '../../Utilitaire/Util';

const NewPostForm = () => {
	const [message, setMessage] = useState(""); //texte du message
	const userData = useSelector((state) => state.userReducer); //charger le contenu de notre store (user et users)
	const error = useSelector((state) => state.errorReducer.postError);
	const dispatch = useDispatch();

	const handlePost = async () => {
		if (message) {
			
			await dispatch(addPost(userData._id, message)); // on envoie la data pour faire la requete 
			dispatch(getPosts());
			cancelPost();

		} else {
			alert("Veuillez entrer un message");
		}
	};

	const cancelPost = () => {
		setMessage('');
	};

	return (
		<div className="post-container">
			<div className='Post'>
				<div className="post-form">
					<div className="card-container">
						<div className="card-right">
							<textarea
								name="message"
								id="message"
								placeholder="Quoi de beau ?"
								onChange={(e) => setMessage(e.target.value)}
								value={message}
								rows="5"
								cols="60"
							/>
						</div>
						{message > 20 ? (
							<li>
								<div className="card-container">
									<div className="card-right">
										<div className="content">
											<p> { message } </p>
										</div>
									</div>
								</div>
							</li>
						) : (
							null
						)}
					</div>
						
					<div className="footer-form"> {/*Si on a mis une image alors on peut pas mettre de vidéo et inversement */}
						{!isEmpty(error.format) && <p>{error.format}</p>}
						{!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
							
						<div className="btn-send">
							{message > 20 ? ( /* permet d'afficher le bouton uniquement quand il y a du contenu dedans */
								<button className="cancel" onClick={cancelPost}>Annuler message</button>
							) : (
								null
							)}

							<button className="send" onClick={handlePost}>Envoyer</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewPostForm;