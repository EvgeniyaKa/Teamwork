import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Layout } from '../components/Layout/Layout';
import { Loader } from '../components/Loader/Loader';
import { GroupDetail } from '../components/Group/GroupDetail';

export const GroupDetailPage = (props) => {
	const groupId = useParams().id;
	const [group, setGroup] = useState();
	const { loading, request } = useHttp();
	const { token } = useContext(AuthContext);

	const getGroup = useCallback(async () => {
		if (!groupId) return;
		try {
			const data = await request(`/api/group/${groupId}`, 'GET', null, {
				Authorization: `Bearer ${token}`,
			});
			setGroup(data);
		} catch (e) {}
	}, [token, request, groupId]);

	useEffect(() => {
		getGroup();
	}, [getGroup, groupId]);

	if (loading || !group) {
		return <Loader />;
	}

	return (
		<Layout
			page={{
				name: String(`Группа: ${group.name}`),
				title: `${group.name} - Education Online`,
			}}
			content={<GroupDetail group={group} />}
		/>
	);
};
