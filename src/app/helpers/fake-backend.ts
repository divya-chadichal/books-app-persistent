import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = [{
    "firstname": "divya",
    "lastname": "jadhav",
    "username": "dcjd",
    "password": "dcjd@123",
    "isLoggedIn": false
}];

@Injectable()
export class FakeBackendProvider implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                default:
                    return next.handle(request);
            }    
        }

        // route functions
        function authenticate() {
            var userData = body;
            if(users.length) {
                const user = users.find(x => x.username === userData.username && x.password === userData.password);
                const userIndex = users.findIndex(element => element.username == user.username)
                if (user) {
                    users[userIndex].isLoggedIn = true;
                    return ok(true);
                }
            }
            return error(false);
        }

        function register() {
            const user = body;
            if(users.length){
                if (users.find(x => x.username === user.username)) {
                    return ok(false);
                }
                return ok(true);
            }
            users.push(user);  
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500));
        }

        function error(message) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function getAllUsers () {
            return users;
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendProvider,
    multi: true
};