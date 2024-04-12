import axios from "axios";

//posts
export const GET_POSTS = "GET_POSTS"; //pour avoir les derniers posts --> permet le scrolling
export const GET_ALL_POSTS = "GET_ALL_POSTS";//on recupère TOUT les postes pour le trend 
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const FAKE_POST = "FAKE_POST";
export const UNFAKE_POST = "UNFAKE_POST";

//comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

//trends
export const GET_TRENDS = "GET_TRENDS";

//errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";

//posts

//pour afficher tout les posts
export const getPosts = (number) => { //number c'est pour le nombre  de poste qu'on affiche
	return (dispatch) => {
		return (axios)
			.get(`${process.env.REACT_APP_API_URL}api/post/`)
			.then((res) => {
				const array = res.data.slice(0, number) //a partir du premier élement jusqu'a number. On prend donc que 5 messages
				dispatch({ type: GET_POSTS, payload: array });
				dispatch({ type: GET_ALL_POSTS, payload: res.data});
			})
			.catch((err) => console.log(err));
	};
};

export const addPost = (posterId, message) => {
	return (dispatch) => {
		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_API_URL}api/post/`,
			data: { posterId, message }
		})
		.then((res) => {
			if (res.data.errors) {
				dispatch({ type: GET_POST_ERRORS, payload: res.data.errors })
			} else{
				dispatch({ type: GET_POST_ERRORS, payload: '' }); //s'il n'y a pas d'erreurs alors on met a vide
			}
		})
	};
}

export const likePost = (postId, userId) => {
	return (dispatch) => {
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
			data: { id: userId}
		})
		.then((res) => {
			dispatch({ type: LIKE_POST, payload: {postId, userId}});
		})
		.catch((err) => console.log(err));
	};
};

export const unlikePost = (postId, userId) => {
	return (dispatch) => {
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
			data: { id: userId}
		})
		.then((res) => {
			dispatch({ type: UNLIKE_POST, payload: {postId, userId}});
		})
		.catch((err) => console.log(err));
	};
};

export const updatePost = (postId, message) => {
	return (dispatch) => {
		return axios({
			method: 'put',
			url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
			data: {message},
		})
		.then((res) => {
			dispatch({
				type: UPDATE_POST, payload: {message, postId}
			});
		})
		.catch((err) => console.log(err));
	};
};

export const deletePost = (postId) => {
	return (dispatch) => {
		return axios({
			method: 'delete',
			url: `${process.env.REACT_APP_API_URL}api/post/${postId}`
		})
		.then((res) => {
			dispatch({
				type: DELETE_POST, payload: {postId}
			});
		})
		.catch((err) => console.log(err));
	};
}


//comments

export const addComment = (postId, commenterId, text, commenterPseudo) => {
	return (dispatch) => {
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
			data: {commenterId, text, commenterPseudo},
		})
		.then((res) => {
			dispatch({
				type: ADD_COMMENT, payload: {postId} 
			});
		})
		.catch((err) => console.log(err));
	}
}

export const editComment = (postId, commentId, text) => {
	return (dispatch) => {
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
			data: {commentId, text},
		})
		.then((res) => {
			dispatch({
				type: EDIT_COMMENT, payload: {postId, commentId, text}
			});
		})
		.catch((err) => console.log(err));
	}
}

export const deleteComment = (postId, commentId) => {
	return (dispatch) => {
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
			data: {commentId},
		})
		.then((res) => {
			dispatch({
				type: DELETE_COMMENT, payload: {postId, commentId}
			});
		})
		.catch((err) => console.log(err));
	}
}


export const getTrends = (sortedArray) => {
	return (dispatch) => {
		dispatch({ type: GET_TRENDS, payload: sortedArray});
	};
};

export const fakePost = (postId, userId) => {
	return (dispatch) => {
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/fake-post/` + postId,
			data: { id: userId}
		})
		.then((res) => {
			dispatch({ type: FAKE_POST, payload: {postId, userId}});
		})
		.catch((err) => console.log(err));
	}
}

export const unfakePost = (postId, userId) => {
	return (dispatch) => {
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/fake-post/` + postId,
			data: { id: userId}
		})
		.then((res) => {
			dispatch({ type: UNFAKE_POST, payload: {postId, userId}});
		})
		.catch((err) => console.log(err));
	}
}