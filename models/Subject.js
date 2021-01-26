const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
	title: { type: String, required: true, unique: true },
	code: { type: String, required: true, unique: true },
	date: { type: Date, default: Date.now },
	start_date: { type: Date, default: Date.now },
	context: { type: String, required: true },
	training_id: { type: Types.ObjectId, ref: 'Training', required: true },
});

module.exports = model('Subject', schema);
