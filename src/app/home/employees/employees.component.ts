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
import { NzAlertModule } from 'ng-zorro-antd/alert';
import {Utils, ColumnItem} from './../utils';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  validateForm!: FormGroup;
  listData: User[] = [];
  isListHide: boolean = false;
  listOfColumns: ColumnItem[];
  
  constructor(private formBuilder: FormBuilder) {
      this.listOfColumns = Utils.listOfColumns;
  }

  async ngOnInit(): Promise<void> {
    //this.listData = MockData as User[];
    this.validateForm = this.formBuilder.group({
      id: [null],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      favMovie: [null,[Validators.required]],
      likes: [null,[Validators.required]],
      gender: [null,[Validators.required]]
    });
    
    await this.getEmployees().then(data => {
      this.listData = data;
      Utils.updateColumnInfomation(data);
    });
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

  onUpdate(id){
    let user = this.listData.filter(item => item.id === id)?.[0];
    if(user){
      this.validateForm.setValue({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        favMovie: user.favourite_movie,
        likes: user.likes_popcorn.toString(),
        gender: user.gender
     });
    }
    this.isListHide = true;
  }

  onRowSelect(event, id){
    if(event.target.id === "action")
      return;
    this.onUpdate(id);
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
      let id = this.validateForm.controls['id'].value;
      let first_name = this.validateForm.controls['firstName'].value ;
      let last_name = this.validateForm.controls['lastName'].value ;
      let favourite_movie = this.validateForm.controls['favMovie'].value ;
      let likes_popcorn = this.validateForm.controls['likes'].value ;
      let gender = this.validateForm.controls['gender'].value ;
      if(id){
        await API.graphql(graphqlOperation(mutations.updateEmployee, {input: { id: id, first_name: first_name, last_name: last_name, favourite_movie: favourite_movie, likes_popcorn: likes_popcorn, gender: gender }}));
      }else{
        await API.graphql(graphqlOperation(mutations.createEmployee, {input: { first_name: first_name, last_name: last_name, favourite_movie: favourite_movie, likes_popcorn: likes_popcorn, gender: gender }}));
      }
      await this.getEmployees().then(data => this.listData = data);
      this.isListHide = false;
      //alert("Employee data added" + " : " + this.validateForm.controls['firstName'].value + " " + this.validateForm.controls['lastName'].value + " " + this.validateForm.controls['favMovie'].value + " " + this.validateForm.controls['likes'].value + " " + this.validateForm.controls['gender'].value  );
      this.validateForm.reset();
    }
  }
}
