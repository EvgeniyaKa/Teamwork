const { Schema, model, Types } = require('mongoose');

/* const schema = new Schema({
	subject_id: { type: Types.ObjectId, ref: 'Subject', required: true },
	start_date: { type: Date, default: Date.now() },
}); */

/* const schema = new Schema({
	group_id: { type: Types.ObjectId, ref: 'Group', required: true },
	timetable: {
		[{ type: Types.objectId, ref: 'Subject', required: true }]: {
			type: Date,
			default: Date.now(),
		},
	},
}); */

/* 
const schema = new Schema({
	group_id: { type: Types.ObjectId, ref: 'Group', required: true },
	timetable: {
		[{ type: String }]: {
			type: Date,
			default: Date.now(),
		},
	},
}); */

const schema = new Schema({
	group_id: { type: Types.ObjectId, ref: 'Group', required: true },
	timetable: [
		{
			subject_id: { type: Types.ObjectId, ref: 'Subject', required: true },
			start_date: { type: Date, default: Date.now() },
			_id: false,
		},
	],
});

module.exports = model('Timetable_Groups', schema);
