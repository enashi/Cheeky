import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../Utilitaire/actions/user.actions';

const DeleteUser = (props) => {
 	const dispatch = useDispatch(); //permet d'envoyer l'action
	const deleteQuote = () => dispatch(deleteUser(props.id))

	return (
		<div onClick={() => {
				if(window.confirm('Voulez-vous vraiment supprimer ce profil ?')){
					deleteQuote();
				}
			}}>
			<img src="./img/icons/trash.svg" width="20px" height="20px" alt="trash" />
		</div>
	);
};

export default DeleteUser;