import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { Loader } from '../Loader/Loader';
import { UsersListItem } from './UsersListItem';
import { UserItem } from './UserItem';

import { Form, Button, Toast } from 'react-bootstrap';

export const UsersList = () => {
	const { loading, request } = useHttp();
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState();
	const [usersGroups, setUsersGroups] = useState([]);
	const [groups, setGroups] = useState([]);
	const [findUser, setFindUser] = useState('');
	const [showNotfindUser, setShowNotfindUser] = useState(false);
	const { token } = useContext(AuthContext);

	const getUsers = useCallback(async () => {
		try {
			const data = await request('/api/user', 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setUsers(data);
		} catch (e) {}
	}, [token, request]);

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	const getUsersGroups = useCallback(async () => {
		try {
			const data = await request(`/api/user_groups`, 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setUsersGroups(data);
		} catch (e) {}
	}, [token, request]);

	useEffect(() => {
		getUsersGroups();
	}, [getUsersGroups]);

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

	const getGroupName = (groupId) => {
		let group = [];

		groups.forEach((el) => {
			if (el._id === groupId) {
				group['name'] = el.name;
				group['description'] = el.description;
			}
		});
		return group;
	};

	const getUserGroups = (userId) => {
		const user_groups = usersGroups.find((group) => group.user_id === userId);
		const userGroupsArr = [];

		if (user_groups) {
			const { group_ids } = user_groups;
			group_ids.forEach((id) => {
				const group = getGroupName(id);
				userGroupsArr.push(group);
			});
		}

		return userGroupsArr;
	};

	/* const selectUserHandler = (event) => {
		const userId = event.target.closest('span').dataset.id;

		if (userId) {
			const filteredUser = users.find((user) => user._id === userId);

			if (filteredUser) setUser(filteredUser);
		}
	}; */

	const findUserHandler = (event) => {
		if (event.key === 'Enter' && findUser) {
			const filteredUser = users.find((user) => user.email.includes(findUser));

			if (filteredUser) {
				setUser(filteredUser);
				setFindUser('');
			} else {
				setUser(null);
				setShowNotfindUser(true);
			}
		}
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<div className="widget__wrapper has-shadow">
				<div className="widget__header">
					<Form.Group controlId="findByEmeil" className="form__find-user">
						<Form.Label>Найти пользователя по Email</Form.Label>
						<Form.Control
							type="text"
							name="find_by_emeil"
							value={findUser}
							onChange={(e) => setFindUser(e.target.value)}
							onKeyPress={findUserHandler}
						/>
					</Form.Group>
					<Toast
						style={{
							position: 'absolute',
							top: '30px',
							right: '30px',
							color: 'red',
							fontSize: '1rem',
							fontWeight: 500,
						}}
						onClose={() => setShowNotfindUser(false)}
						show={showNotfindUser}
						delay={3000}
						autohide
					>
						<Toast.Body>Пользователь не найден.</Toast.Body>
					</Toast>
				</div>
				<div className="widget__body">
					{user && <UserItem user={user} getUserGroups={getUserGroups} />}
					<UsersListItem users={users} getUserGroups={getUserGroups} />
				</div>
			</div>
		</>
	);
};
