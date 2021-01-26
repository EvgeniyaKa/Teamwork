import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { Home } from '../components/Home/Home';

export const HomePage = () => {
	return (
		<Layout
			page={{
				name: 'home',
				title: 'Главная - MyNewLife club',
			}}
			content={<Home />}
		/>
	);
};
