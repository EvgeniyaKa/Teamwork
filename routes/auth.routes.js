const { Router } = require('express');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const User_Groups = require('../models/User_Groups');
const router = Router();

// /api/auth/register
router.post(
	'/register',
	[
		check('name', 'Минимальная длина 3 символа').isLength({ min: 3 }),
		check('email', 'Некорректный email').isEmail(),
		check('password', 'Минимальная длина пароля 6 символов').isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при регистрации',
				});
			}

			const { name, email, password, roles } = req.body;

			const rolesArr = [];
			roles ? rolesArr.push('all', roles) : rolesArr.push('all');

			const candidate = await User.findOne({ email });

			if (candidate) {
				return res
					.status(400)
					.json({ message: 'Такой пользователь уже существует' });
			}

			const hashedPassword = await bcrypt.hash(password, 12);
			const user = new User({
				name,
				email,
				password: hashedPassword,
				roles: rolesArr,
			});

			await user.save();

			// Добавить пользователя в группу Все пользователи
			/* const user_groups = new User_Groups({
				user_id: user._id,
				group_ids: '5f537698623f050aa4a2f3ab',
			});

			await user_groups.save(); */

			const token = jwt.sign(
				{ userId: user._id, userRoles: user.roles },
				config.get('jwtSecret'),
				{
					expiresIn: '12h',
				},
			);

			res.json({ token, userId: user._id });
		} catch (e) {
			res
				.status(500)
				.json({ message: 'Что-то пошло не так, попробуйте снова' });
		}
	},
);

// /api/auth/login
router.post(
	'/login',
	[
		check('email', 'Введите корректный email').normalizeEmail().isEmail(),
		check('password', 'Введите пароль').exists(),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при входе в систему',
				});
			}

			const { email, password } = req.body;

			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ message: 'Пользователь не найден' });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json({ message: 'Не верный пароль, попробуйте снова' });
			}

			const token = jwt.sign(
				{ userId: user.id, userRoles: user.roles },
				config.get('jwtSecret'),
				{
					expiresIn: '12h',
				},
			);

			res.json({ token, userId: user.id });
		} catch (e) {
			res
				.status(500)
				.json({ message: 'Что-то пошло не так, попробуйте снова' });
		}
	},
);

module.exports = router;
