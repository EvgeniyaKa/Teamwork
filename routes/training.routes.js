const { Router } = require('express');
const { check } = require('express-validator');
const slugify = require('@sindresorhus/slugify');
const Training = require('../models/Training');
const User_Groups = require('../models/User_Groups');
const Group = require('../models/Group');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post(
	'/create',
	[auth, check('deatil_text').escape()],
	async (req, res) => {
		try {
			const { title, description, detail_text } = req.body;
			const code = slugify(title);

			const training = new Training({
				title,
				description,
				detail_text,
				code,
				author_id: req.user.userId,
			});

			await training.save();
			res.status(201).json({ training });
		} catch (e) {
			console.log('_create_training___', e);
			res
				.status(500)
				.json({ message: 'Что-то пошло не так, попробуйте снова' });
		}
	},
);

router.get('/', auth, async (req, res) => {
	try {
		const trainings = await Training.find().populate({
			path: 'author_id',
			model: 'User',
			select: 'name',
		});
		res.json(trainings);
	} catch (e) {
		console.log('_get_trainings__', e);

		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.get('/:id', auth, async (req, res) => {
	try {
		const training = await await Training.findById(req.params.id);
		res.json(training);
	} catch (e) {
		console.log('_get_training_by_id__', e);
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.get('/learning/', auth, async (req, res) => {
	try {
		const _user_groups = await User_Groups.findOne({
			user_id: req.user.userId,
		});
		const _groups = await Group.find({ _id: _user_groups.group_ids });
		let trainingIds = [];
		_groups.forEach((group) => {
			trainingIds.push(group.training_id);
		});

		const _currentUserTrainings = await Training.find({ _id: trainingIds });
		res.json(_currentUserTrainings);
	} catch (e) {
		console.log('_get_trainings__', e);

		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

module.exports = router;
