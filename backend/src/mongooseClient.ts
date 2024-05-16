import mongoose from 'mongoose'
import { MONGODB_URI } from './utils/config'
import { IS_DEV } from './utils/config'

export function start() {
  if (IS_DEV) {
    console.log('connecting to', MONGODB_URI)
    mongoose.set('debug', true)
  }

  mongoose.set('strictQuery', false)
  mongoose
    .connect(MONGODB_URI())
    .then(() => {
      console.log('MongoDB connected')
    })
    .catch(error => {
      console.log('error connection to MongoDB:', error.message)
    })
}

export async function stop() {
  await mongoose.connection.close()
  console.log('MongoDB closed')
}

export async function dropCollection(collectionName: string) {
  await mongoose.connection.collection(collectionName).drop()
  console.log(`Collection '${collectionName}' dropped`)
}
