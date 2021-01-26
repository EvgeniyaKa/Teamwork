import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { UsersList } from '../components/User/UsersList';

export const UsersPage = () => {
	return (
		<Layout
			page={{
				name: 'Список пользователей',
				title: 'Список пользователей - MyNewLife club',
			}}
			content={<UsersList />}
		/>
	);
};
