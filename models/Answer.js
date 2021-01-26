const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
	{
		author_id: { type: Types.ObjectId, ref: 'User', required: true },
		stud_response: { type: String, required: true },
		prof_response: { type: String, default: null },
		score: { type: Number, default: null },
		subject_id: { type: Types.ObjectId, ref: 'Subject', required: true },
		creation_date: { type: Date, default: Date.now },
		date_of_change: { type: Date, default: Date.now },
	},
	{ timestamps: true },
);

module.exports = model('Answer', schema);
