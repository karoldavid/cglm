import React, { useEffect, useState } from 'react';
import {
  useParams,
  useHistory,
  useRouteMatch,
  useLocation,
  Switch,
  Link,
} from 'react-router-dom';
import {
  Card,
  Loader,
  Segment,
  Button,
  Icon,
  Grid,
  Divider,
  Menu,
} from 'semantic-ui-react';

import { getEvent } from '../api/events';
import { createQrCode } from '../api/qrCodes';
import Auth from '../auth/Auth';
import { EventItem } from '../models/EventItem';

import { ProtectedRoute } from './ProtectedRoute';
import { Attendees } from './Attendees';
import { AttendeeDetails } from './AttendeeDetails';
import { AttendeeForm } from './AttendeeForm';
import { QrCodes } from './QrCodes';
import { QrCodeDetails } from './QrCodeDetails';
import { QrCodeItem } from '../models/QrCodeItem';

interface EventDetailsProps {
  auth: Auth;
}

interface EventState {
  event: EventItem;
  loading: boolean;
}

interface QrCodeState {
  qrCode: QrCodeItem;
  loading: boolean;
}

export const EventDetails: React.FunctionComponent<EventDetailsProps> = ({
  auth,
}) => {
  const history = useHistory();
  const match = useRouteMatch();
  const { pathname } = useLocation();
  const { id } = useParams();

  const [eventState, setEventState] = useState<EventState>({
    event: null,
    loading: false,
  });

  const [qrCodeState, setQrCodeState] = useState<QrCodeState>({
    qrCode: null,
    loading: false,
  });

  const navigateToNewAttendee = () => {
    history.push(`${match.url}/attendees/new`);
  };

  const createQrCodeRequest = async () => {
    setQrCodeState({ qrCode: null, loading: true });
    try {
      const token = auth.getIdToken();
      const qrCode = await createQrCode(token, id);

      setQrCodeState({ qrCode: qrCode, loading: false });

      history.push(`${match.url}/qrcodes/${qrCode.qrCodeId}`);
    } catch (e) {
      setQrCodeState({ qrCode: null, loading: false });
      alert(`Failed to create QR-Code: ${e.message}`);
    }
  };

  const getEventRequest = async (token: string, eventId: string) => {
    try {
      setEventState((prevState) => ({ ...prevState, loading: true }));
      const event = await getEvent(token, eventId);
      setEventState({ event, loading: false });
    } catch (e) {
      alert(`Failed to fetch event: ${e.message}`);
      setEventState({ event: null, loading: false });
    }
  };

  useEffect(() => {
    const token = auth.getIdToken();
    getEventRequest(token, id);
  }, []);

  return (
    <>
      <Segment>
        <Grid columns={2} stackable>
          <Divider vertical />
          <Grid.Row>
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Card.Header>
                    {(!eventState.loading &&
                      eventState.event &&
                      eventState.event.name) ||
                      ''}
                  </Card.Header>
                  <Card.Meta>
                    <span className="date">
                      {(!eventState.loading &&
                        eventState.event &&
                        eventState.event.eventDate) ||
                        ''}
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    {(!eventState.loading &&
                      eventState.event &&
                      'Please add an event description.') || (
                      <Loader active inline="centered" />
                    )}
                  </Card.Description>
                </Card.Content>

                <Card.Content extra>
                  <a>
                    <Icon name="user" />
                    22 Attendants
                  </a>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column></Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Menu>
        <Menu.Item name="attendees" active={pathname.includes('/attendees')}>
          <Link to={`/events/${id}/attendees`}>Attendees</Link>
        </Menu.Item>
        <Menu.Item name="qrcodes" active={pathname.includes('/qrcodes')}>
          <Link to={`/events/${id}/qrcodes`}>QR-Codes</Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="add-attendee">
            <Button
              basic
              color="blue"
              size="medium"
              type="button"
              onClick={navigateToNewAttendee}
            >
              Add Attendee
            </Button>
          </Menu.Item>
          <Menu.Item name="create-qrcode">
            <Button
              basic
              color="blue"
              size="medium"
              type="button"
              loading={qrCodeState.loading}
              onClick={createQrCodeRequest}
            >
              Create QR-Code
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <Switch>
        <ProtectedRoute
          auth={auth}
          path="/events/:id/attendees"
          exact
          component={Attendees}
        />
        <ProtectedRoute
          auth={auth}
          path="/events/:id/attendees/new"
          exact
          component={AttendeeForm}
        />

        <ProtectedRoute
          auth={auth}
          path="/events/:id/attendees/:attendeeId"
          exact
          component={AttendeeDetails}
        />

        <ProtectedRoute
          auth={auth}
          path="/events/:id/qrcodes/:qrCodeId"
          exact
          component={QrCodeDetails}
        />

        <ProtectedRoute
          auth={auth}
          path="/events/:id/qrcodes"
          exact
          component={QrCodes}
        />
      </Switch>
    </>
  );
};
