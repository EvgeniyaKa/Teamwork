import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';

import { Form, Button } from 'react-bootstrap';

export const UserCreate = () => {
	const { loading, request } = useHttp();
	const { token } = useContext(AuthContext);
	const [groups, setGroups] = useState([]);
	const [user, setUser] = useState();
	const [userAddGroup, setUserAddGroup] = useState();
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		roles: '',
	});

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

	const getUser = useCallback(
		async (userId) => {
			try {
				const data = await request(`/api/user/${userId}`, 'GET', null, {
					Authorization: `Bearer ${token}`,
				});

				setUser(data);
			} catch (e) {}
		},
		[request, token],
	);

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const registerHandler = useCallback(async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {
				...form,
			});

			if (data && data.userId) {
				setForm({
					name: '',
					email: '',
					password: '',
				});
			}
			getUser(data.userId);
			//auth.login(data.token, data.userId);
		} catch (e) {}
	}, [request, form, getUser]);

	const addUserToGroupHandler = (event) => {
		setUserAddGroup(event.target.value);
	};

	return (
		<div className="widget__wrapper has-shadow">
			<div className="widget__body">
				{user && <h4 className="widget__title mb-4">Пользователь добавлен</h4>}
				<Form className="form__create-user">
					<Form.Group controlId="inputName" className="mb-3">
						<Form.Label>Имя</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={form.name}
							onChange={changeHandler}
						/>
					</Form.Group>
					<Form.Group controlId="inputEmail" className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							name="email"
							value={form.email}
							onChange={changeHandler}
						/>
					</Form.Group>
					<Form.Group controlId="inputPassword" className="mb-3">
						<Form.Label>Пароль</Form.Label>
						<Form.Control
							type="password"
							name="password"
							value={form.password}
							onChange={changeHandler}
						/>
					</Form.Group>
					<Form.Group controlId="inputAddRole" className="mb-3">
						<Form.Label>Установить роль пользователя</Form.Label>
						<Form.Control
							as="select"
							name="roles"
							value={form.roles}
							onChange={changeHandler}
						>
							<option value="">Выберите роль пользователя</option>
							<option value="admin">Администратор</option>
							<option value="teacher">Преподаватель</option>
							<option value="curator">Куратор</option>
							<option value="student">Студент</option>
						</Form.Control>
					</Form.Group>
					<Form.Group controlId="inputEditGroup" className="mb-3">
						<Form.Label>Добавить пользователя в группу</Form.Label>
						<Form.Control
							as="select"
							name="user_groups"
							value={userAddGroup}
							onChange={addUserToGroupHandler}
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
						onClick={registerHandler}
						disabled={loading}
					>
						Добавить пользователя
					</Button>
				</Form>
			</div>
		</div>
	);
};
