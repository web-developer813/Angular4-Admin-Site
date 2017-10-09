import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../_services';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
    rows = [];
    selected: any[] = [];
    temp = [];

    constructor(private router: Router, private userService: UserService) {
        this.userService.getAllUserList()
            .subscribe(data => {
                if (data) {
                    this.temp = [...data];
                    this.rows = data;
                    console.log('users fetched.', this.temp);
                }
            });
    }

    updateFilter(event) {
        const val = event.target.value;
        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.fullName.toLowerCase().indexOf(val) !== -1 ||
                d.emailAddress.toLowerCase().indexOf(val) !== -1 ||
                d.birthday && d.birthday.toLowerCase().indexOf(val) !== -1 ||
                d.phone && d.phone.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
    }

    onSelect(event) {
        console.log('Event: select', event, this.selected);
    }

    onActivate(event) {
        // console.log('Event: activate', event);
    }

    onAddUser() {
        console.log(`Event: Adding user`);
        this.router.navigate(['user/add']);
    }

    onEditUser(userId) {
        console.log(`Event: Editing user: ${userId}`);
        this.router.navigate(['user/edit/' + userId]);
    }

    onDeleteUser(userId) {
        console.log('Event: Deleting an user: ', userId);
        this.userService.deleteUser(userId)
            .subscribe(data => {
                console.log(data);
            });
    }
}
