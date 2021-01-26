const { Router } = require('express');
const slugify = require('@sindresorhus/slugify');
const Subject = require('../models/Subject');
const Training = require('../models/Training');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/create', auth, async (req, res) => {
	try {
		const { title, context, training_id, start_date } = req.body;
		const code = slugify(title);

		const subject = new Subject({
			title,
			code,
			training_id,
			context,
			start_date,
		});

		await subject.save();

		const training = await Training.findById(req.body.training_id);

		if (subject && training) {
			const subjects = training.subject_ids;
			const currentSubject = subjects.find((subj) => subj === subject._id);

			if (currentSubject) {
				return res.status(400).json({
					message: 'Тема с таким ID уже существует.',
				});
			} else {
				subjects.push(subject._id);
				await training.updateOne({ subject_ids: subjects });
			}
		}

		res.status(201).json({ subject });
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.get('/training/:id', auth, async (req, res) => {
	try {
		const subjects = await Subject.find({
			training_id: req.params.id,
		});
		res.json(subjects);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.get('/:id', auth, async (req, res) => {
	try {
		const subject = await Subject.findById(req.params.id);
		res.json(subject);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.get('/edit/:id', auth, async (req, res) => {
	try {
		const subject = await Subject.findById(req.params.id);
		res.json(subject);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.put('/edit/:id', auth, async (req, res) => {
	try {
		const { title, context, training_id, start_date } = req.body;

		const subject = await Subject.findById(req.params.id);

		subject.title = title;
		subject.context = context;
		subject.training_id = training_id;
		subject.start_date = start_date;

		await subject.save();
		res.status(201).json({ subject });
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.delete('/delete/:id', auth, async (req, res) => {
	try {
		const subject = await Subject.findOneAndDelete({ _id: req.params.id });
		res.send(subject);
	} catch (e) {
		res
			.status(500)
			.json({ message: 'Что-то пошло не так, попробуйте снова.delete' });
	}
});

module.exports = router;
