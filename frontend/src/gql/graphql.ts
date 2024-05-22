/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Issuer = {
  __typename?: 'Issuer';
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  wikidata_id?: Maybe<Scalars['String']['output']>;
};

export type IssuerCreate = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  wikidata_id?: InputMaybe<Scalars['String']['input']>;
};

export type IssuerUpdate = {
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  wikidata_id?: InputMaybe<Scalars['String']['input']>;
};

export type MeInfo = {
  __typename?: 'MeInfo';
  exp?: Maybe<Scalars['Int']['output']>;
  iat?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavorite?: Maybe<Array<Scalars['String']['output']>>;
  createIssuer?: Maybe<Issuer>;
  createSubject?: Maybe<SubjectCreateUpdateResponse>;
  createUser?: Maybe<UserCreateUpdateResponse>;
  login?: Maybe<Token>;
  removeFavorite?: Maybe<Array<Scalars['String']['output']>>;
  updateIssuer?: Maybe<Issuer>;
  updateSubject?: Maybe<SubjectCreateUpdateResponse>;
  updateUser?: Maybe<UserCreateUpdateResponse>;
};


export type MutationAddFavoriteArgs = {
  id: Scalars['String']['input'];
};


export type MutationCreateIssuerArgs = {
  input: IssuerCreate;
};


export type MutationCreateSubjectArgs = {
  input: SubjectCreate;
};


export type MutationCreateUserArgs = {
  input: UserCreate;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRemoveFavoriteArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateIssuerArgs = {
  input: IssuerUpdate;
};


export type MutationUpdateSubjectArgs = {
  input: SubjectUpdate;
};


export type MutationUpdateUserArgs = {
  input: UserUpdate;
};

export type NonSensitiveUser = {
  __typename?: 'NonSensitiveUser';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  favorites?: Maybe<Array<Subject>>;
  friends?: Maybe<Array<User>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  allIssuers?: Maybe<Array<Issuer>>;
  allSubjects?: Maybe<Array<Subject>>;
  allUsers?: Maybe<Array<NonSensitiveUser>>;
  getFavorites?: Maybe<Array<Subject>>;
  getIssuer?: Maybe<Issuer>;
  getSubject?: Maybe<SubjectInfoResponse>;
  getUser?: Maybe<NonSensitiveUser>;
  me?: Maybe<MeInfo>;
};


export type QueryAllSubjectsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetIssuerArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetSubjectArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
};

export type Subject = {
  __typename?: 'Subject';
  category?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  issuer?: Maybe<Issuer>;
  likesCount?: Maybe<Scalars['Int']['output']>;
  max_year?: Maybe<Scalars['Int']['output']>;
  min_year?: Maybe<Scalars['Int']['output']>;
  obverse_thumbnail?: Maybe<Scalars['String']['output']>;
  reverse_thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SubjectCreate = {
  category?: InputMaybe<Scalars['String']['input']>;
  issuer?: InputMaybe<Scalars['String']['input']>;
  max_year?: InputMaybe<Scalars['Int']['input']>;
  min_year?: InputMaybe<Scalars['Int']['input']>;
  obverse_thumbnail?: InputMaybe<Scalars['String']['input']>;
  reverse_thumbnail?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type SubjectCreateUpdateResponse = {
  __typename?: 'SubjectCreateUpdateResponse';
  category?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  issuer?: Maybe<Issuer>;
  max_year?: Maybe<Scalars['Int']['output']>;
  min_year?: Maybe<Scalars['Int']['output']>;
  obverse_thumbnail?: Maybe<Scalars['String']['output']>;
  reverse_thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SubjectInfoResponse = {
  __typename?: 'SubjectInfoResponse';
  category?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  issuer?: Maybe<Issuer>;
  liked?: Maybe<Scalars['Boolean']['output']>;
  likesCount?: Maybe<Scalars['Int']['output']>;
  max_year?: Maybe<Scalars['Int']['output']>;
  min_year?: Maybe<Scalars['Int']['output']>;
  obverse_thumbnail?: Maybe<Scalars['String']['output']>;
  reverse_thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SubjectUpdate = {
  category?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  issuer?: InputMaybe<Scalars['String']['input']>;
  max_year?: InputMaybe<Scalars['Int']['input']>;
  min_year?: InputMaybe<Scalars['Int']['input']>;
  obverse_thumbnail?: InputMaybe<Scalars['String']['input']>;
  reverse_thumbnail?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Token = {
  __typename?: 'Token';
  value: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  friends?: Maybe<Array<User>>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  passwordHash?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserCreate = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserCreateUpdateResponse = {
  __typename?: 'UserCreateUpdateResponse';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  friends?: Maybe<Array<UserResponse>>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UserUpdate = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Token', value: string } | null };

export type GetSubjectQueryVariables = Exact<{
  getSubjectId: Scalars['String']['input'];
}>;


export type GetSubjectQuery = { __typename?: 'Query', getSubject?: { __typename?: 'SubjectInfoResponse', id: string, title: string, category?: string | null, min_year?: number | null, max_year?: number | null, obverse_thumbnail?: string | null, reverse_thumbnail?: string | null, liked?: boolean | null, likesCount?: number | null } | null };

export type AddFavoriteMutationVariables = Exact<{
  addFavoriteId: Scalars['String']['input'];
}>;


export type AddFavoriteMutation = { __typename?: 'Mutation', addFavorite?: Array<string> | null };

export type RemoveFavoriteMutationVariables = Exact<{
  removeFavoriteId: Scalars['String']['input'];
}>;


export type RemoveFavoriteMutation = { __typename?: 'Mutation', removeFavorite?: Array<string> | null };

export type AllSubjectsQueryVariables = Exact<{
  category?: InputMaybe<Scalars['String']['input']>;
}>;


export type AllSubjectsQuery = { __typename?: 'Query', allSubjects?: Array<{ __typename?: 'Subject', id: string, title: string, obverse_thumbnail?: string | null, reverse_thumbnail?: string | null }> | null };

export type GetUserQueryVariables = Exact<{
  getUserId: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'NonSensitiveUser', id: string, username: string, name: string, createdAt?: any | null, updatedAt?: any | null, favorites?: Array<{ __typename?: 'Subject', id: string, title: string }> | null } | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetSubjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getSubjectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSubject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getSubjectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"min_year"}},{"kind":"Field","name":{"kind":"Name","value":"max_year"}},{"kind":"Field","name":{"kind":"Name","value":"obverse_thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"reverse_thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"liked"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}}]}}]}}]} as unknown as DocumentNode<GetSubjectQuery, GetSubjectQueryVariables>;
export const AddFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addFavoriteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addFavoriteId"}}}]}]}}]} as unknown as DocumentNode<AddFavoriteMutation, AddFavoriteMutationVariables>;
export const RemoveFavoriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFavorite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeFavoriteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFavorite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeFavoriteId"}}}]}]}}]} as unknown as DocumentNode<RemoveFavoriteMutation, RemoveFavoriteMutationVariables>;
export const AllSubjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllSubjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allSubjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"obverse_thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"reverse_thumbnail"}}]}}]}}]} as unknown as DocumentNode<AllSubjectsQuery, AllSubjectsQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getUserId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getUserId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"favorites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;