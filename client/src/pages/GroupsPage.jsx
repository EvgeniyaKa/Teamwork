import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { GroupsList } from '../components/Group/GroupsList';

export const GroupsPage = () => {
	return (
		<Layout
			page={{
				name: 'Группы пользователей',
				title: 'Группы пользователей - Онлайн обучение',
			}}
			content={<GroupsList />}
		/>
	);
};
