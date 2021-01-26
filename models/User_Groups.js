const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
	user_id: { type: Types.ObjectId, ref: 'User', required: true },
	group_ids: [{ type: Types.ObjectId, ref: 'Group', required: true }],
});

module.exports = model('User_Groups', schema);
