
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_MANAGEMENT_API } from '../../config/api/user-management-api';
import { Observable } from 'rxjs';
import { User } from './auth';

@Injectable({
    providedIn: 'root'
})
export class UserManagementService {
    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(USER_MANAGEMENT_API.getAllUsers);
    }

    deleteUser(id: string): Observable<void> {
        return this.http.delete<void>(USER_MANAGEMENT_API.deleteUser(id));
    }

    updateUser(id: string, data: Partial<User>): Observable<User> {
        return this.http.put<User>(USER_MANAGEMENT_API.updateUser(id), data);
    }

    getUser(id: string): Observable<User> {
        return this.http.get<User>(USER_MANAGEMENT_API.getUser(id));
    }
}
