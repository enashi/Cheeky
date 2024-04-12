import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './component/Utilitaire/index.css';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './component/Utilitaire/reducers';
import { getUsers } from './component/Utilitaire/actions/users.actions';
import { getPosts } from './component/Utilitaire/actions/post.actions';

//Ce qui aide pour faire du Redux, création de notre store
import { composeWithDevTools} from 'redux-devtools-extension';

import thunk from 'redux-thunk'; //middleware qui permet de faire des requetes asynchrones avec redux

const store = createStore(
	rootReducer, composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers());
store.dispatch(getPosts());

ReactDOM.render(
	<Provider store ={store}>
		<App />
		</Provider>,
	document.getElementById('root')
);