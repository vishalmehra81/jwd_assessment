import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Employee {
  readonly id: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly favourite_movie: string;
  readonly likes_popcorn: boolean;
  readonly gender: string;
  constructor(init: ModelInit<Employee>);
  static copyOf(source: Employee, mutator: (draft: MutableModel<Employee>) => MutableModel<Employee> | void): Employee;
}