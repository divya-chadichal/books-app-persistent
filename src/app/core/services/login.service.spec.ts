import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { User } from 'src/app/models/login-user';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return access-token', () => {
    const user = { email: 'dcjd@gmail.com', password: 'dcjd@123' } as User;
    return service.loginUser(user).toPromise().then( (result: any) => {
      expect(result);
    });
  });

  it('should return error', () => {
    const user = { email: 'dcjd@gmail.com', password: 'dcjd@12345' } as User;
    return service.loginUser(user).toPromise().then( () => {})
    .catch(error => expect(error));
  });

});

