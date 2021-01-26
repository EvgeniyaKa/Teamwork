import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { Developers } from '../components/Developers/Developers';

export const DevelopersPage = () => {
	return (
		<Layout
			page={{
				name: 'Команда разработчиков',
				title: 'Группы пользователей - MyNewLife club',
			}}
			content={< Developers />}
		/>
	);
};