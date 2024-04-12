import { GET_ALL_POSTS } from "../actions/post.actions";

const initialState = {};

export default function allPostsReducer(state = initialState, action){
	switch (action.type){
		case GET_ALL_POSTS:
			return action.payload //on retourne toute la data
		default:
			return state; //c'est un cas par défaut
	}
}