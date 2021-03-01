import { Component, OnInit } from '@angular/core';
import MockData from './../../../assets/mock_data_(5).json';
import {User} from './../../../type/users';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule,FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  listData: User[] = [];
  isListHide: boolean = false;
  messageForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder) { 
    this.messageForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName: ['', Validators.required],
      favMovie: ['', Validators.required],
      likes: ['', Validators.required],
      gender: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.listData = MockData as User[];
    console.log(this.listData);
  }

  onDelete(id){
    this.listData = this.listData.filter(item => item.id !== id);
  }

  addEmployee(){
    this.isListHide = true;
  }

  onSubmit(){
    this.submitted = true;
    if(this.messageForm.invalid){
      return;
    }
    this.success = true;

    // let id = this.listData[this.listData.length - 1].id + 1;
    // let first_name = this.messageForm.controls['firstName'].value ;
    // let last_name = this.messageForm.controls['lastName'].value ;
    // let favourite_movie = this.messageForm.controls['favMovie'].value ;
    // let likes_popcorn = this.messageForm.controls['likes'].value ;
    // let gender = this.messageForm.controls['gender'].value ;
    let user = new User();
    user.id = this.listData[this.listData.length - 1].id + 1;
    user.first_name = this.messageForm.controls['firstName'].value ;
    user.last_name = this.messageForm.controls['lastName'].value ;
    user.favourite_movie = this.messageForm.controls['favMovie'].value ;
    user.likes_popcorn = this.messageForm.controls['likes'].value ;
    user.gender = this.messageForm.controls['gender'].value ;

    this.listData.push(user);
    this.isListHide = false;
    alert("Employee data added" + " : " + this.messageForm.controls['firstName'].value + " " + this.messageForm.controls['lastName'].value + " " + this.messageForm.controls['favMovie'].value + " " + this.messageForm.controls['likes'].value + " " + this.messageForm.controls['gender'].value  );
  }

}
