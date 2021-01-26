const { Router } = require('express');
const User_Groups = require('../models/User_Groups');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.get('/', auth, async (req, res) => {
	try {
		const user_groups = await User_Groups.find();
		res.json(user_groups);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.get('/:id', auth, async (req, res) => {
	try {
		const userGroups = await User_Groups.findOne({ user_id: req.params.id });
		res.json(userGroups);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.put('/change', auth, async (req, res) => {
	try {
		const user = await User_Groups.findOne({ user_id: req.body.user_id });
		if (user) {
			const _groups = user.group_ids;

			const _currentGroup = _groups.find(
				(group) => group._id == req.body.group_id,
			);
			if (_currentGroup) {
				res.json({
					status: true,
					message: 'Данный пользователь уже состоит в этой группе',
				});
			} else {
				_groups.push(req.body.group_id);
				await user.updateOne({ group_ids: _groups });
				res.json({ status: true });
			}
		} else {
			const { user_id, group_id } = req.body;

			const userGroup = new User_Groups({
				user_id,
				group_ids: group_id,
			});

			await userGroup.save();
			res.status(201).json(userGroup);
		}
	} catch (e) {
		console.log('users_groups_change_by_id__', e);
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

module.exports = router;
