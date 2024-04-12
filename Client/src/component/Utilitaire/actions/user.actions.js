import axios from "axios";

// c'est une table des matières de nos actions 
//pour que ce soit reconnu dans notre reducers
export const GET_USER = "GET_USER"; 
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const GET_USER_ERRORS = "GET_USER_ERRORS";
export const UPDATE_BIO = "UPDATE_BIO";
export const DELETE_USER = "DELETE_USER";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

//dispatch permet de déclencher un changement d'état

export const getUser = (uid) => {
		return(dispatch) => { //dispatch c'est ce qu'on va envoyer au reducer
				return axios
				.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
				.then((res) => {
					dispatch({ type: GET_USER, payload: res.data }); //toute la data qu'on vient de chercher, on la passe au reduxer
				})
				.catch((err) => console.log(err));
		};
	};

export const uploadPicture = (data,id) =>{
	return(dispatch)=>{
		return axios 
			.post(`${process.env.REACT_APP_API_URL}api/user/upload`,data)
			.then((res) =>{
				if (res.data.errors){
					dispatch({type: 'GET_USER_ERRORS', payload: res.data.errors})
				}else{
					dispatch({type: 'GET_USER_ERRORS', payload: ""});
					return axios  
						.get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
						.then((res)=>{
							dispatch({type : UPLOAD_PICTURE, payload: res.data.picture})
						})
					}
			})
				.catch((err)=> console.log(err))
	};
};


export const updateBio = (userId, bio) => {
	return (dispatch) => {
		return axios({
				method: "put",
				url: `${process.env.REACT_APP_API_URL}api/user/` +userId,
				data : {bio}
		})
		.then((res) =>{
			dispatch({type: UPDATE_BIO, payload:bio}) //payload : donnée qu'on envoie dans notre store
		})
			.catch((err) => console.log(err))
	};
};

export const deleteUser = (userId) => {
	return (dispatch) => {
		return axios({
			method: 'delete',
			url: `${process.env.REACT_APP_API_URL}api/user/` +userId,
		})
		.then((res) => {
			dispatch({
				type: DELETE_USER, payload: {userId}
			});
		})
		.catch((err) => console.log(err));
	}
};

export const followUser = (followerId, idToFollow) => {
	return (dispatch) => {
		return axios({
			method: "patch",
			url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
			data: { idToFollow },
		})
			.then((res) => {
				dispatch({ type: FOLLOW_USER, payload: { idToFollow } });//on envoie juste la modification visuel pour l'utilisateur actuel
			})
			.catch((err) => console.log(err));
	};
};

export const unfollowUser = (followerId, idToUnfollow) => {
	return (dispatch) => {
		return axios({
			method: "patch",
			url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
			data: { idToUnfollow },
		})
			.then((res) => {
				dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } });
			})
			.catch((err) => console.log(err));
	};
};