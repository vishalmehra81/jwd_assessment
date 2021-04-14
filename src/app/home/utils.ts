import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { User } from 'src/type/users';

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn | null;
    listOfFilter: NzTableFilterList;
    filterFn: NzTableFilterFn | null;
    filterMultiple: boolean;
    sortDirections: NzTableSortOrder[];
}

export class Utils {
    // static doSomething(val: string) { return val; }
    // static doSomethingElse(val: string) { return val; }

    static listOfColumns: ColumnItem[] = [
        {
          name: 'First Name',
          sortOrder: 'ascend',
          sortFn: (a: User, b: User) => a.first_name.localeCompare(b.first_name),
          sortDirections: ['ascend', 'descend', null],
          filterMultiple: true,
          listOfFilter: [
            //{ text: 'Bastian', value: 'Bastian' },
            // { text: 'Raymond', value: 'Raymond', byDefault: true }
          ],
          filterFn: (list: string[], item: User) => list.some(name => item.first_name.indexOf(name) !== -1)
        },
        {
          name: 'Last Name',
          sortOrder: 'ascend',
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

      static updateColumnInfomation(users){
        users.forEach(user => {
            let columnsInfo = this.listOfColumns;
            columnsInfo = columnsInfo.map(column  => {
              return {
                ...column,
                listOfFilter : this.getListOfFilters(column, user)
              }
            }) as ColumnItem[];
            this.listOfColumns = columnsInfo;
        });
      }
    
      static getListOfFilters(column, user){
        let listOfFilters = column.listOfFilter;
        switch (column.name) {
          case "First Name":
            listOfFilters = !listOfFilters.some(item => item.text === user.first_name) ? listOfFilters.concat({ text: user.first_name, value: user.first_name }) : listOfFilters
            break;
    
          case "Last Name":
            listOfFilters = !listOfFilters.some(item => item.text === user.last_name) ? listOfFilters.concat({ text: user.last_name, value: user.last_name }) : listOfFilters
            break;
    
          case "Gender":
            listOfFilters = !listOfFilters.some(item => item.text === user.gender) ? listOfFilters.concat({ text: user.gender, value: user.gender }) : listOfFilters
            break;
        
          default:
            break;
        }
        return listOfFilters;
      }
}
