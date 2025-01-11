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
    gender: {
      type: String,
      enum: ["Male", "Female", "Personal"],
      default: "Personal",
    },
    mobileNo: {
      type: String,
    },
    password: {
      type: String
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
    byGoogle:{
      type: Boolean,
      default: false
    },
    starFriends: {
      type: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          starredAt: {
            type: String,
            default: () =>
              formatDate(new Date(Date.UTC(2012, 11, 20, 3, 0, 0))),
          },
        },
      ],
      default: [],
    },
    blockedUsers: {
      type: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          blckedAt: {
            type: String,
            default: () =>
              formatDate(new Date(Date.UTC(2012, 11, 20, 3, 0, 0))),
          },
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
          friendsAt: {
            type: String,
            default: () =>
              formatDate(new Date(Date.UTC(2012, 11, 20, 3, 0, 0))),
          },
        },
      ],
      default: [],
    },
    incomingFriendReq: {
      type: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          receivedAt: {
            type: String,
            default: () =>
              formatDate(new Date(Date.UTC(2012, 11, 20, 3, 0, 0))),
          },
        },
      ],
      default: [],
    },
    sentFriendReq: {
      type: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          sentAt: {
            type: String,
            default: () =>
              formatDate(new Date(Date.UTC(2012, 11, 20, 3, 0, 0))),
          },
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
            default: () =>
              formatDate(new Date(Date.UTC(2012, 11, 20, 3, 0, 0))),
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
  return date.toLocaleString("en-US");
}

userSchema.pre("save", async function (next) {
  console.log("===FROM MODEL===== , ", this.password)
  if (!this.password || !this.isModified("password")) {
    return next();
  }

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

const UserModel =  mongoose?.models?.User || mongoose.model("User", userSchema);

export default UserModel;
