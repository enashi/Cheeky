import {
	FOLLOW_USER,
	GET_USER,
	UNFOLLOW_USER,
	UPDATE_BIO,
	DELETE_USER,
	UPLOAD_PICTURE,
} from "../actions/user.actions";
	
const initialState = {}; //Quand on va demander de la data, on va voir en premier lieu la db, puis on va la sotcker -> plus besoin à la db
	
export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER:
			return action.payload; //Toute la data de res.data qui à été envoyé avec action.payload on incrémente notre initialState

		case UPLOAD_PICTURE:
			return {
				...state, //pour eviter d'écraser les données
				picture: action.payload,
			};

		case UPDATE_BIO:
			return {
				...state,
				bio: action.payload,
			};

		case DELETE_USER:
			return state.filter((user) => user._id !== action.payload.userId);

		case FOLLOW_USER:
			return {
				...state,
				following: [action.payload.idToFollow, ...state.following], //on recupère la suite de notre tableau pour pas écraser ce qu'on avait avant
			};
				
		case UNFOLLOW_USER:
			return {
				...state,
				following: state.following.filter((id) => id !== action.payload.idToUnfollow),
			};
		default:
			return state;
	}
}
	