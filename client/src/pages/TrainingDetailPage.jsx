import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { Loader } from '../components/Loader/Loader';
import { SubjectList } from '../components/Subject/SubjectList';

import { Col } from 'react-bootstrap';

export const TrainingDetailPage = () => {
	const trainingId = useParams().id;
	const [training, setTraining] = useState([]);
	const { loading, request } = useHttp();
	const { token } = useContext(AuthContext);

	const getTraining = useCallback(async () => {
		try {
			const data = await request(`/api/training/${trainingId}`, 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setTraining(data);
		} catch (e) {}
	}, [token, request, trainingId]);

	useEffect(() => {
		getTraining();
	}, [getTraining]);

	return (
		<Layout
			page={{
				name: String(training.title),
				title: `${training.title} - MyNewLife club`,
			}}
			content={
				<>
					{(loading || !training) && <Loader />}
					{!loading && training && (
						<>
							<Col xl={3}>
								<SubjectList
									trainingId={training._id}
									trainingTitle={training.title}
								/>
							</Col>
							<Col xl={9}>
								<div className="widget__wrapper has-shadow">
									<div className="widget__header">
										<h4 className="widget__title">Описание тренинга</h4>
									</div>
									<div className="widget__body">
										<p className="font-italic">{training.description}</p>
										<div
											dangerouslySetInnerHTML={{ __html: training.detail_text }}
										/>
									</div>
								</div>
							</Col>
						</>
					)}
				</>
			}
		/>
	);
};
