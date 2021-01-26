import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

export const SubjectList = ({ trainingId, trainingTitle }) => {
	const today = new Date();
	const [subjects, setSubjects] = useState();
	const { loading, request } = useHttp();
	const { token } = useContext(AuthContext);

	const getSubjects = useCallback(
		async (trainingId) => {
			if (!trainingId) return;
			try {
				const data = await request(
					`/api/subject/training/${trainingId}`,
					'GET',
					null,
					{
						Authorization: `Bearer ${token}`,
					},
				);

				data.sort((a, b) => {
					if (a.start_date > b.start_date) {
						return 1;
					}
					if (a.start_date < b.start_date) {
						return -1;
					}

					return 0;
				});

				setSubjects(data);
			} catch (e) {}
		},
		[token, request],
	);

	useEffect(() => {
		getSubjects(trainingId);
	}, [getSubjects, trainingId]);

	if (loading || !subjects) {
		return <Loader />;
	}

	if (!subjects.length) {
		return (
			<>
				<div className="widget__header">
					<h4 className="widget__title">Программа тренинга</h4>
				</div>
				<div className="widget__body">
					<Link
						className="btn btn-primary"
						to={{
							pathname: '/subject/create',
							trainingId,
							trainingTitle,
						}}
					>
						Create Subject
					</Link>
				</div>
			</>
		);
	}

	return (
		<div className="widget__wrapper has-shadow">
			<div className="widget__header">
				<h4 className="widget__title">Программа</h4>
			</div>
			<div className="widget__body">
				<ol className="subject__list">
					{subjects.map((el, i) => {
						return (
							<li
								className={`subject__item${
									today >= new Date(el.start_date) ? ' active' : ''
								}`}
								key={i}
							>
								<span className="subject__date">
									{new Date(el.start_date).toLocaleDateString()}
								</span>
								<Link to={`/subject/${el._id}`} className="subject__title">
									{el.title}
								</Link>
								<Link
									to={`/subject/edit/${el._id}`}
									className="td-actions__link"
								>
									<i className="la la-edit edit"></i>
								</Link>
							</li>
						);
					})}
				</ol>
				{subjects.length && (
					<Link
						className="btn btn-primary"
						to={{
							pathname: '/subject/create',
							trainingId,
							trainingTitle,
						}}
					>
						Add Subject
					</Link>
				)}
			</div>
		</div>
	);
};
