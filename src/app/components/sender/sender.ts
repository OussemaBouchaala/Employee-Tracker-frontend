import { Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification';
@Component({
  selector: 'app-sender',
  imports: [FormsModule],
  templateUrl: './sender.html',
  styleUrl: './sender.css',
})
export class Sender {
 constructor(private notificationService: NotificationService) {}
message=signal('');
send=effect(()=>{
  console.log('Sender message:', this.message());
this.notificationService.send(this.message()).subscribe();
});

}
