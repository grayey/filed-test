import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { NotificationService } from '../../services/notifications.service';
import { ValidationErrorService } from '../../services/validation-error.service';
import { EventsService } from '../../services/event.service';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [NotificationComponent],
    exports: [NotificationComponent],
    providers: [
      NotificationService,
      ValidationErrorService,
      EventsService
    ]
})
export class NotificationModule { }
