import { gql } from '@apollo/client';

export const REGISTRATION_FIELDS = gql`
  fragment CoreRegistrationFields on Registration {
    registrant {
      id
    }
    expiryDate
    registrationDate
    domain {
      name
      resolvedAddress {
        id
      }
    }
  }
`;

export const QUERY_RECENT_REGISTRATIONS = gql`
  ${REGISTRATION_FIELDS}
  query GetRegistrations($first: Int, $skip: Int) {
    registrations(
      orderBy: registrationDate
      orderDirection: desc
      first: $first
      skip: $skip
    ) {
      ...CoreRegistrationFields
    }
  }
`;

export const QUERY_BY_ENS_NAME = gql`
  ${REGISTRATION_FIELDS}
  query GetRegistrationByENS($name: String) {
    registrations(where: { domain_: { name: $name } }) {
      ...CoreRegistrationFields
    }
  }
`;
