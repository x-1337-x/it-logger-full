const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');

const Tech = require('../models/Tech');

router.post(
	'/',
	[
		check('firstName', 'firstName is required').not().isEmpty(),
		check('lastName', 'lastName is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { firstName, lastName } = req.body;

		try {
			let tech = await Tech.findOne({ firstName, lastName });

			if (tech) {
				return res.status(400).json({ msg: 'tech already exists' });
			}

			tech = new Tech({
				firstName,
				lastName,
			});

			await tech.save();

			res.send(tech);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('server error');
		}
	}
);

router.get('/', async (req, res) => {
	try {
		const techs = await Tech.find();
		res.json(techs);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

router.delete('/:id', async (req, res) => {
	try {
		let tech = await Tech.findById(req.params.id);

		if (!tech) return res.status(404).json({ msg: 'Tech not found' });

		await Tech.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Tech removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
