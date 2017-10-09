import { Component, ChangeDetectionStrategy, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { ILiveStream, LiveStream } from '../_models';
import { AuthService, LiveStreamService } from '../_services';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-livestream',
  templateUrl: './liveStream.component.html',
  styleUrls: ['./liveStream.component.scss']
})
export class LiveStreamComponent implements OnInit {

  liveStreamId: string;
  message = '';
  Livestream: ILiveStream;

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private authService: AuthService,
    private liveStreamService: LiveStreamService) {
  }
  ngOnInit() {
    this.form = this.fb.group({
      status: [null, null],
    });
    this.form.valueChanges.subscribe(() => { this.message = ''; });
    this.liveStreamService.getLiveStream().subscribe(response => {
      console.log(response);
      if (response['status'] === 'true') {
        this.form.patchValue({
          status: (response['data']['setting_value'] === 'OFF' ? 0 : 1)
        });
      } else {
        this.form.patchValue({
          status: 0
        });
      }
    });
  }
  onSubmit(value, valid) {
    this.message = '';
    if (valid) {
      const data: LiveStream = {
        status: value.status ? 'ON' : 'OFF',
      };
      console.log(data);
      this.liveStreamService.updateLiveStream(data).subscribe(response => {
        if (response.status === 'true') {
          window.location.reload();
        } else {
          alert(response.message);
        }
      });
    }
  }

}
