import React from 'react';
import { EventItem } from '../models/EventItem';

import { Card, Loader, Icon } from 'semantic-ui-react';

interface EventData {
  item: EventItem;
}

interface EventDetailsCardProps {
  data: EventData;
  loading: boolean;
}

export const EventDetailsCard: React.FunctionComponent<EventDetailsCardProps> = ({
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
              <span className="date">{data.item.eventDate}</span>
            </Card.Meta>
            <Card.Description>
              Please add an event description.
            </Card.Description>
          </Card.Content>

          <Card.Content extra>
            <a>
              <Icon name="user" />
              22 Attendants
            </a>
          </Card.Content>
        </>
      )}
    </Card>
  );
};
