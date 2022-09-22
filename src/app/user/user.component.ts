import { Component, OnInit, Input } from '@angular/core';
import { ListUser } from '../models/list-user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user: ListUser;

  constructor() { }

  ngOnInit() {}
}
