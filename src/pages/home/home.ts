import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { UsersQuery, UserSummaryFragment } from '../../__generated__';
import { Observable } from 'rxjs/Observable';

const query = gql`
  fragment UserSummary on User {
    id, name
  }

  query Users {
    allUsers(last: 100) {
      ...UserSummary,
    }
  }
`;

@Component({
  selector: 'page-home',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>Home</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <button ion-item *ngFor="let user of users$ | async">
          {{user.name}}
        </button>
      </ion-list>
    </ion-content>
  `,
})
export class HomePage {

  users$: Observable<UserSummaryFragment[]>;

  constructor(
    public navCtrl: NavController,
    private apollo: Apollo,
  ) {
    this.users$ = this.apollo.query<UsersQuery>({ query })
      .map(({ data }) => data.allUsers);
  }
}
