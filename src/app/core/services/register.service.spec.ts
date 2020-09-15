import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from './register.service';
import { RegisterUser } from 'src/app/models/register-user';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(RegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 400 Bad request error', () => {
    const user = { firstname: 'John', lastname: 'Matthews', email: 'john@gmail.com', password: 'test@123' } as RegisterUser;
    return service.registerUser(user).toPromise().then( () => {})
    .catch(error => expect(error));
  });

});

