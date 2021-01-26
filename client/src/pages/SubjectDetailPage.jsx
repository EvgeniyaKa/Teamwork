import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { SubjectDetail } from '../components/Subject/SubjectDetail';
import { SubjectList } from '../components/Subject/SubjectList';
import { Loader } from '../components/Loader/Loader';

import { Col } from 'react-bootstrap';

export const SubjectDetailPage = (props) => {
	const subjectId = useParams().id;
	const [subject, setSubject] = useState();
	const [trainingId, setTrainingId] = useState();
	const [training, setTraining] = useState();
	const { loading, request } = useHttp();
	const { token } = useContext(AuthContext);

	const getSubject = useCallback(async () => {
		if (!subjectId) return;
		try {
			const data = await request(`/api/subject/${subjectId}`, 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setSubject(data);
			setTrainingId(data.training_id);
		} catch (e) {}
	}, [token, request, subjectId]);

	useEffect(() => {
		getSubject();
	}, [getSubject, subjectId]);

	const getTraining = useCallback(async () => {
		if (!trainingId) return;
		try {
			const data = await request(`/api/training/${trainingId}`, 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setTraining(data);
		} catch (e) {}
	}, [token, request, trainingId]);

	useEffect(() => {
		getTraining();
	}, [getTraining, trainingId]);

	if (loading || !subject || !training) {
		return <Loader />;
	}

	return (
		<Layout
			page={{
				name: String(training.title),
				title: `${training.title} - Education Online`,
			}}
			content={
				<>
					<Col xl={3}>
						<SubjectList
							trainingId={training._id}
							trainingTitle={training.title}
						/>
					</Col>
					<Col xl={9}>
						<SubjectDetail subject={subject} />
					</Col>
				</>
			}
		/>
	);
};
