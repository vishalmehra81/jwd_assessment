import { Component, OnInit } from '@angular/core';
import MockData from './../../../assets/mock_data_(5).json';
import {User} from './../../../type/users';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { API, graphqlOperation } from 'aws-amplify';
import  { GetEmployeeQueryVariables, ListEmployeesQuery, ListEmployeesQueryVariables }  from './../../API.service';
import {GraphQLResult} from '@aws-amplify/api-graphql';
import * as queries from './../../../graphql/queries';
import {Utils, ColumnItem} from './../utils';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  listData: User[]= [];
  listOfColumns: ColumnItem[] = [];

  constructor() { 
    this.listOfColumns = [...Utils.listOfColumns.slice(0,Utils.listOfColumns.length - 1)];
  }

  async ngOnInit(): Promise<void> {
    await this.getEmployees().then(data => {
      this.listData = data
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
}
