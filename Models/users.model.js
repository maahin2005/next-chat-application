import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    mobileNo: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileVisibility: {
      type: String,
      enum: ["Private", "Public"],
      default: "Public",
    },
    heading: {
      type: String,
      maxlength: 15,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 250,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    pincode: {
      type: String,
    },
    starFriends: {
      type: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          starredAt: { type: String, default: () => formatDate(new Date()) },
        },
      ],
      default: [],
    },
    blockedUsers: {
      type: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          blckedAt: { type: String, default: () => formatDate(new Date()) },
        },
      ],
      default: [],
    },
    interests: {
      type: [String],
      default: [],
    },
    myFriends: {
      type: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          friendsAt: { type: String, default: () => formatDate(new Date()) },
        },
      ],
      default: [],
    },
    incomingFriendReq: {
      type: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          receivedAt: { type: String, default: () => formatDate(new Date()) },
        },
      ],
      default: [],
    },
    sentFriendReq: {
      type: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          sentAt: { type: String, default: () => formatDate(new Date()) },
        },
      ],
      default: [],
    },
    notInterestedRecommendations: {
      type: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          notInterestedAt: {
            type: String,
            default: () => formatDate(new Date()),
          },
        },
      ],
      default: [],
    },
    role: {
      type: String,
      enum: ["SuperAdmin", "User", "Admin"],
      default: "User",
    },
  },
  { timestamps: true, versionKey: "version" }
);

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip hashing if password hasn't changed
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (userEnteredPassword) {
  return await bcrypt.compare(userEnteredPassword, this.password);
};

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
