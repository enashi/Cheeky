const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
{
	posterId: {
		type: String,
		required: true
	},
	message: {
		type: String,
		trim: true,
		maxlength: 500,
	},
	likers: {
		type: [String],
		required: true,
	},
	fake:{
		type: [String],
	},
	comments: {
		type: [
			{
				commenterId:String,
				commenterPseudo: String,
				text: String,
				timestamp: Number,
			}
		],
		required: true,
	},
},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('post', PostSchema);