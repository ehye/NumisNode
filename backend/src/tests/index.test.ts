import * as fs from 'fs'
import * as path from 'path'

const testDir = path.join(__dirname, '')

fs.readdirSync(testDir).forEach(file => {
  if (file.endsWith('.test.ts')) {
    require(path.join(testDir, file))
  }
})
