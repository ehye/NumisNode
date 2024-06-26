import mongoose from 'mongoose'
// import uniqueValidator from 'mongoose-unique-validator'

export interface IIssuer {
  id: string
  code: string
  name: string
  wikidata_id: string
  createdAt: Date
  updatedAt: Date
}

const schema = new mongoose.Schema(
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
  },
  { timestamps: true }
)

// issuerSchema.plugin(uniqueValidator)

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

const Issuer = mongoose.model<IIssuer>('Issuer', schema)

export default Issuer
