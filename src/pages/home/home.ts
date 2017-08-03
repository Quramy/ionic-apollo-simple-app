import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';
import { UsersQuery, UserSummaryFragment } from '../../__generated__';
import { Observable } from 'rxjs/Observable';

const userFragment = gql`
  fragment UserSummary on User {
    id, name
  }
`;

const query = gql`
  query Users {
    viewer {
      users(first: 100) {
        edges {
          node {
            ...UserSummary,
          }
        }
      }
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
      <ion-list *ngIf="query$ | async">
        <button ion-item *ngFor="let user of query$ | async">
          {{user.name}}
        </button>
      </ion-list>
    </ion-content>
  `,
})
export class HomePage implements OnInit {

  query$: Observable<UserSummaryFragment[]>;

  constructor(
    public navCtrl: NavController,
    private apollo: Apollo,
  ) {
    this.query$ = this.apollo.watchQuery<UsersQuery>({ query })
      .map(({ data }) => data.viewer.users.edges.map(e => e.node));
  }

  ngOnInit() {
    this.query$.subscribe(x => {
      console.log(x);
    });
  }
}
