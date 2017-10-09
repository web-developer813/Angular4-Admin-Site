import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PlayerService } from '../_services';

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {
    rows = [];
    selected: any[] = [];
    temp = [];

    constructor(private router: Router, private playerService: PlayerService) {
        this.reloadList();
    }

    reloadList() {
        this.playerService.getAllPlayerList().subscribe(data => {
            if (data) {
                this.temp = [...data];
                this.rows = data;
                console.log('players fetched.', this.temp);
            }
        });
    }

    updateFilter(event) {
        const val = event.target.value;
        // filter our data
        const temp = this.temp.filter(function (d) {
            return d.playerNumber && d.playerNumber.toLowerCase().indexOf(val) !== -1 ||
                d.playerName && d.playerName.toLowerCase().indexOf(val) !== -1 ||
                d.position && d.position.toLowerCase().indexOf(val) !== -1 ||
                d.college && d.college.toLowerCase().indexOf(val) !== -1 || !val;
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

    onAddPlayer() {
        console.log(`Event: Adding player`);
        this.router.navigate(['player/add']);
    }

    onEditPlayer(playerId) {
        console.log(`Event: Editing player: ${playerId}`);
        this.router.navigate(['player/edit/' + playerId]);
    }

    onDeletePlayer(playerId) {
        console.log('Event: Deleting a player: ', playerId);
        if (confirm('Do you really want to delete this player?')) {
            this.playerService.deletePlayer(playerId).subscribe(data => {
                console.log(data);
                if (data.status === 'true') {
                    this.reloadList();
                } else {
                    alert(data.message);
                }
            });
        }
    }
}
