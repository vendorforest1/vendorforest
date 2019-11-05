// @ts-nocheck
import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";
//import mongooseStringQuery from 'mongoose-string-query';
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    username: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
    accountType: {
      type: Number,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    rememberToken: String,
    profilePercent: {
      type: Number,
      default: 0,
    },
    subscriptionId: String,
    countryDialCode: String,
    phone: String,
    isRental: {
      type: Number,
      default: 0,
    },
    isTourguide: {
      type: Number,
      default: 0,
    },
    addressId: Number,
    profileImage: String,
    deletedAt: String,
    addressDataId: Number,
    bsLocation: {
      country: String,
      state: String,
      city: String,
      fullAddress: String,
      lat: Number,
      lng: Number,
      placeId: String,
    },
    timeZone: {
      type: String,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
    },
    connectedAccountId: {
      type: String,
    },
    currentLocation: {
      ipAddress: String,
      country: String,
      state: String,
      city: String,
      lat: Number,
      lng: Number,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre("findOneAndUpdate", function(next) {
  if (!this._update.recoveryCode) {
    return next();
  }
});
UserSchema.plugin(bcrypt, {
  rounds: 8,
});

UserSchema.plugin(uniqueValidator, {
  message: "is already taken.",
});

UserSchema.index({
  email: 1,
  username: 1,
}); // compound index on email + username

export default mongoose.model("user", UserSchema);
