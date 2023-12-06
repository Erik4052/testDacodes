import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserDetailsComponent } from './user-details.component';
import { UserService } from '../services/user.service';
import { MaterialModule } from '../material/material.module';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userService: jasmine.SpyObj<UserService>;

  const mockActivatedRoute = {
    params: of({ username: 'testuser' }),
  };

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserDetails']);
    TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports:[MaterialModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UserService, useValue: userServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUserDetails on initialization', () => {
    const mockUser:any = { login: 'testuser', followers: 42 }; 

    userService.getUserDetails.and.returnValue(of(mockUser));

    fixture.detectChanges();

    expect(userService.getUserDetails).toHaveBeenCalledWith('testuser');
    expect(component.user).toEqual(mockUser);
  });

});
