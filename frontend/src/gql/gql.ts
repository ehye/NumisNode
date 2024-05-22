/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      value\n    }\n  }\n": types.LoginDocument,
    "\n  query GetSubject($getSubjectId: String!) {\n    getSubject(id: $getSubjectId) {\n      id\n      title\n      category\n      min_year\n      max_year\n      obverse_thumbnail\n      reverse_thumbnail\n      liked\n      likesCount\n    }\n  }\n": types.GetSubjectDocument,
    "\n  mutation AddFavorite($addFavoriteId: String!) {\n    addFavorite(id: $addFavoriteId)\n  }\n": types.AddFavoriteDocument,
    "\n  mutation RemoveFavorite($removeFavoriteId: String!) {\n    removeFavorite(id: $removeFavoriteId)\n  }\n": types.RemoveFavoriteDocument,
    "\n  query AllSubjects($category: String) {\n    allSubjects(category: $category) {\n      id\n      title\n      obverse_thumbnail\n      reverse_thumbnail\n    }\n  }\n": types.AllSubjectsDocument,
    "\n  query GetUser($getUserId: String!) {\n    getUser(id: $getUserId) {\n      id\n      username\n      name\n      createdAt\n      updatedAt\n      favorites {\n        id\n        title\n      }\n    }\n  }\n": types.GetUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      value\n    }\n  }\n"): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      value\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSubject($getSubjectId: String!) {\n    getSubject(id: $getSubjectId) {\n      id\n      title\n      category\n      min_year\n      max_year\n      obverse_thumbnail\n      reverse_thumbnail\n      liked\n      likesCount\n    }\n  }\n"): (typeof documents)["\n  query GetSubject($getSubjectId: String!) {\n    getSubject(id: $getSubjectId) {\n      id\n      title\n      category\n      min_year\n      max_year\n      obverse_thumbnail\n      reverse_thumbnail\n      liked\n      likesCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddFavorite($addFavoriteId: String!) {\n    addFavorite(id: $addFavoriteId)\n  }\n"): (typeof documents)["\n  mutation AddFavorite($addFavoriteId: String!) {\n    addFavorite(id: $addFavoriteId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveFavorite($removeFavoriteId: String!) {\n    removeFavorite(id: $removeFavoriteId)\n  }\n"): (typeof documents)["\n  mutation RemoveFavorite($removeFavoriteId: String!) {\n    removeFavorite(id: $removeFavoriteId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AllSubjects($category: String) {\n    allSubjects(category: $category) {\n      id\n      title\n      obverse_thumbnail\n      reverse_thumbnail\n    }\n  }\n"): (typeof documents)["\n  query AllSubjects($category: String) {\n    allSubjects(category: $category) {\n      id\n      title\n      obverse_thumbnail\n      reverse_thumbnail\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUser($getUserId: String!) {\n    getUser(id: $getUserId) {\n      id\n      username\n      name\n      createdAt\n      updatedAt\n      favorites {\n        id\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUser($getUserId: String!) {\n    getUser(id: $getUserId) {\n      id\n      username\n      name\n      createdAt\n      updatedAt\n      favorites {\n        id\n        title\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;