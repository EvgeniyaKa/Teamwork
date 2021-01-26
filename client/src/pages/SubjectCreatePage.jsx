import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { SubjectCreate } from '../components/Subject/SubjectCreate';

export const SubjectCreatePage = (props) => {
	return (
		<Layout
			page={{
				name: 'Добавить тему тренинга',
				title: 'Добавить тему тренинга - MyNewLife club',
			}}
			content={<SubjectCreate />}
		/>
	);
};
