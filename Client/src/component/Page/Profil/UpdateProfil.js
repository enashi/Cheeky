import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import UploadImg from './UploadImg';
import { updateBio } from '../../Utilitaire/actions/user.actions';
import { dateParser, isEmpty } from '../../Utilitaire/Util';
import Follow from './Follow';
import Card from "../Post/Card";
import { UidContext } from "../../AppContext";
import NavBarProfil from '../../NavBar/NavBarProfil';
import { Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';

const UpdateProfil = () => {
	const uid = useContext(UidContext);

	const userData = useSelector((state) => state.userReducer);
	const usersData = useSelector((state) => state.usersReducer);
	const error = useSelector((state) => state.errorReducer.userError);
	const posts = useSelector((state) => state.allPostsReducer);

	const [bio, setBio] = useState('');
	const [updateForm, setUpdateForm] = useState(false); //quand on clique sur la bio pour modifier, alors il devient true, et devient un input text
	const dispatch = useDispatch();

	const [followingPopup, setFollowingPopup] = useState(false);
	const [followersPopup, setFollowersPopup] = useState(false);

	const handleUpdate = () => {
		dispatch(updateBio(userData._id, bio));
		setUpdateForm(false);
	}

	return (
		<div className="profil-container">
			<NavBarProfil />
			<div id="Profil">
					<h1>{userData.pseudo}</h1>
					<h5>Membre depuis le : {dateParser(userData.createdAt)}</h5>
				<div className="update-container">
					<div className="center-part">
						<img src={userData.picture} width="70px" height="70px" alt="user-pic" />
						<UploadImg />
						<p>{error.maxSize}</p>
						<p>{error.format}</p>
						<div className="bio-update">
							<br/>
							<h3>Bio</h3>
							{updateForm === false && (
								<>
									<p onClick={() => setUpdateForm(!updateForm)} >{userData.bio}</p>
									<button onClick={() => setUpdateForm(!updateForm)}>Modifier</button>
								</>
							)}
							{updateForm && (
								<>
									<textarea
										type="text"
										defaultValue={userData.bio}
										onChange={(e) => setBio(e.target.value)}>
									</textarea>
									<button onClick={handleUpdate}>Ok ?</button>
								</>
							)}
						</div>
						<br /><br />
						<h5 onClick={() => setFollowingPopup(true)}>
							Abonnements : {userData.following ? userData.following.length : "0"}
						</h5>
						<h5 onClick={() => setFollowersPopup(true)}>
							Abonées : {userData.followers ? userData.followers.length : "0"}
						</h5>
					</div>
				</div>
				{followingPopup && (
					<div className="popup-profil-container">
						<div className="modal">
							<h3>Abonnements</h3>
							<span className="cross" onClick={() => setFollowingPopup(false)}>
								&#10005;
							</span>
							<ul>
								{usersData.map((user) => {
									for (let i = 0; i < userData.following.length; i++) {
										if (user._id === userData.following[i]) {
											return (
												<li key={user._id}>
													<Link exact to={'/visitprofil/'+ user._id}>
														<img src={user.picture} width="70px" height="70px" alt="user-pic" />
													</Link>
													<Link exact to={'/visitprofil/'+ user._id}>
														<h4>{user.pseudo}</h4>
													</Link>
													<div className="follow-handler">
														<Follow idToFollow={user._id} type={'suggestion'} />
													</div>
												</li>
											);
										}
									}
									return null;
								})}
							</ul>
						</div>
					</div>
				)}
				{followersPopup && (
					<div className="popup-profil-container">
						<div className="modal">
							<h3>Abonnés</h3>
							<span className="cross" onClick={() => setFollowersPopup(false)}>
								&#10005;
							</span>  
							<ul>
								{usersData.map((user) => {
									for (let i = 0; i < userData.followers.length; i++) {
										if (user._id === userData.followers[i]) {
											return (
												<li key={user._id}>
													<Link exact to={'/visitprofil/'+ user._id}>
														<img src={user.picture} width="70px" height="70px" alt="user-pic" />
													</Link>
													<Link exact to={'/visitprofil/'+ user._id}>
														<h4>{user.pseudo}</h4>
													</Link>
													<div className="follow-handler">
														<Follow idToFollow={user._id} type={'suggestion'} />
													</div>
												</li>
											);
										}
									}
									return null;
								})}
							</ul>
						</div>
					</div>
				)}
				<br/><br/>

				<div className='profil-post'>
					<ul>
						{!isEmpty(posts[0]) && posts.map((post) => {
							if (uid === post.posterId) {
								return (
									<Card post={post} key={post._id} />
								);
							}
							else return null
						})}
					</ul>
				</div>
				<h2>
					Supprimer compte ?
				</h2>
				<DeleteUser id={userData._id}/>
			</div>
		</div>
	);
};

export default UpdateProfil;