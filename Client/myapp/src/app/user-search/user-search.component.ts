import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent  {
}
