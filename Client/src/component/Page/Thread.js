import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { getPosts } from '../Utilitaire/actions/post.actions';
import { isEmpty } from "../Utilitaire/Util";
import Card from './Post/Card';

const Thread = (post) => {
	const [loadPost, setLoadPost] = useState(true);
	const [count, setCount] = useState(5); //pour savoir le nombre de post qu'on va lire
	const dispatch = useDispatch(); //permet d'envoyer l'action
	const posts  = useSelector((state) => state.postReducer); //on se recupère le postReducers ( la ou il y a tout les posts)
	const [searchTerm, setSearchTerm] = useState("");

	const loadMore = () => {
		if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
			setLoadPost(true); //document.scrollingEl... c'est la taille du scroll (2000 ou 3000px)
								// windows.innerHeight + ... c'est l'endroit on ou est exactement quand on navigue
								// quand ca touche le bas alors loadPost est appelé et vu qu'il est dans le callback, alors il passe sur true et on appel don useEffect qui va ajouter des post à afficher
		}
	};

	const handleSearchTerm = (e) => {
		let value = e.target.value;
		setSearchTerm(value)    
	};

    //quand on va lancer le compenants du thread, on va se récupérer tout les postes
	useEffect(() => {
		if (loadPost){
			dispatch(getPosts(count));
			setLoadPost(false);
			setCount(count + 5); //quand on appel loadpost on incrémente de 5
		}

		window.addEventListener('scroll', loadMore); //dès qu'on scroll on appel la fonction loadMore, pour analyser ou on est dans la page
		return () => window.removeEventListener('scroll', loadMore); //Quand on est plus dans cet element alors on remove l'enventlistener
	}, [loadPost, dispatch, count])

    return (
		<div className="thread-container">
			<div className="bar-container">
				<div className="searchbar"> 
					<input 
						type="text"
						name="searchBar"
						id="searchBar"
						placeholder="Rechercher..."
						onChange={handleSearchTerm}
					/>
				</div> 
			</div>
			<br/>
			<ul>
				{!isEmpty(posts[0]) &&  /*évite l'erreur si post est vide */ 
					posts.filter(post => post.message.toLowerCase().includes(searchTerm.toLowerCase())).map((post) => { /*On va détailler chaque éléments  */
						return <Card post={post} key={post._id} /> /*récupère chaque id unique du posts et toutes les informations qui va avec*/
					})
				}
			</ul>   
		</div>
	);
};

export default Thread;