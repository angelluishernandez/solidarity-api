const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, "Please enter an email"],
			unique: true,
			minlength: [3, "First name needs to be at least 3 characters long"],
		},
		password: {
			type: String,
			unique: true,
			required: [true, "Email is required"],
			trim: true,
			lowercase: true,
			match: [EMAIL_PATTERN, "Email is invalid"],
		},

		googleId: {
			type: String,
		},

		projects: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Project",
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", function(next) {
	const user = this;
	if (user.isModified("password")) {
		bcrypt
			.genSalt(SALT_WORK_FACTOR)
			.then(salt => {
				return bcrypt.hash(user.password, salt).then(hash => {
					user.password = hash;
					next();
				});
			})
			.catch(error => next(error));
	} else {
		next();
	}
});

const User = mongoose.model("User", userSchema);
module.exports = User;
