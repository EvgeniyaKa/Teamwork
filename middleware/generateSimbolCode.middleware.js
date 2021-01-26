const cryptoRandomString = require('crypto-random-string');
const Group = require('../models/Group');

module.exports = async (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next();
	}

	try {
		const generateСode = () =>
			cryptoRandomString({
				length: 6,
				type: 'distinguishable',
			});

		const preliminary = generateСode();

		req.body.character_code = preliminary;

		next();
	} catch (e) {
		res.status(400).json({ message: 'Не удалось сгенерировать код :(' });
	}
};
