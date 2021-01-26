import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { SubjectEdit } from '../components/Subject/SubjectEdit';

export const SubjectEditPage = (props) => {
	return (
		<Layout
			page={{
				name: 'Редактировать тему тренинга',
				title: 'Редактировать тему тренинга - MyNewLife club',
			}}
			content={<SubjectEdit />}
		/>
	);
};
