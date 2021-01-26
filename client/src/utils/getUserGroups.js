export const getUserGroups = (userId) => {
	const user_groups = usersGroups.find((group) => group.user_id === userId);
	const userGroupsArr = [];

	if (user_groups) {
		const { group_ids } = user_groups;
		group_ids.forEach((id) => {
			const group = getGroupName(id);
			userGroupsArr.push(group);
		});
	}

	return userGroupsArr;
};
