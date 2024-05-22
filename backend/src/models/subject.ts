import mongoose from 'mongoose'

export interface ISubject {
  id: string
  title: string
  category: string
  issuer?: mongoose.Types.ObjectId
  max_year?: number
  min_year?: number
  obverse_thumbnail?: string
  reverse_thumbnail?: string
  likesCount: number
  createdAt: Date
  updatedAt: Date
}

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    issuer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Issuer',
    },
    max_year: {
      type: Number,
    },
    min_year: {
      type: Number,
    },
    obverse_thumbnail: {
      type: String,
    },
    reverse_thumbnail: {
      type: String,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

schema.set('toObject', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Subject = mongoose.model<ISubject>('Subject', schema)

export default Subject
