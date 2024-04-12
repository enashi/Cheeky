import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../../Utilitaire/Util';
import Follow from './Follow';
import { Link } from 'react-router-dom';

const FriendsHint = () => {
	const [playOnce, setPlayOnce] = useState(true);
	const [friendsHint, setFriendsHint] = useState([]);
	const userData = useSelector((state) => state.userReducer);
	const usersData = useSelector((state) => state.usersReducer);

	useEffect(() => {
		const notFriendsList = () => {
			let array = [];
			usersData.map((user) => {
				if(user._id !== userData._id && !user.followers.includes(userData._id)){
					return array.push(user._id);
				}
				else return null
			});
			array.sort(() => 0.5 - Math.random());
			if (window.innerHeight > 780) {
				array.length = 5;
			} else if (window.innerHeight > 720) {
				array.length = 4;
			} else if (window.innerHeight > 615) {
				array.length = 3;
			} else if (window.innerHeight > 540) {
				array.length = 1;
			} else {
				array.length = 0;
			}
			setFriendsHint(array);
		}

		if(playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
			notFriendsList();
			setPlayOnce(false);
		} 
	}, [usersData, userData, playOnce])

	return (
		<div className="get-friends-container">
			<h4>Suggestions</h4>
			<ul>
				{friendsHint &&
					friendsHint.map((user) => {
						for (let i = 0; i < usersData.length; i++) {
							if (user === usersData[i]._id) {
								return (
									<li className="user-hint" key={user}>
										<Link exact to={'/visitprofil/'+ usersData[i]._id}>
											<img src={usersData[i].picture} width="100px" height="100px" alt="user-pic" />
										</Link>
										<Link exact to={'/visitprofil/'+ usersData[i]._id}>
											<p>{usersData[i].pseudo}</p>
										</Link>
										<Follow
											idToFollow={usersData[i]._id}
											type={"suggestion"}
										/>
									</li>
								);
							}
						}
						return null
					})
				}
			</ul>
		</div>
	);
};

export default FriendsHint;