import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';

import { Col, Form, Button } from 'react-bootstrap';

export const SubjectCreate = () => {
	const history = useHistory();
	const auth = useContext(AuthContext);
	const { request, loading } = useHttp();
	const [form, setForm] = useState({
		title: '',
		context: '',
		start_date: Date.now(),
	});
	const { trainingId, trainingTitle } = history.location;

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const saveHandler = async (event) => {
		try {
			const data = await request(
				'/api/subject/create',
				'POST',
				{ ...form, training_id: trainingId },
				{ Authorization: `Bearer ${auth.token}` },
			);
			history.push(`/training/${trainingId}`);
		} catch (e) {}
	};

	return (
		<Col>
			<div className="widget__wrapper has-shadow">
				<div className="widget__header">
					<h4 className="widget__title">
						Тема занятия для тренинга «{trainingTitle}»
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
							<Form.Label>Дата начала</Form.Label>
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
								Сохранить
							</Button>
							<Button
								variant="secondary"
								type="button"
								onClick={history.goBack}
							>
								Отменить
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</Col>
	);
};
