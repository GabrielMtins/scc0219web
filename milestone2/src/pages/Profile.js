import '../palette.css';
import './Home.css';
import './Profile.css'

import { useNavigate } from 'react-router-dom';
import { useLogin } from '../contexts/LoginContext';
import { useState, useEffect } from 'react';

function ProfilePage() {
	const {user, login, loading} = useLogin();
	const navigate = useNavigate();
	const username = user === null ? "teste" : user.username;
	const fullname = user === null ? "user.fullname" : user.fullname;

	useEffect(() => {
		if(user == null){
			navigate('/login');
		}
		else if(user.username == "admin"){
			navigate('/admin');
		}
	});

	return (
		<div className="page">
			<div className="main-content">
				<br />
				<div className="profile-class">
					<h1> Nome </h1>
					<p> {fullname} </p>
					<br />
				</div>

				<br />

				<div className="profile-class">
					<h1> Nome de usuário </h1>
					<p> {username} </p>
					<br />
				</div>
			</div>
		</div>
	);
}

export default ProfilePage;
