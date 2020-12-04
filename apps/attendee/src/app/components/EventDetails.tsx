import React from 'react';
import {
  useParams,
  useHistory,
  useRouteMatch,
  useLocation,
  Switch,
  Link,
} from 'react-router-dom';
import { Segment, Button, Grid, Divider, Menu } from 'semantic-ui-react';

import { useEvent } from '../api/events';
import { useCreateQrCode } from '../api/qrCodes';
import Auth from '../auth/Auth';

import { ProtectedRoute } from './ProtectedRoute';
import { EventDetailsCard } from './EventDetailsCard';
import { Attendees } from './Attendees';
import { AttendeeDetails } from './AttendeeDetails';
import { AttendeeForm } from './AttendeeForm';
import { QrCodes } from './QrCodes';
import { QrCodeDetails } from './QrCodeDetails';
import { QrCodeItem } from '../models/QrCodeItem';

interface EventDetailsProps {
  auth: Auth;
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

  const { data, isLoading } = useEvent(auth.getIdToken(), id);

  const [mutate, { isLoading: isLoadingCreateQrCode }] = useCreateQrCode(
    auth.getIdToken()
  );

  const createQrCode = () => {
    mutate({ eventId: id });
  };

  const navigateToNewAttendee = () => {
    history.push(`${match.url}/attendees/new`);
  };

  return (
    <>
      <Segment>
        <Grid columns={2} stackable>
          <Divider vertical />
          <Grid.Row>
            <Grid.Column>
              <EventDetailsCard data={data} loading={isLoading} />
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
              loading={isLoadingCreateQrCode}
              onClick={createQrCode}
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
