import { Component, ChangeDetectionStrategy, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';
import * as _ from 'lodash';
import * as moment from 'moment/moment';

import { PlayerService } from '../_services';
import { IPlayer, Player } from '../_models';

// declare var moment: any;

@Component({
    selector: 'app-player',
    templateUrl: './player-detail.component.html',
    styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {

    action: string;
    playerId: string;
    player: IPlayer;
    message = '';
    feet = 0;
    inches = 0;
    centimeters = 0;
    height_unit = 'ft'; // 'ft' or 'cm'

    public form: FormGroup;
    public title: AbstractControl;
    constructor(
        private fb: FormBuilder,
        private ngZone: NgZone,
        private router: Router,
        private route: ActivatedRoute,
        private playerService: PlayerService) {

        this.action = route.snapshot.params['action'];
        this.playerId = route.snapshot.params['playerId'] || '';
        console.log('Jaguars player create/edit component initialized. playerId: ' + this.playerId);

        this.player = new Player();
        if (this.action === 'edit' && this.playerId !== '') {
            this.playerService.getPlayer(this.playerId).subscribe(data => {
                const height = data.player_height;
                if (/\d{1}ft .*\din$/.test(height)) {
                    this.feet = +height.substring(0, 1);
                    this.inches = +height.substring(4, height.indexOf('in'));
                    this.height_unit = 'ft';
                } else if (/.*\dcm$/.test(height)) {
                    this.centimeters = +height.substring(0, height.indexOf('cm'));
                    this.height_unit = 'cm';
                } else if (!isNaN(Number(height))) {
                    this.centimeters = Number(height);
                    this.height_unit = 'cm';
                }
                this.player = data;
            });
        }
    }

    ngOnInit() {
        this.form = this.fb.group({
            player_id: [null, null],
            player_number: [null, Validators.compose([Validators.required, CustomValidators.min])],
            player_name: [null, Validators.compose([Validators.required])],
            player_position: [null, Validators.compose([Validators.required])],
            feet: [null, null],
            inches: [null, null],
            centimeters: [null, null],
            height_unit: [null, null],
            player_weight: [null, null],
            player_age: [null, null],
            player_exp: [null, null],
            player_college: [null, null],
        });
        this.form.valueChanges.subscribe(() => { this.message = ''; });
    }

    onSubmit(value, valid) {
        this.message = '';
        if (valid) {

            this.ngZone.run(() => {
                const data: Player = {
                    player_id: +this.playerId,
                    player_number: value.player_number,
                    player_name: value.player_name,
                    player_age: value.player_age,
                    player_position: value.player_position,
                    player_college: value.player_college,
                    player_exp: value.player_exp,
                    player_weight: value.player_weight,
                    player_height: value.height_unit === 'cm' ? `${value.centimeters}cm` : `${value.feet}ft ${value.inches}in`
                };
                if (this.action === 'add') {
                    this.playerService.addPlayer(data).subscribe((response) => {
                        if (response.status === 'true') {
                            this.router.navigate(['player_list']);
                        } else {
                            this.message = response.message;
                        }
                    });
                } else {
                    this.playerService.updatePlayer(data).subscribe((response) => {
                        if (response.status === 'true') {
                            this.router.navigate(['player_list']);
                        } else {
                            this.message = response.message;
                        }
                    });
                }
            });
        }
    }
}
