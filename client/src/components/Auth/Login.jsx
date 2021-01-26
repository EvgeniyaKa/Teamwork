import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import logo from '../../img/logo.png';

export const Login = () => {
	const auth = useContext(AuthContext);
	const { loading, request } = useHttp();
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const loginHandler = async () => {
		try {
			try {
				const data = await request('/api/auth/login', 'POST', { ...form });
				auth.login(data.token, data.userId);
			} catch (e) {}
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
							Sign In To Education Online
						</span>

						<Form className="form__signIn">
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
									name="checkbox"
									label="Remember me"
									id="check_remember"
								/>
								<a href="/" className="forgot-pass">
									Forgot Password?
								</a>
							</div>
							<Button
								className="btn btn-primary btn__gradient btn__grad-danger btn__sign-in"
								type="submit"
								disabled={loading}
								onClick={loginHandler}
							>
								Sign in
							</Button>
						</Form>
						<div className="register">
							<span className="register__text">Don't have an account?</span>
							<Link to="/register">Create an account</Link>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
};
