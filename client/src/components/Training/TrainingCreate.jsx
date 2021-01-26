import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import { Col, Form, Button } from 'react-bootstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const TrainingCreate = () => {
	const history = useHistory();
	const auth = useContext(AuthContext);
	const { loading, request } = useHttp();
	const [form, setForm] = useState({
		title: '',
		description: '',
	});
	const [editorState, setEditorState] = useState(() => {
		EditorState.createEmpty();
	});

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const onEditorStateChange = (editorState) => {
		setEditorState(editorState);
	};

	const saveHandler = async (event) => {
		const detailText = draftToHtml(
			convertToRaw(editorState.getCurrentContent()),
		);

		try {
			const data = await request(
				'/api/training/create',
				'POST',
				{ ...form, detail_text: detailText },
				{ Authorization: `Bearer ${auth.token}` },
			);
			history.push(`/training/${data.training._id}`);
		} catch (e) {}
	};

	return (
		<Col>
			<div className="widget__wrapper has-shadow">
				<div className="widget__body">
					<Form className="form__createTraining" onSubmit={saveHandler}>
						<Form.Group controlId="inputTitle" className="mb-3">
							<Form.Label>Заголовок</Form.Label>
							<Form.Control
								type="text"
								name="title"
								value={form.title}
								onChange={changeHandler}
							/>
						</Form.Group>
						<Form.Group controlId="inputDescription" className="mb-3">
							<Form.Label>Краткое описание</Form.Label>
							<Form.Control
								type="text"
								name="description"
								value={form.description}
								onChange={changeHandler}
							/>
						</Form.Group>
						<Form.Label>Описание</Form.Label>
						<Editor
							editorState={editorState}
							wrapperClassName="text-editor__wrapper"
							toolbarClassName="text-editor____toolbar"
							editorClassName="text-editor__editor"
							onEditorStateChange={onEditorStateChange}
						/>
						<Button
							className="btn btn-primary btn__gradient btn__grad-danger btn__sign-in"
							type="submit"
							disabled={loading}
						>
							Сохранить
						</Button>
					</Form>
				</div>
			</div>
		</Col>
	);
};
