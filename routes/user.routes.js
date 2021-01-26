const { Router } = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.find();
		res.json(user);
	} catch (e) {
		console.log('users_groups_get__', e);
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.get('/:id', auth, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.json(user);
	} catch (e) {
		console.log('users_groups_get_by_id__', e);

		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.put('/change/:id', auth, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (user) {
			const _roles = user.roles;

			const _currentRole = _roles.find((role) => role === req.body.role);
			if (_currentRole) {
				res.json({
					status: false,
					message: 'У данного пользователя уже есть эта роль',
				});
			} else {
				_roles.push(req.body.role);
				await user.updateOne({ roles: _roles });
				res.json({ status: true });
			}
		}
	} catch (e) {
		console.log('users_roles_change_by_id__', e);
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

module.exports = router;
