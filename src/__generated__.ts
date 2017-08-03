/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type UsersQuery = {
  viewer:  {
    users:  {
      // A list of edges.
      edges:  Array< {
        // The item at the end of the edge
        node:  {
          id: string,
          name: string,
        } | null,
      } | null > | null,
    } | null,
  } | null,
};

export type UserSummaryFragment = {
  id: string,
  name: string,
};
/* tslint:enable */
