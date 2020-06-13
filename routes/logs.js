const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');

const Log = require('../models/Log');

// router.get('/', async (req, res) => {
// 	try {
// 		const logs = await Log.find();
// 		res.json(logs);
// 	} catch (error) {
// 		console.error(error.message);
// 		res.status(500).send('Server Error');
// 	}
// });

router.get('/', async (req, res) => {
	if (req.query.text) {
		let text = req.query.text;
		try {
			const logs = await Log.find({ $text: { $search: text } });
			res.json(logs);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	} else {
		try {
			const logs = await Log.find();
			res.json(logs);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
});

router.post(
	'/',
	[
		check('message', 'firstName is required').not().isEmpty(),
		check('tech', 'lastName is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { message, attention, tech, date } = req.body;

		try {
			let log = await Log.findOne({ message });

			if (log) {
				return res.status(400).json({ msg: 'log already exists' });
			}

			log = new Log({
				message,
				attention,
				tech,
				date,
			});

			await log.save();

			const payload = {
				log: {
					message,
					attention,
					tech,
					date,
				},
			};
			res.send(log);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('server error');
		}
	}
);

router.put('/:id', async (req, res) => {
	const { message, attention, tech, date } = req.body;

	const logFields = {};
	if (message) logFields.message = message;
	logFields.attention = attention;
	if (tech) logFields.tech = tech;
	if (date) logFields.date = date;

	try {
		let log = await Log.findById(req.params.id);

		if (!log) return res.status(404).json({ msg: 'Log not found' });

		log = await Log.findByIdAndUpdate(
			req.params.id,
			{ $set: logFields },
			{ new: true }
		);
		res.send(log);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

router.delete('/:id', async (req, res) => {
	try {
		let log = await Log.findById(req.params.id);

		if (!log) return res.status(404).json({ msg: 'Log not found' });

		await Log.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Log removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
