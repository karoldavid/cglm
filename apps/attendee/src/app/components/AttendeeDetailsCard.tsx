import React from 'react';
import { AttendeeItem } from '../models/AttendeeItem';

import { Card, Loader, Icon } from 'semantic-ui-react';

interface AttendeeData {
  item: AttendeeItem;
}

interface AttendeeDetailsCardProps {
  data: AttendeeData;
  loading: boolean;
}

export const AttendeeDetailsCard: React.FunctionComponent<AttendeeDetailsCardProps> = ({
  data,
  loading,
}) => {
  return (
    <Card>
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <>
          <Card.Content>
            <Card.Header>{data.item.name}</Card.Header>
            <Card.Meta>
              <span className="email">{data.item.email}</span>
            </Card.Meta>
            <Card.Description>
              Please add an attendee description.
            </Card.Description>
          </Card.Content>

          <Card.Content extra>
            <a>
              <Icon name="user" />
              status: confirmed
            </a>
          </Card.Content>
        </>
      )}
    </Card>
  );
};
