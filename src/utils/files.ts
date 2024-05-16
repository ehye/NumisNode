import * as fs from 'fs'
import * as path from 'path'

/**
 * Function to recursively read files in a directory with a specific extension
 * @param directory
 * @param extension
 */
async function readFilesRecursively(directory: string, extension: string): Promise<string> {
  const filesContent: string[] = []

  async function readDirectory(dir: string): Promise<void> {
    const files = await fs.promises.readdir(dir)
    await Promise.all(
      files.map(async file => {
        const filePath = path.join(dir, file)
        const stats = await fs.promises.stat(filePath)
        if (stats.isDirectory()) {
          await readDirectory(filePath)
        } else if (path.extname(file) === extension) {
          const content = await fs.promises.readFile(filePath, 'utf8')
          filesContent.push(content)
        }
      }),
    )
  }

  await readDirectory(directory)
  return filesContent.join('')
}

export { readFilesRecursively }

// // Example usage
// const directoryPath = './src/schemas/'
// const fileExtension = '.graphql'

// readFilesRecursively(directoryPath, fileExtension)
//   .then(fileContents => {
//     console.log(fileContents) // Output the concatenated file contents
//   })
//   .catch(error => {
//     console.error(error)
//   })
