import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { GroupEdit } from '../components/Group/GroupEdit';

export const GroupEditPage = (props) => {
	return (
		<Layout
			page={{
				name: 'Редактировать группу',
				title: 'Редактировать группу - Online Edecation',
			}}
			content={<GroupEdit />}
		/>
	);
};
