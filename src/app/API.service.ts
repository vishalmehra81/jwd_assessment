/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateEmployeeInput = {
  id?: string | null,
  first_name: string,
  last_name: string,
  favourite_movie: string,
  likes_popcorn: boolean,
  gender: string,
};

export type ModelEmployeeConditionInput = {
  first_name?: ModelStringInput | null,
  last_name?: ModelStringInput | null,
  favourite_movie?: ModelStringInput | null,
  likes_popcorn?: ModelBooleanInput | null,
  gender?: ModelStringInput | null,
  and?: Array< ModelEmployeeConditionInput | null > | null,
  or?: Array< ModelEmployeeConditionInput | null > | null,
  not?: ModelEmployeeConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Employee = {
  __typename: "Employee",
  id?: string,
  first_name?: string,
  last_name?: string,
  favourite_movie?: string,
  likes_popcorn?: boolean,
  gender?: string,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateEmployeeInput = {
  id: string,
  first_name?: string | null,
  last_name?: string | null,
  favourite_movie?: string | null,
  likes_popcorn?: boolean | null,
  gender?: string | null,
};

export type DeleteEmployeeInput = {
  id?: string | null,
};

export type ModelEmployeeFilterInput = {
  id?: ModelIDInput | null,
  first_name?: ModelStringInput | null,
  last_name?: ModelStringInput | null,
  favourite_movie?: ModelStringInput | null,
  likes_popcorn?: ModelBooleanInput | null,
  gender?: ModelStringInput | null,
  and?: Array< ModelEmployeeFilterInput | null > | null,
  or?: Array< ModelEmployeeFilterInput | null > | null,
  not?: ModelEmployeeFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelEmployeeConnection = {
  __typename: "ModelEmployeeConnection",
  items?:  Array<Employee | null > | null,
  nextToken?: string | null,
};

export type CreateEmployeeMutationVariables = {
  input?: CreateEmployeeInput,
  condition?: ModelEmployeeConditionInput | null,
};

export type CreateEmployeeMutation = {
  createEmployee?:  {
    __typename: "Employee",
    id: string,
    first_name: string,
    last_name: string,
    favourite_movie: string,
    likes_popcorn: boolean,
    gender: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateEmployeeMutationVariables = {
  input?: UpdateEmployeeInput,
  condition?: ModelEmployeeConditionInput | null,
};

export type UpdateEmployeeMutation = {
  updateEmployee?:  {
    __typename: "Employee",
    id: string,
    first_name: string,
    last_name: string,
    favourite_movie: string,
    likes_popcorn: boolean,
    gender: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteEmployeeMutationVariables = {
  input?: DeleteEmployeeInput,
  condition?: ModelEmployeeConditionInput | null,
};

export type DeleteEmployeeMutation = {
  deleteEmployee?:  {
    __typename: "Employee",
    id: string,
    first_name: string,
    last_name: string,
    favourite_movie: string,
    likes_popcorn: boolean,
    gender: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetEmployeeQueryVariables = {
  id?: string,
};

export type GetEmployeeQuery = {
  getEmployee?:  {
    __typename: "Employee",
    id: string,
    first_name: string,
    last_name: string,
    favourite_movie: string,
    likes_popcorn: boolean,
    gender: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListEmployeesQueryVariables = {
  filter?: ModelEmployeeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEmployeesQuery = {
  listEmployees?:  {
    __typename: "ModelEmployeeConnection",
    items?:  Array< {
      __typename: "Employee",
      id: string,
      first_name: string,
      last_name: string,
      favourite_movie: string,
      likes_popcorn: boolean,
      gender: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateEmployeeSubscription = {
  onCreateEmployee?:  {
    __typename: "Employee",
    id: string,
    first_name: string,
    last_name: string,
    favourite_movie: string,
    likes_popcorn: boolean,
    gender: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateEmployeeSubscription = {
  onUpdateEmployee?:  {
    __typename: "Employee",
    id: string,
    first_name: string,
    last_name: string,
    favourite_movie: string,
    likes_popcorn: boolean,
    gender: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteEmployeeSubscription = {
  onDeleteEmployee?:  {
    __typename: "Employee",
    id: string,
    first_name: string,
    last_name: string,
    favourite_movie: string,
    likes_popcorn: boolean,
    gender: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
