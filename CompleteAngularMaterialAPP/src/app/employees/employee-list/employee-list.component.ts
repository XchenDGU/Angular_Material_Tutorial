import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource, MatSort,MatPaginator } from '@angular/material';
import { DepartmentService } from 'src/app/shared/department.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { EmployeeComponent } from '../employee/employee.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  listData:MatTableDataSource<any>;
  displayedColumns:string[] = ['fullName','email','mobile','city','departmentName','actions'];
  @ViewChild(MatSort,{static: true}) sort:MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey:string;

  constructor(private employeeService:EmployeeService,
    private departmentService:DepartmentService,
    private dialog:MatDialog,
    private notificationService:NotificationService,
    private dialogService:DialogService) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(
      list=>{
        let array = list.map(item=>{
          let departmentName=this.departmentService.getDepartmentName(item.payload.val()['department']);
          return {
            $key:item.key,
            departmentName,
            ...item.payload.val()
          }
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.listData.filterPredicate = (data,filter)=>{
          return this.displayedColumns.some(ele=>{
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) !=-1;
          });
        }
      }
    );
  }

  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.employeeService.initializeFormGroup();
    this.openDialog();
  }

  onEdit(row){
    console.log(row);
    this.employeeService.populateForm(row);
    this.openDialog();
  }

  onDelete($key){
  
    this.dialogService.openConfirmDialog('Are you sure to delete this record')
    .afterClosed().subscribe(
      res=>{
        console.log(res);
        if(res){
          this.employeeService.deleteEmployee($key);
          this.notificationService.warn('! Deleted successfully');
        }
      }
    );
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; //close the window by clicking outside or by pressing escape
    dialogConfig.autoFocus = true;
    dialogConfig.width="60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }
}
