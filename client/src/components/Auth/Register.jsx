import React, { useState, useContext } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import logo from '../../img/logo.png';

export const Register = () => {
	const auth = useContext(AuthContext);
	const { loading, request } = useHttp();
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	});

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {
				...form,
			});
			auth.login(data.token, data.userId);
		} catch (e) {}
	};

	return (
		<Container fluid className="auth__page">
			<Row>
				<Col md={5} lg={6} xl={8} className="col-left">
					<div className="title__wrapper">
						<h1 className="title">Welcome To Education Online!</h1>
						<span className="subtitle">
							Etiam consequat urna at magna bibendum, in tempor arcu fermentum
							vitae mi massa egestas.
						</span>
					</div>
				</Col>
				<Col md={7} lg={6} xl={4} className="col-right">
					<div className="auth-form__wrapper">
						<img
							className="logo"
							src={logo}
							alt="logo"
							width="140"
							height="127"
						/>
						<span className="h3 auth__title text-center">
							Register To Education Online
						</span>
						<Form className="form__signIn">
							<Form.Group controlId="inputName">
								<Form.Control
									type="text"
									name="name"
									value={form.name}
									onChange={changeHandler}
								/>
								<Form.Label>Full Name</Form.Label>
								<span className="bar"></span>
							</Form.Group>
							<Form.Group controlId="inputEmail">
								<Form.Control
									type="email"
									name="email"
									value={form.email}
									onChange={changeHandler}
								/>
								<Form.Label>Email</Form.Label>
								<span className="bar"></span>
							</Form.Group>
							<Form.Group controlId="inputPassword">
								<Form.Control
									type="password"
									name="password"
									value={form.password}
									onChange={changeHandler}
								/>
								<Form.Label>Password</Form.Label>
								<span className="bar"></span>
							</Form.Group>
							<div className="form__include">
								<Form.Check
									type="checkbox"
									label="Term Use"
									id="term_use"
									required
								/>
							</div>
							<Button
								className="btn btn-primary btn__gradient btn__grad-danger btn__sign-in"
								type="submit"
								onClick={registerHandler}
								disabled={loading}
							>
								Register
							</Button>
						</Form>
						<div className="register">
							<span className="register__text">Have an account?</span>
							<Link to="/">Sign In</Link>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
};
