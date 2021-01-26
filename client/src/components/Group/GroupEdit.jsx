import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { GroupTimetable } from './GroupTimetable';
import { Loader } from '../Loader/Loader';

import { Form, Button } from 'react-bootstrap';

export const GroupEdit = (props) => {
	const groupId = useParams().id;
	const [group, setGroup] = useState();
	const [users, setUsers] = useState();
	const { loading, request } = useHttp();
	const { token } = useContext(AuthContext);
	const [form, setForm] = useState({
		name: '',
		description: '',
		training_id: '',
		teacher_id: '',
		students_ids: '',
	});

	const getGroup = useCallback(async () => {
		if (!groupId) return;
		try {
			const data = await request(`/api/group/${groupId}`, 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setGroup(data);
			setForm({
				name: data.name,
				description: data.description,
				training_id: data.training_id._id,
				teacher_id: data.teacher_id._id,
			});
		} catch (e) {}
	}, [token, request, groupId]);

	useEffect(() => {
		getGroup();
	}, [getGroup, groupId]);

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

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const saveHandler = async (event) => {
		event.preventDefault();

		try {
			/* const data = await request(
				'/api/group/create',
				'POST',
				{ ...form },
				{ Authorization: `Bearer ${token}` },
			); */
			//if (data) history.push(`/group/${data._id}`);
		} catch (e) {}
	};

	if (loading || !group || !users) {
		return <Loader />;
	}

	return (
		<>
			<div className="widget__wrapper has-shadow">
				<div className="widget__header">
					<h4 className="widget__title">
						Группа: {group.name} | {group.training_id.title}
					</h4>
				</div>
				<div className="widget__body">
					<Form className="form__editGroup">
						<Form.Group controlId="inputSetTeacher" className="mb-3">
							<Form.Label>Преподаватель</Form.Label>
							<Form.Control
								as="select"
								name="teacher_id"
								value={form.teacher_id}
								onChange={changeHandler}
							>
								<option value="">Выберите преподавателя</option>
								{users.length &&
									users.map((el, i) => {
										if (el.roles.includes('teacher'))
											return (
												<option key={i} value={el._id}>
													{el.name}
												</option>
											);

										return null;
									})}
							</Form.Control>
						</Form.Group>
						<Form.Group controlId="inputName" className="mb-3">
							<Form.Label>Название группы</Form.Label>
							<Form.Control
								type="text"
								name="name"
								value={form.name}
								onChange={changeHandler}
							/>
						</Form.Group>
						<Form.Group controlId="inputDescription" className="mb-3">
							<Form.Label>Описание группы</Form.Label>
							<Form.Control
								type="text"
								name="description"
								value={form.description}
								onChange={changeHandler}
							/>
							<Form.Text muted>
								Развернутое описание группы для преподавателей и кураторов. Не
								доступно студентам.
							</Form.Text>
						</Form.Group>
						<Button
							className="btn btn-primary btn__gradient btn__grad-danger btn__sign-in"
							type="submit"
							onClick={saveHandler}
							disabled={loading}
						>
							Сохранить
						</Button>
					</Form>
				</div>
			</div>
			<div className="widget__wrapper has-shadow">
				<div className="widget__header">
					<h4 className="widget__title">Расписание занятий</h4>
				</div>
				<div className="widget__body">
					<GroupTimetable
						groupId={group._id}
						timetableId={group.timetable_id}
					/>
				</div>
			</div>
			<div className="widget__wrapper has-shadow">
				<div className="widget__header">
					<h4 className="widget__title">Студенты</h4>
				</div>
				<div className="widget__body">
					<div className="table-responsive">
						<table className="table table-hover mb-0">
							<thead>
								<tr>
									<th>Имя</th>
									<th>Email</th>
									<th>Действия</th>
								</tr>
							</thead>
							<tbody>
								{group.students_ids.map((user) => {
									return (
										<tr key={user._id}>
											<td>{user.name}</td>
											<td>{user.email}</td>
											<td className="td-actions">
												<Link
													to={`/user/edit/${user._id}`}
													className="td-actions__link"
													title="Редактировать"
												>
													<i className="la la-edit edit"></i>
												</Link>
												<span
													className="td-actions__link"
													title="Удалить"
													data-id={user._id}
												>
													<i className="la la-close delete"></i>
												</span>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};
