import { Component, OnInit } from '@angular/core';
import MockData from './../../../assets/mock_data_(5).json';
import {User} from './../../../type/users';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

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
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor() { }
  listData: User[]= [];

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
    }
  ];

  ngOnInit(): void {
    this.listData = MockData as User[];
    console.log(this.listData);
  }

  onCurrentPageDataChange($event: ReadonlyArray<User>): void {
  }

}
