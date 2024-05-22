import mongoose from 'mongoose'

export interface IUser {
  username: string
  passwordHash: string
  name: string
  friends: Array<mongoose.Types.ObjectId>
  favorites: Array<mongoose.Types.ObjectId>
  createdAt: Date
  updatedAt: Date
}

const schema = new mongoose.Schema(
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
    // bookmarks: [new mongoose.Schema<IBookmark>({ subject: mongoose.Schema.Types.ObjectId })],
  },
  { timestamps: true }
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

// type THydrateUserDocument = {
//   bookmarks: mongoose.Types.DocumentArray<IBookmark>
// }
// type UserModelType = mongoose.Model<IUser, {}, {}, {}, THydrateUserDocument>

const User = mongoose.model<IUser>('User', schema)

export default User
