import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { Loader } from '../Loader/Loader';
import { getGroupName } from '../../utils/getGroupName';

import { Form, Button } from 'react-bootstrap';

export const UserEdit = () => {
	const userId = useParams().id;
	const { loading, request } = useHttp();
	const { token } = useContext(AuthContext);
	const [user, setUser] = useState();
	const [userAddRole, setUserAddRole] = useState();
	const [userGroups, setUserGroups] = useState();
	const [groups, setGroups] = useState([]);
	const [userAddGroup, setUserAddGroup] = useState('');
	const [userRemoveGroup, setUserRemoveGroup] = useState('');

	const getUser = useCallback(async () => {
		try {
			const data = await request(`/api/user/${userId}`, 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setUser(data);
		} catch (e) {}
	}, [request, token, userId]);

	useEffect(() => {
		getUser();
	}, [getUser]);

	const getUserGroups = useCallback(async () => {
		try {
			const data = await request(`/api/user_groups/${userId}`, 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setUserGroups(data);
		} catch (e) {}
	}, [token, request, userId]);

	useEffect(() => {
		getUserGroups();
	}, [getUserGroups]);

	const getGroups = useCallback(async () => {
		try {
			const data = await request(`/api/group`, 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setGroups(data);
		} catch (e) {}
	}, [token, request]);

	useEffect(() => {
		getGroups();
	}, [getGroups]);

	const changeUserRole = useCallback(
		async (role) => {
			try {
				const data = await request(
					`/api/user/change/${user._id}`,
					'PUT',
					{ role },
					{
						Authorization: `Bearer ${token}`,
					},
				);
				console.log(data);
				if (data) {
					getUser();
					setUserAddRole();
				}
			} catch (e) {}
		},
		[token, request, user],
	);

	const changeUserGroups = useCallback(
		async (groupId) => {
			try {
				const data = await request(
					`/api/user_groups/change`,
					'PUT',
					{
						user_id: user._id,
						group_id: groupId,
					},
					{
						Authorization: `Bearer ${token}`,
					},
				);
				if (data) {
					getUserGroups();
					setUserAddGroup('');
				}
			} catch (e) {}
		},
		[token, request, user],
	);

	const userAddRoleHandler = (event) => {
		setUserAddRole(event.target.value);
	};

	const updateUserRolesHandler = (event) => {
		event.preventDefault();

		if (userAddRole) {
			changeUserRole(userAddRole);
		}
	};

	const addUserToGroupHandler = (event) => {
		setUserAddGroup(event.target.value);
	};

	const removeUserFromGroup = (event) => {
		setUserRemoveGroup(event.target.value);
	};

	const updateUserGroupsHandler = (event) => {
		event.preventDefault();

		if (userAddGroup) {
			changeUserGroups(userAddGroup);
		}
	};

	if (loading || !user || !groups) {
		return <Loader />;
	}

	return (
		<div className="widget__wrapper widget__user--update has-shadow">
			<div className="widget__header">
				<h4 className="widget__title">Редактировать пользователя</h4>
			</div>
			<div className="widget__body">
				{user && (
					<div className="table-responsive mb-3">
						<table className="table table-hover mb-0">
							<thead>
								<tr>
									<th>Имя</th>
									<th>Email</th>
									<th>Роли</th>
									<th>Группы</th>
									<th>Действия</th>
								</tr>
							</thead>
							<tbody>
								<tr key={user._id}>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>
										{user.roles.length > 0 &&
											user.roles.map((el, i) => {
												if (el !== 'all') {
													return (
														<span key={i} className="d-block mb-2">
															{el}
														</span>
													);
												}
											})}
									</td>
									<td>
										{userGroups &&
											userGroups.group_ids.map((el, i) => {
												const group = getGroupName(el, groups);

												return (
													<span
														key={i}
														title={group.description}
														className="d-block mb-2"
													>
														{group.name}
													</span>
												);
											})}
									</td>
									<td className="td-actions">
										<span
											className="td-actions__link"
											title="Удалить"
											data-id={user._id}
										>
											<i className="la la-close delete"></i>
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}
				<Form className="form__changeUserRole">
					<Form.Group controlId="inputAddRole" className="mb-3">
						<Form.Label>Установить роль пользователя</Form.Label>
						<Form.Control
							as="select"
							name="roles"
							value={userAddRole}
							onChange={userAddRoleHandler}
						>
							<option value="">Выберите роль пользователя</option>
							<option value="admin">Администратор</option>
							<option value="teacher">Преподаватель</option>
							<option value="curator">Куратор</option>
							<option value="student">Студент</option>
						</Form.Control>
					</Form.Group>
					<Button
						className="btn btn-primary btn__gradient btn__grad-danger btn__sign-in"
						type="submit"
						disabled={loading}
						onClick={updateUserRolesHandler}
					>
						Сохранить изменения
					</Button>
				</Form>
				<Form className="form__createGroup">
					<Form.Group controlId="inputEditGroup" className="mb-3">
						<Form.Label>Добавить пользователя в группу</Form.Label>
						<Form.Control
							as="select"
							name="user_groups"
							value={userAddGroup}
							onChange={addUserToGroupHandler}
						>
							<option value="">Выберите группу</option>
							{groups &&
								groups.length > 0 &&
								groups.map((el, i) => {
									return (
										<option key={i} value={el._id}>
											{el.name}
										</option>
									);
								})}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId="inputGroup" className="mb-3">
						<Form.Label>Удалить пользователя из группы</Form.Label>
						<Form.Control
							as="select"
							name="user_groups"
							onChange={removeUserFromGroup}
						>
							<option value="">Выберите группу</option>
							{groups.map((el, i) => {
								return (
									<option key={i} value={el._id}>
										{el.name}
									</option>
								);
							})}
						</Form.Control>
					</Form.Group>
					<Button
						className="btn btn-primary btn__gradient btn__grad-danger btn__sign-in"
						type="submit"
						disabled={loading}
						onClick={updateUserGroupsHandler}
					>
						Сохранить изменения
					</Button>
				</Form>
			</div>
		</div>
	);
};
