import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../Utilitaire/actions/post.actions';

const DeleteCard = (props) => {
 	const dispatch = useDispatch(); //permet d'envoyer l'action
	const deleteQuote = () => dispatch(deletePost(props.id))

	return (
		<div onClick={() => {
				if(window.confirm('Voulez-vous vraiment supprimer ce post ?')){
					deleteQuote();
				}
			}}>
			<img src="./img/icons/trash.svg" width="20px" height="20px" alt="trash" />
		</div>
	);
};

export default DeleteCard;