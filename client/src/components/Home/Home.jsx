import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { Loader } from '../Loader/Loader';

import { Form, Button, Card } from 'react-bootstrap';

export const Home = () => {
	const { loading, request } = useHttp();
	const { token } = useContext(AuthContext);
	const [trainings, setTrainings] = useState();
	const getTrainings = useCallback(async () => {
		try {
			const data = await request('/api/training', 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setTrainings(data);
		} catch (e) {}
	}, [token, request]);

	useEffect(() => {
		getTrainings();
	}, [getTrainings]);

	if (loading || !trainings) {
		return <Loader />;
	}

	return (
		<>
			<div className="widget__wrapper has-shadow">
				<div className="widget__header">Добро пожаловать!</div>
				<div className="widget__body home">
					
					{trainings.length && 
					trainings.map((train, i) => {
						return (
						<Card key={i} style={{ width: '18rem' }} className="card_margin">
					 	<Card.Img variant="top" src="https://via.placeholder.com/286px180" />
					 	<Card.Body>
					 		<Card.Title>{train.title}</Card.Title>
					 		<Card.Text>{train.description.substr(0, 75) + ' ...'}</Card.Text>
						<Link to={`/training/${train._id}`}><Button variant="primary">Записаться</Button></Link>
					 	</Card.Body>
					 </Card> 					 
					)
					})}
				</div>
			</div>
		</>
	);
};
