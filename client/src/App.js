import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { Loader } from './components/Loader/Loader';

import 'bootstrap';
import './sass/bootstrap-custom.scss';
import './icons/lineawesome/css/line-awesome.css';
import './sass/style.scss';

function App() {
	const { token, userId, userRoles, login, logout, ready } = useAuth();
	const isAuthenticated = !!token;
	const routes = useRoutes(isAuthenticated);

	if (!ready) {
		return <Loader />;
	}

	return (
		<AuthContext.Provider
			value={{
				token,
				userId,
				userRoles,
				login,
				logout,
				isAuthenticated,
			}}
		>
			<Router>{routes}</Router>
		</AuthContext.Provider>
	);
}

export default App;
