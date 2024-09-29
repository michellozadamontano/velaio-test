import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/models/user.interface';


@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {

  @Input() person: IUser = {} as IUser;
}
