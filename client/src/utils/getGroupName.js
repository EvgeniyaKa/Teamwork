export const getGroupName = (groupId, groups) => {
	let group = [];

	groups.forEach((el) => {
		if (el._id === groupId) {
			group['name'] = el.name;
			group['description'] = el.description;
		}
	});
	return group;
};
