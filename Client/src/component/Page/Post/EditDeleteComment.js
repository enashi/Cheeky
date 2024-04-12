import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../Utilitaire/actions/post.actions';
import { UidContext } from '../../AppContext';

const EditDeleteComment = ({ comment, postId}) => {
	const [isAuthor, setIsAuthor] = useState(false); //permet de voir si on est auteur du commentaire
	const [edit, setEdit] = useState(false);
	const [text, setText] = useState('');
	const uid = useContext(UidContext); //on récupère que l'id de notre utilisateur
	const dispatch = useDispatch(); //permet d'envoyer l'action

	const handleEdit = (e) => {
		e.preventDefault();

		if(text){
			dispatch(editComment(postId, comment._id, text));
			setText('');
			setEdit(false);
		}
	};

	const handleDelete = () => dispatch(deleteComment(postId, comment._id));

	useEffect(() => {
		//on vérifie si on est l'auteur du commentaire
		const checkAuthor = () => {
			if (uid === comment.commenterId){
				setIsAuthor(true);
			}
		}
		checkAuthor();
	}, [uid, comment.commenterId]);

	return (
		<div className="edit-comment">
			{isAuthor && edit === false && ( /*On regarde si on est l'auteur et que edit = false alors on change pour qu'on puisse cliquer et edit */
				<span onClick={() => setEdit(!edit)}>
					<img src="./img/icons/edit.svg"  width="20px" height="20px" alt="edit-comment"/>
				</span>
			)}
			{isAuthor && edit && (
				<form action="" onSubmit={handleEdit} className="edit-comment-form">
					<br/> 
					<input
						/*Ca devient un input de type text pour qu'on puisse écrire dedans et faire les modifs */ 
						type="text" 
						name="text" 
						onChange={(e) => setText(e.target.value)} 
						defaultValue={comment.text}
					/>
					<br/>
					<div className="btn">
						<span onClick={() => {
							if(window.confirm("Voulez-vous vraiment supprimer ce commentaire?")){
									handleDelete();
								}
							}}>
							<img src="./img/icons/trash.svg" width="20px" height="20px" alt="delete"/>
						</span>
						<input type="submit" value="Valider modification" />
						<label htmlFor="text" onClick={() => setEdit(!edit)}>
							<h5>Annuler</h5>
						</label>
					</div>
				</form>
			)}
		</div>
	);
};

export default EditDeleteComment;