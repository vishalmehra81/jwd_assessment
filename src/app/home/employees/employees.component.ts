import { Component, OnInit } from '@angular/core';
import MockData from './../../../assets/mock_data_(5).json';
import {User} from './../../../type/users';
import {Employee} from './../../../type/employee';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule,FormBuilder,FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import * as queries from './../../../graphql/queries';
import * as mutations from './../../../graphql/mutations';
import * as subscriptions from './../../../graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import  { GetEmployeeQueryVariables, ListEmployeesQuery, ListEmployeesQueryVariables }  from './../../API.service';
import {GraphQLResult} from '@aws-amplify/api-graphql';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  validateForm!: FormGroup;
  listData: User[] = [];
  isListHide: boolean = false;

  listOfColumns: ColumnItem[] = [
    {
      name: 'First Name',
      sortOrder: null,
      sortFn: (a: User, b: User) => a.first_name.localeCompare(b.first_name),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Bastian', value: 'Bastian' },
        { text: 'Raymond', value: 'Raymond' }
        // { text: 'Raymond', value: 'Raymond', byDefault: true }
      ],
      filterFn: (list: string[], item: User) => list.some(name => item.first_name.indexOf(name) !== -1)
    },
    {
      name: 'Last Name',
      sortOrder: null,
      sortFn: (a: User, b: User) => a.last_name.localeCompare(b.last_name),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: (list: string[], item: User) => list.some(name => item.last_name.indexOf(name) !== -1),
      filterMultiple: true
    },
    {
      name: 'Favourite Movie',
      sortOrder: null,
      sortFn: (a: User, b: User) => a.favourite_movie.localeCompare(b.favourite_movie),
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: (list: string[], item: User) => list.some(name => item.favourite_movie.indexOf(name) !== -1),
      filterMultiple: true
    },
    {
      name: 'Likes Popcorn',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: User, b: User) => {return Number(a.likes_popcorn) - Number(b.likes_popcorn)} ,
      filterMultiple: true,
      listOfFilter: [],
      filterFn: null
    },
    {
      name: 'Gender',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: User, b: User) =>  a.gender.localeCompare(b.gender),
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: User) => list.some(name => item.gender.indexOf(name) !== -1)
    },
    {
      name: 'Action',
      sortOrder: null,
      sortDirections: ['ascend', 'descend', null],
      sortFn: null,
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null
    }
    
  ];

  constructor(private formBuilder: FormBuilder) { }

   async ngOnInit(): Promise<void> {
    //this.listData = MockData as User[];
    this.validateForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      favMovie: [null,[Validators.required]],
      likes: [null,[Validators.required]],
      gender: [null,[Validators.required]]
    });
    
    await this.getEmployees().then(data => this.listData = data);
  }

  async getEmployees(){
    let users: User[] = [];
    const listQV: ListEmployeesQueryVariables = {};
    const listGQL: GraphQLResult<ListEmployeesQuery> = 
    await API.graphql(graphqlOperation(queries.listEmployees, listQV)) as GraphQLResult<ListEmployeesQuery>;
    if (listGQL.data) {
      const listQ: ListEmployeesQuery = listGQL.data;
      if (listQ.listEmployees && listQ.listEmployees.items) {
        listQ.listEmployees.items.forEach((item) => {
          if (item) {
            let employee = new User();
            employee.id = item.id;
            employee.first_name = item.first_name;
            employee.last_name = item.last_name;
            employee.gender = item.gender;
            employee.favourite_movie = item.favourite_movie;
            employee.likes_popcorn = item.likes_popcorn;
            users.push(employee);
          }
        });
      }
    }
    return users;
  }

  async onDelete(id){
    await API.graphql(graphqlOperation(mutations.deleteEmployee, { input: { id: id }}));
    await this.getEmployees().then(data => this.listData = data);
  }

  addEmployee(){
    this.isListHide = true;
  }

  backToEmployee()
  {
    this.isListHide=false;
    this.validateForm.reset();
  }

  async onSubmit(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.valid){
    let user = new User();
    let first_name = this.validateForm.controls['firstName'].value ;
    let last_name = this.validateForm.controls['lastName'].value ;
    let favourite_movie = this.validateForm.controls['favMovie'].value ;
    let likes_popcorn = this.validateForm.controls['likes'].value ;
    let gender = this.validateForm.controls['gender'].value ;
    await API.graphql(graphqlOperation(mutations.createEmployee, {input: { first_name: first_name, last_name: last_name, favourite_movie:favourite_movie, likes_popcorn: likes_popcorn, gender: gender }}));
    await this.getEmployees().then(data => this.listData = data);
    this.isListHide = false;
    
    alert("Employee data added" + " : " + this.validateForm.controls['firstName'].value + " " + this.validateForm.controls['lastName'].value + " " + this.validateForm.controls['favMovie'].value + " " + this.validateForm.controls['likes'].value + " " + this.validateForm.controls['gender'].value  );
    this.validateForm.reset();
    }
  }

  onCurrentPageDataChange($event: ReadonlyArray<User>): void {
  }
}
