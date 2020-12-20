import React from 'react';
import { useRouteMatch, useParams, NavLink } from 'react-router-dom';
import { List, Segment } from 'semantic-ui-react';
import { QrCodeItem } from '../models/QrCodeItem';

interface QrCodesListProps {
  qrCodes: QrCodeItem[];
}

export const QrCodesList: React.FunctionComponent<QrCodesListProps> = ({
  qrCodes,
}) => {
  const match = useRouteMatch();

  const renderListItem = (qrCode: QrCodeItem) => {
    return qrCode.expiration > Math.round(new Date().getTime() / 1000) ? (
      <List.Item key={qrCode.qrCodeId}>
        <List.Content floated="right">
          <NavLink to={`${match.url}/${qrCode.qrCodeId}`}>show</NavLink>
        </List.Content>
        <List.Content>{qrCode.timestamp}</List.Content>
      </List.Item>
    ) : null;
  };

  const renderListItems = (qrCodes: QrCodeItem[]) =>
    qrCodes.map((qrCode) => renderListItem(qrCode));

  return (
    <>
      {!!qrCodes.length ? (
        <Segment>
          <List divided verticalAlign="middle">
            {renderListItems(qrCodes)}
          </List>
        </Segment>
      ) : null}
    </>
  );
};
