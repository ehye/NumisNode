import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { AuthContext } from '../../types/AuthContext';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  addAsFavorite?: Maybe<Scalars['Boolean']['output']>;
  createIssuer?: Maybe<Issuer>;
  createSubject?: Maybe<Subject>;
  createUser?: Maybe<UserCreateUpdateResponse>;
  login?: Maybe<Token>;
  updateIssuer?: Maybe<Issuer>;
  updateSubject?: Maybe<Subject>;
  updateUser?: Maybe<UserCreateUpdateResponse>;
};


export type MutationAddAsFavoriteArgs = {
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


export type MutationUpdateIssuerArgs = {
  input: IssuerUpdate;
};


export type MutationUpdateSubjectArgs = {
  input: SubjectUpdate;
};


export type MutationUpdateUserArgs = {
  input: UserUpdate;
};

export type Query = {
  __typename?: 'Query';
  allIssuers?: Maybe<Array<Issuer>>;
  allSubjects?: Maybe<Array<Subject>>;
  allUsers?: Maybe<Array<UserResponse>>;
  getIssuer?: Maybe<Issuer>;
  getSubject?: Maybe<Subject>;
  getUser?: Maybe<UserResponse>;
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
  id?: Maybe<Scalars['ID']['output']>;
  issuer?: Maybe<Issuer>;
  max_year?: Maybe<Scalars['Int']['output']>;
  min_year?: Maybe<Scalars['Int']['output']>;
  obverse_thumbnail?: Maybe<Scalars['String']['output']>;
  reverse_thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
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
  favorites?: Maybe<Array<Subject>>;
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
  favorites?: Maybe<Array<Subject>>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Issuer: ResolverTypeWrapper<Issuer>;
  IssuerCreate: IssuerCreate;
  IssuerUpdate: IssuerUpdate;
  MeInfo: ResolverTypeWrapper<MeInfo>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subject: ResolverTypeWrapper<Subject>;
  SubjectCreate: SubjectCreate;
  SubjectUpdate: SubjectUpdate;
  Token: ResolverTypeWrapper<Token>;
  User: ResolverTypeWrapper<User>;
  UserCreate: UserCreate;
  UserCreateUpdateResponse: ResolverTypeWrapper<UserCreateUpdateResponse>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  UserUpdate: UserUpdate;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Issuer: Issuer;
  IssuerCreate: IssuerCreate;
  IssuerUpdate: IssuerUpdate;
  MeInfo: MeInfo;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Subject: Subject;
  SubjectCreate: SubjectCreate;
  SubjectUpdate: SubjectUpdate;
  Token: Token;
  User: User;
  UserCreate: UserCreate;
  UserCreateUpdateResponse: UserCreateUpdateResponse;
  UserResponse: UserResponse;
  UserUpdate: UserUpdate;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type IssuerResolvers<ContextType = AuthContext, ParentType extends ResolversParentTypes['Issuer'] = ResolversParentTypes['Issuer']> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  wikidata_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MeInfoResolvers<ContextType = AuthContext, ParentType extends ResolversParentTypes['MeInfo'] = ResolversParentTypes['MeInfo']> = ResolversObject<{
  exp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  iat?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = AuthContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addAsFavorite?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddAsFavoriteArgs, 'id'>>;
  createIssuer?: Resolver<Maybe<ResolversTypes['Issuer']>, ParentType, ContextType, RequireFields<MutationCreateIssuerArgs, 'input'>>;
  createSubject?: Resolver<Maybe<ResolversTypes['Subject']>, ParentType, ContextType, RequireFields<MutationCreateSubjectArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['UserCreateUpdateResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  login?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  updateIssuer?: Resolver<Maybe<ResolversTypes['Issuer']>, ParentType, ContextType, RequireFields<MutationUpdateIssuerArgs, 'input'>>;
  updateSubject?: Resolver<Maybe<ResolversTypes['Subject']>, ParentType, ContextType, RequireFields<MutationUpdateSubjectArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UserCreateUpdateResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
}>;

export type QueryResolvers<ContextType = AuthContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  allIssuers?: Resolver<Maybe<Array<ResolversTypes['Issuer']>>, ParentType, ContextType>;
  allSubjects?: Resolver<Maybe<Array<ResolversTypes['Subject']>>, ParentType, ContextType, Partial<QueryAllSubjectsArgs>>;
  allUsers?: Resolver<Maybe<Array<ResolversTypes['UserResponse']>>, ParentType, ContextType>;
  getIssuer?: Resolver<Maybe<ResolversTypes['Issuer']>, ParentType, ContextType, RequireFields<QueryGetIssuerArgs, 'id'>>;
  getSubject?: Resolver<Maybe<ResolversTypes['Subject']>, ParentType, ContextType, RequireFields<QueryGetSubjectArgs, 'id'>>;
  getUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['MeInfo']>, ParentType, ContextType>;
}>;

export type SubjectResolvers<ContextType = AuthContext, ParentType extends ResolversParentTypes['Subject'] = ResolversParentTypes['Subject']> = ResolversObject<{
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  issuer?: Resolver<Maybe<ResolversTypes['Issuer']>, ParentType, ContextType>;
  max_year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  min_year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  obverse_thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reverse_thumbnail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenResolvers<ContextType = AuthContext, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = ResolversObject<{
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = AuthContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  favorites?: Resolver<Maybe<Array<ResolversTypes['Subject']>>, ParentType, ContextType>;
  friends?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passwordHash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserCreateUpdateResponseResolvers<ContextType = AuthContext, ParentType extends ResolversParentTypes['UserCreateUpdateResponse'] = ResolversParentTypes['UserCreateUpdateResponse']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResponseResolvers<ContextType = AuthContext, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  favorites?: Resolver<Maybe<Array<ResolversTypes['Subject']>>, ParentType, ContextType>;
  friends?: Resolver<Maybe<Array<ResolversTypes['UserResponse']>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = AuthContext> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Issuer?: IssuerResolvers<ContextType>;
  MeInfo?: MeInfoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subject?: SubjectResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserCreateUpdateResponse?: UserCreateUpdateResponseResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
}>;

