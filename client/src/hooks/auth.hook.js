import { useState, useCallback, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const storageName = 'mnl_user';

export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [ready, setReady] = useState(false);
	const [userId, setUserId] = useState(null);
	const [userRoles, setUserRoles] = useState(null);

	const login = useCallback((jwtToken, id) => {
		setToken(jwtToken);
		setUserId(id);
		setUserRoles(jwtDecode(jwtToken).userRoles);

		localStorage.setItem(
			storageName,
			JSON.stringify({
				userId: id,
				token: jwtToken,
			}),
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);
		setUserRoles(null);

		localStorage.removeItem(storageName);
	}, []);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName));

		if (data && data.token) {
			if (jwtDecode(data.token).exp > Date.now() / 1000) {
				login(data.token, data.userId);
			} else {
				logout();
			}
		}
		setReady(true);
	}, [login, logout]);

	return { login, logout, token, userId, userRoles, ready };
};
