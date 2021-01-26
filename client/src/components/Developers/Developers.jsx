import React, {
	useState,
	useEffect,
	useCallback,
	useContext,
	useRef,
} from 'react';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';

export const Developers = () => {
    const { loading, request } = useHttp();
    const [users, setUsers] = useState([]);
	const { token } = useContext(AuthContext);


    const getUsers = useCallback(async () => {
		try {
			const data = await request('/api/user', 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setUsers(data);
		} catch (e) {}
	}, [token, request]);

	useEffect(() => {
		getUsers();
	}, [getUsers]);
	
	return (
		<>
            <div className="table-responsive mb-3">
			<table className="table table-hover mb-0">
				<thead>
					<tr>
						<th>Имя</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, i) => {
						const userRoles = user.roles.filter(rol => rol === 'admin')
							if (String(userRoles) === 'admin') {
							   return ( 
									<tr key={i}>
										<td>{user.name}</td>
										<td>{user.email}</td>	
									</tr>
							  		)
								}	
							}
						)		
					}
				</tbody>
			</table>
		</div>
		</>
	);
};