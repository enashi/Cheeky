import React, { useEffect, useState } from 'react';
import { UidContext } from './component/AppContext';
import NavigationPanel from './component/NavigationPanel';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './component/Utilitaire/actions/user.actions';

const App = () => {
	const [uid,setUid] = useState(null); //permet de vérifier l'authentification d'un utilisateur --> token , cookie
	//des qu'on arrive sur notre application, a chaque fois qu'on va appeler le components, ca va lancer useEffect qui controle le token de l'utilisateur

	const dispatch = useDispatch();  //perme d'envoyer l'action
	useEffect(() => {
		const fetchToken = async () => {
		await axios({
			method: "get",
			url: `${process.env.REACT_APP_API_URL}jwtid`,
			withCredentials: true,
		})
			.then((res) => {
			setUid(res.data);
			})
			.catch((err) => console.log("No token"));
		};
		fetchToken();
		if(uid) dispatch(getUser(uid)) //on met l'id de l'utilisateur dans le store
	},[uid, dispatch]);


	return (
		<UidContext.Provider value = {uid}>
			<NavigationPanel />
		</UidContext.Provider>
	);
};

export default App;