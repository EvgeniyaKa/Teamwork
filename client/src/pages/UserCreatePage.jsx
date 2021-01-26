import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { UserCreate } from '../components/User/UserCreate';

export const UserCreatePage = () => {
	return (
		<Layout
			page={{
				name: 'Добавить пользователя',
				title: 'Добавить пользователя - MyNewLife club',
			}}
			content={<UserCreate />}
		/>
	);
};
