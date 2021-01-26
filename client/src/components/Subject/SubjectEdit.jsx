import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';

import { Col, Form, Button } from 'react-bootstrap';

export const SubjectEdit = (props) => {
	const subjectId = useParams().id;
	const history = useHistory();
	const { token } = useContext(AuthContext);
	const { request, loading } = useHttp();
	const [subject, setSubject] = useState();
	const [training, setTraining] = useState([]);
	const [form, setForm] = useState({
		title: '',
		context: '',
		start_date: '',
	});

	const getSubject = useCallback(async () => {
		try {
			const data = await request(
				`/api/subject/edit/${subjectId}`,
				'GET',
				null,
				{ Authorization: `Bearer ${token}` },
			);
			setSubject(data);
		} catch (e) {}
	}, [token, request, subjectId]);

	useEffect(() => {
		getSubject();
	}, [getSubject]);

	useEffect(() => {
		if (subject)
			setForm({
				title: subject.title,
				context: subject.context,
				start_date: subject.start_date,
			});
	}, [subject]);

	const getTraining = useCallback(async () => {
		if (!subject) return;
		try {
			const data = await request(
				`/api/training/${subject.training_id}`,
				'GET',
				null,
				{
					Authorization: `Bearer ${token}`,
				},
			);
			setTraining(data);
		} catch (e) {}
	}, [token, request, subject]);

	useEffect(() => {
		getTraining();
	}, [getTraining]);

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const saveHandler = useCallback(async () => {
		try {
			await request(
				`/api/subject/edit/${subjectId}`,
				'PUT',
				{ ...form, training_id: subject.training_id },
				{ Authorization: `Bearer ${token}` },
			);
			history.push(`/training/${subject.training_id}`);
		} catch (e) {}
	}, [request, form, history, subject, subjectId, token]);

	const deleteHandler = useCallback(async () => {
		try {
			const data = await request(
				`/api/subject/delete/${subject._id}`,
				'DELETE',
				null,
				{
					Authorization: `Bearer ${token}`,
				},
			);
			history.goBack();
		} catch (e) {
			console.log('ERROR: ', e);
		}
	}, [request, token, subject, history]);

	return (
		<Col>
			<div className="widget__wrapper has-shadow">
				<div className="widget__header">
					<h4 className="widget__title">
						Редактирование темы занятия для тренинга «{training.title}»
					</h4>
				</div>
				<div className="widget__body">
					<Form className="form__createTraining">
						<Form.Group controlId="inputTitle" className="mb-3">
							<Form.Label>Название темы</Form.Label>
							<Form.Control
								type="text"
								name="title"
								value={form.title}
								onChange={changeHandler}
							/>
						</Form.Group>
						<Form.Group controlId="inputStartDate" className="mb-3">
							<Form.Label>
								Дата начала: {new Date(form.start_date).toLocaleDateString()}
							</Form.Label>
							<Form.Control
								type="date"
								name="start_date"
								value={form.start_date}
								onChange={changeHandler}
							/>
						</Form.Group>
						<Form.Group controlId="inputContext" className="mb-3">
							<Form.Label>Текст занятия</Form.Label>
							<Form.Control
								type="text"
								name="context"
								value={form.context}
								onChange={changeHandler}
							/>
						</Form.Group>
						<div className="btn__group">
							<Button
								className="btn btn-primary btn__gradient btn__grad-danger"
								type="submit"
								onClick={saveHandler}
								disabled={loading}
							>
								Сохранить изменения
							</Button>
							<Button
								variant="secondary"
								type="button"
								onClick={history.goBack}
							>
								Отменить
							</Button>
							<Button
								variant="secondary"
								type="delete"
								className="ml-5"
								onClick={deleteHandler}
							>
								Удалить
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</Col>
	);
};
