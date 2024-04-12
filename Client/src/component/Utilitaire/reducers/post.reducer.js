import { 
	DELETE_COMMENT, 
	DELETE_POST, 
	EDIT_COMMENT, 
	GET_POSTS, 
	LIKE_POST, 
	UNLIKE_POST, 
	UPDATE_POST,
	FAKE_POST,
	UNFAKE_POST
} from "../actions/post.actions";

const initialState = {}; //quand on démarre un store, on commence toujours avec un  initialState = vide

export default function postReducer(state = initialState, action){
	switch(action.type){
		case GET_POSTS:
			return action.payload; //on lui passe toute la data vu qu'on veut envoyer toute les données
		
		case LIKE_POST:
			return state.map((post) => {
				if (post._id === action.payload.postId) { //on va identifier le message en question
					return {
						...post, //on retourne le post 
						likers: [action.payload.userId, ...post.likers] // on rajoute le like dans le tableau des likes -> store
					};
				}
				return post;
			})
			
		case UNLIKE_POST:
			return state.map((post) => {
				if (post._id === action.payload.postId) {
					return {
						...post,
						likers: post.likers.filter((id) => id !== action.payload.userId) //si l'id n'est pas égale userId alors on retire du tableau
					}
				}
				return post; //pour retourner ce qu'on a changé
			})
		
		case UPDATE_POST:
			return state.map((post) => {
				if (post._id === action.payload.postId){
					return {
						...post,
						message: action.payload.message
					};
				} return post; 
			})

		case DELETE_POST:
			return state.filter((post) => post._id !== action.payload.postId);

		case EDIT_COMMENT:
			return state.map((post) => {
				if(post._id === action.payload.postId){
					return {
						...post,
						comments: post.comments.map((comment) => {
							if (comment._id === action.payload.commentId){
								return {
									...comment,
									text: action.payload.text
								}
							}else{
								return comment;
							}
						})
					}
				} else return post;
			})
			
		case DELETE_COMMENT:
			return state.map((post) => {
				if(post._id === action.payload.postId){
					return {
						...post,
						comments: post.comments.filter((comment) => comment._id !== action.payload.commentId)
					}
				}else{
					return post;
				}
			})

		case FAKE_POST:
			return state.map((post) => {
				if (post._id === action.payload.postId) { //on va identifier le message en question
					return {
						...post, //on retourne le post 
						fake: [action.payload.userId, ...post.fake] // on rajoute le like dans le tableau des likes -> store
					};
				}
				return post;
			})

		case UNFAKE_POST:
			return state.map((post) => {
				if (post._id === action.payload.postId) {
					return {
						...post,
						fake: post.fake.filter((id) => id !== action.payload.userId) //si l'id n'est pas égale userId alors on retire du tableau
					}
				}
				return post; //pour retourner ce qu'on a changé
			})
		default:
			return state;
	}
}