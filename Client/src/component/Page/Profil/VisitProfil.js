import React from 'react';
import { connect } from 'react-redux';
import NavBarHome from '../../NavBar/NavBarHome';
import { getUsers } from "../../Utilitaire/actions/users.actions";

class VisitProfil extends React.Component {

	state = {
		user: null
	}

	async componentDidMount() { //Pour que les données aient le temps de charger on awai
		await this.props.getUsers();
		const userid = this.props.match.params.id
		const userdata = this.props.usersData.find(user => user._id === userid);
		this.setState({ user: userdata });
	}

	render() {
		const { user } = this.state;

		return (
			<div id='VisitProfil'>
				<NavBarHome/>
				{user == null ? (
					<h1>Utilisateur introuvable</h1>
				) : (
					<div className="update-container">
						<div className="center-part">
							<h1>{user.pseudo}</h1>
							<img src={process.env.PUBLIC_URL + user.picture.substring(1)} width="250px" height="250px" alt="user-pic"/>
							<div className='Bio'>
								<h2>Bio :</h2>
								<h3>{user.bio}</h3>
							</div>
							<h5>
								Abonnements : {user.following ? user.following.length : "0"}
							</h5>
							<h5>
								Abonnées : {user.followers? user.followers.length : "0"}
							</h5>
						</div>
					</div>
				)}
			</div>
		);
	};
}

const mapStateToProps = state => ({
	usersData: state.usersReducer
});

const mapDispatchToProps = { getUsers };

export default connect(mapStateToProps, mapDispatchToProps)(VisitProfil);