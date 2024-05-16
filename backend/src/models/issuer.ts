import mongoose, { Schema, Document, Types } from 'mongoose'
// import uniqueValidator from 'mongoose-unique-validator'

export interface IIssuer extends Document {
  id: string
  code: string
  name: string
  wikidata_id: string
  // parent: Types.ObjectId
}

const schema = new Schema(
  {
    code: {
      type: String,
    },
    name: {
      type: String,
    },
    wikidata_id: {
      type: String,
    },
    // parent: [
    //   {
    //     type: Types.ObjectId,
    //     ref: 'Issuer',
    //   },
    // ],
  },
  { timestamps: true }
)

// issuerSchema.plugin(uniqueValidator)

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

const Issuer = mongoose.model<IIssuer>('Issuer', schema)

export default Issuer
