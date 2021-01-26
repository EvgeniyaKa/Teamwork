const { Router } = require('express');
const Answer = require('../models/Answer');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/create', auth, async (req, res) => {
	try {
		const { stud_response, subject_id, creation_date } = req.body;

		const answer = new Answer({
			stud_response,
			subject_id,
			creation_date,
			author_id: req.user.userId,
		});

		await answer.save();
		res.status(201).json({ answer });
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.get('/:subject_id', auth, async (req, res) => {
	try {
		const answer = await Answer.find({
			subject_id: req.params.subject_id,
		}).populate('author_id', 'name');
		res.json(answer);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.get('/:id', auth, async (req, res) => {
	try {
		const answer = await Answer.findById(req.params.id);
		res.json(answer);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.get('/edit/:id', auth, async (req, res) => {
	try {
		const answer = await Answer.findById(req.params.id);
		res.json(answer);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.put('/edit/:id', auth, async (req, res) => {
	try {
		const { prof_response, score, date_of_change } = req.body;

		const answer = await Answer.findById(req.params.id);

		answer.prof_response = prof_response;
		answer.score = score;
		answer.date_of_change = date_of_change;

		await answer.save();
		res.status(201).json({ answer });
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.delete('/delete/:id', auth, async (req, res) => {
	try {
		const answer = await Answer.findOneAndDelete({ _id: req.params.id });
		res.send(answer);
	} catch (e) {
		res
			.status(500)
			.json({ message: 'Что-то пошло не так, попробуйте снова.delete' });
	}
});

module.exports = router;
