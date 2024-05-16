import mongoose, { Schema, Document, Types, Model } from 'mongoose'

export interface IUser extends Document {
  username: string
  passwordHash: string
  name: string
  favorites: Types.ObjectId
  friends: Types.ObjectId
  updatedAt: Date
  createdAt: Date
}

const schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    passwordHash: {
      type: String,
      minLength: 3,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
  },
  { timestamps: true },
)

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

schema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

const User = mongoose.model<IUser>('User', schema)

export default User
