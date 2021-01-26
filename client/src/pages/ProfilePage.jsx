import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader/Loader';
import { Layout } from '../components/Layout/Layout';
import { Profile } from '../components/Profile/Profile';
import { ProfileSetting } from '../components/Profile/ProfileSetting';

import { Col } from 'react-bootstrap';

export const ProfilePage = () => {
	const [user, setUser] = useState(true);
	const { loading, request } = useHttp();
	const { token, userId } = useContext(AuthContext);

	const getUser = useCallback(async () => {
		try {
			const data = await request(`/api/user/${userId}`, 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setUser(data);
		} catch (e) {}
	}, [token, request, userId]);

	useEffect(() => {
		getUser();
	}, [getUser]);

	return (
		<Layout
			page={{
				name: 'Профиль',
				title: 'Профиль - MyNewLife club',
			}}
			content={
				<>
					{(loading || !user) && <Loader />}
					{!loading && user && (
						<>
							<Col xl={3}>
								<div className="widget__wrapper widget__profile has-shadow">
									<Profile user={user} />
								</div>
							</Col>
							<Col xl={9}>
								<div className="widget__wrapper has-shadow">
									<div className="widget__header">
										<h4 className="widget__title">Update Profile</h4>
									</div>
									<ProfileSetting user={user} />
								</div>
							</Col>
						</>
					)}
				</>
			}
		/>
	);
};
