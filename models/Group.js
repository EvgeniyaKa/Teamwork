const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String },
	character_code: { type: String, required: true, unique: true },
	timetable_id: { type: Types.ObjectId, ref: 'Timetable_Groups' },
	training_id: { type: Types.ObjectId, ref: 'Training', required: true },
	teacher_id: { type: Types.ObjectId, ref: 'User', required: true },
	students_ids: [{ type: Types.ObjectId, ref: 'User' }],
});

module.exports = model('Group', schema);

/*

const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
	group_id: { type: Types.ObjectId, ref: 'Group', required: true },
	timetable: {
		[{ type: Types.objectId, ref: 'Subject', required: true }]: {
			type: Date,
			default: Date.now(),
		},
	},
});

module.exports = model('Timetable_Groups', schema);
*/
