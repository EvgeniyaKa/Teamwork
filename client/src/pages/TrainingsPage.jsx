import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { TrainingsList } from '../components/Training/TrainingsList';

export const TrainingsPage = () => {
	return (
		<Layout
			page={{
				name: 'Тренинги',
				title: 'Тренинги - MyNewLife club',
			}}
			content={<TrainingsList />}
		/>
	);
};
