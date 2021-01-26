import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { Loader } from '../Loader/Loader';
import { GroupsListItem } from './GroupsListItem';

export const GroupsList = () => {
	const { loading, request } = useHttp();
	const [teachers, setTeachers] = useState();
	const [groups, setGroups] = useState();
	const [trainings, setTrainings] = useState();
	const { token } = useContext(AuthContext);

	const getUsers = useCallback(async () => {
		try {
			const data = await request('/api/user', 'GET', null, {
				Authorization: `Bearer ${token}`,
			});

			const teachers = data.filter((user) => user.roles.includes('teacher'));
			setTeachers(teachers);
		} catch (e) {}
	}, [token, request]);

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	const getGroups = useCallback(async () => {
		try {
			const data = await request('/api/group', 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setGroups(data);
		} catch (e) {}
	}, [token, request]);

	useEffect(() => {
		getGroups();
	}, [getGroups]);

	const getTrainings = useCallback(async () => {
		try {
			const data = await request('/api/training', 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setTrainings(data);
		} catch (e) {}
	}, [token, request]);

	useEffect(() => {
		getTrainings();
	}, [getTrainings]);

	if (loading || !groups || !teachers || !trainings) {
		return <Loader />;
	}

	return (
		<div className="widget__wrapper has-shadow">
			<div className="widget__body">
				<GroupsListItem
					groups={groups}
					teachers={teachers}
					trainings={trainings}
				/>
			</div>
		</div>
	);
};
