import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';

interface EventFormProps {
  message: string;
}

export const InfoModal: React.FunctionComponent<EventFormProps> = ({
  message,
}) => {
  const [open, setOpen] = React.useState(true);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>New Event</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Inof</Header>
          <p>{message}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="OK"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};
