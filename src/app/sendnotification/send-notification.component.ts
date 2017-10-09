import { Component, ChangeDetectionStrategy, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { ISendNotification, SendNotification } from '../_models';
import { AuthService, SendNotificationService } from '../_services';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.scss']
})
export class SendNotificationComponent implements OnInit {

  message = '';
  sendNotification: ISendNotification;
  sendNotificationId: string;
  send_message: string;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private authService: AuthService,
    private sendNotificationService: SendNotificationService) {

    this.sendNotificationId = route.snapshot.params['sendNotificationId'] || 0;
  }

  ngOnInit() {
    this.form = this.fb.group({
      send_message: [null, Validators.compose([Validators.required])],
    });
  }
  onSubmit(value, valid) {
    this.message = '';
    if (valid) {
      const data: SendNotification = {
        send_id: +this.sendNotificationId,
        message: this.send_message,
      };
      this.sendNotificationService.addSendNotification(data).subscribe(response => {
        if (response.status === 'true') {
          alert('Notification sent successfully.');
        } else {
          alert(response.message);
        }
      });
    }
  }


}
