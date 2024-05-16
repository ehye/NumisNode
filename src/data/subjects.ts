import { Subject } from '../graphql/__generated__/resolvers-types'
// import { Catalog } from '../types/types'

export const subjects: Subject[] = [
  {
    id: '420',
    title: '5 Cents - Victoria',
    category: 'coin',
    // issuer: {
    //   code: 'canada',
    //   name: 'Canada',
    // },
    min_year: 1858,
    max_year: 1901,
    obverse_thumbnail: 'https://en.numista.com/catalogue/photos/canada/1009-180.jpg',
    reverse_thumbnail: 'https://en.numista.com/catalogue/photos/canada/1010-180.jpg',
  },
  {
    id: '419',
    title: '5 Cents - Edward VII',
    category: 'banknote',
    // issuer: {
    //   code: 'canada',
    //   name: 'Canada',
    // },
    min_year: 1902,
    max_year: 1902,
    obverse_thumbnail: 'https://en.numista.com/catalogue/photos/canada/1021-180.jpg',
    reverse_thumbnail: 'https://en.numista.com/catalogue/photos/canada/1022-180.jpg',
  },
]

// export const catalogs: Catalog[] = [
//   {
//     code: 'code',
//     author: 'author',
//     isbn13: 'isbn13',
//     publisher: 'publisher',
//     id: 6,
//     title: 'title',
//   },
//   {
//     code: 'code',
//     author: 'author',
//     isbn13: 'isbn13',
//     publisher: 'publisher',
//     id: 6,
//     title: 'title',
//   },
// ]

// export const issuer: Issuer[] = [
//   {
//     code: 'p-code',
//     name: 'p-name',
//     wikidata_id: 'wikidata_id',
//   },
//   {
//     code: 'code',
//     name: 'name',
//     wikidata_id: 'wikidata_id',
//   },
// ]
