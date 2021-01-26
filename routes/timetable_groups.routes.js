const { Router } = require('express');
const Timetable_Groups = require('../models/Timetable_Groups');
const Group = require('../models/Group');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/create', auth, async (req, res) => {
	try {
		const { group_id, timetable } = req.body;

		const group = await Group.findById(group_id);

		if (group.timetable_id) {
			return res.status(400).json({
				message: `Расписание уже существует. <a href="/group/edit/${group_id}">Редактировать расписание группы</a>.`,
			});
		}

		const timetableGroup = new Timetable_Groups({
			group_id,
			timetable,
		});

		await timetableGroup.save();

		await group.updateOne({ timetable_id: timetableGroup._id });

		res.status(201).json(timetableGroup);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.get('/:id', auth, async (req, res) => {
	try {
		const timetableGroup = await Timetable_Groups.findById(
			req.params.id,
		).populate({
			path: 'timetable.subject_id',
			model: 'Subject',
			select: 'title',
		});

		res.json(timetableGroup);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

module.exports = router;
