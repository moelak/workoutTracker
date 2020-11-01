const router = require('express').Router();
const Workout = require('../models/workout.js');

router.get('/api/workouts', (req, res) => {
	Workout.find({})
		.then(dbWorkout => {
			res.json(dbWorkout);
		})
		.catch(err => {
			res.json(err);
		});
});

router.post('/api/workouts', ({ body }, res) => {
	Workout.create(body)
		.then(dbWorkout => {
			res.json(dbWorkout);
		})
		.catch(err => {
			res.json(err);
		});
});

router.get('/api/workouts/range', (req, res) => {
	Workout.find({})
		.limit(7)
		.then(dbWorkout => {
			res.json(dbWorkout);
		})
		.catch(err => {
			res.json(err);
		});
});

router.put('/api/workouts/:id', (req, res) => {
	console.log('----------> ', req.params.id);

	Workout.findByIdAndUpdate(
		req.params.id,
		{
			$push: {
				exercises: req.body,
			},
		},
		{
			new: true,
			runValidatores: true,
		}
	)
		.then(dbWorkout => {
			res.json(dbWorkout);
		})
		.catch(err => {
			res.json(err);
		});
});

module.exports = router;
