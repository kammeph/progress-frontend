import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from 'src/app/store/app.action';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'progress-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Select(AppState.isLoggedIn) isLoggedIn$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  logout() {
    this.store.dispatch(new Logout());
  }
}
