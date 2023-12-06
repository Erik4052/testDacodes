import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators/custom-validators';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['login', 'id', 'avatar', 'score', 'site_admin'];
  searchForm!: FormGroup;
  pageSizeOptions: number[] = [5, 10, 20];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this._initForm();
  }


  searchUsers(): void {
    if (this.searchForm.valid) {
      const searchTerm = this.searchTerm;
      this.userService.searhUsers(searchTerm).subscribe(response => {
        this.dataSource.data = response.items;
        this._calculatePaginator(response);
      });
    }
  }

  private _calculatePaginator(response: any) {
    this.paginator.length = response.total_count;
    this.paginator.pageSizeOptions = this.pageSizeOptions;
    this.paginator.pageSize = this.pageSizeOptions[0];
    this.dataSource.paginator = this.paginator;
    this.paginator.pageIndex = 0;
  }


  clearSearch(): void {
    this.searchTermControl.setValue('');
    this.searchUsers();
  }


  private _initForm() {
    this.searchForm = this.fb.group({
      searchTerm: ['', [Validators.minLength(4), CustomValidators.forbiddenSearchTermValidator('MaxiGlobal')]]
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get searchTerm() {
    return this.searchForm.get('searchTerm')?.value;
  }

  get searchTermControl() {
    return this.searchForm.get('searchTerm') as FormControl;
  }
}
