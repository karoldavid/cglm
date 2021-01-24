import React, { useEffect, useState, useRef } from 'react';
import { Switch } from 'react-router-dom';
import WebSocket from 'isomorphic-ws';

import Auth from '../auth/Auth';

import { EventsOverview } from '../components/EventsOverview';
import { EventDetails } from '../components/EventDetails';
import { EventForm } from '../components/EventForm';
import { EditEvent } from '../components/EditEvent';
import { ProtectedRoute } from '../components/ProtectedRoute';

const WS_URL = process.env.NX_WEBSOCKET_URL || '';

interface EventsProps {
  auth: Auth;
}

interface ImageData {
  imageId: string;
  bucketName: string;
}

interface Message {
  data: string;
}

export const Events: React.FunctionComponent<EventsProps> = ({ auth }) => {
  const [image, setImage] = useState<ImageData>(null);

  const socket = useRef(new WebSocket(WS_URL));

  const [newMessage, setNewMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.current.onmessage = (msg: Message) => {
      const incomingMessage: ImageData = JSON.parse(msg.data);
      setMessages(messages.concat([incomingMessage]));
      setNewMessage(incomingMessage);
      if (incomingMessage.imageId && incomingMessage.bucketName) {
        setImage(incomingMessage);
      }
    };
  });

  useEffect(() => () => socket.current.close(), [socket]);

  return (
    <Switch>
      <ProtectedRoute
        auth={auth}
        image={image}
        path="/events"
        exact
        component={EventsOverview}
      />
      <ProtectedRoute
        auth={auth}
        path="/events/new"
        exact
        component={EventForm}
      />
      <ProtectedRoute
        auth={auth}
        path="/events/:id/edit"
        exact
        component={EditEvent}
      />
      <ProtectedRoute
        auth={auth}
        path="/events/:id"
        exact={false}
        component={EventDetails}
      />
    </Switch>
  );
};
