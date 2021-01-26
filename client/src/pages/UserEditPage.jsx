import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { UserEdit } from '../components/User/UserEdit';

export const UserEditPage = () => {
	return (
		<Layout
			page={{
				name: 'Редактировать пользователя',
				title: 'Редактировать пользователя - Обучение онлайн',
			}}
			content={<UserEdit />}
		/>
	);
};
