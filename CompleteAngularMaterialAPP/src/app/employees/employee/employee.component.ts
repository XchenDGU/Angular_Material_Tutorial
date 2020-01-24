import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService:EmployeeService,
    private departmentService:DepartmentService,
    private notificationService:NotificationService,
    public dialogRef:MatDialogRef<EmployeeComponent>) { }
  
  //@Inject(MAT_DIALOG_DATA) data:

  ngOnInit() {
    this.employeeService.getEmployees();
  }

  onClear(){
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
    this.notificationService.success(':: Cleared successfully');
  }

  onSubmit(){
    if(this.employeeService.form.valid){
      if(!this.employeeService.form.get('$key').value)
        this.employeeService.insertEmployee(this.employeeService.form.value);
      else
        this.employeeService.updateEmployee(this.employeeService.form.value);
      
      this.employeeService.form.reset();
      this.employeeService.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onClose(){
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
    this.dialogRef.close();
  }
}
