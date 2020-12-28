import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { Button, Form, Segment, Header } from 'semantic-ui-react';

import { useGetUploadUrl, useUploadFile } from '../api/events';
import Auth from '../auth/Auth';

enum UploadState {
  NoUpload,
  FetchingPresignedUrl,
  UploadingFile,
}

interface EditEventFormProps {
  auth: Auth;
}

interface EditEventFields {
  files: object;
}

export const EditEventForm: React.FunctionComponent<EditEventFormProps> = ({
  auth,
}) => {
  const history = useHistory();

  const { id } = useParams();

  const [uploadFileState, setUploadFileState] = useState<UploadState>(
    UploadState.NoUpload
  );

  const [getUploadUrl] = useGetUploadUrl(auth.getIdToken());

  const [uploadFile, { isLoading }] = useUploadFile();

  const { register, handleSubmit } = useForm<EditEventFields>();

  const onSubmit = async (data: EditEventFields) => {
    const { files } = data;

    try {
      if (!files) {
        alert('File should be selected');
        return;
      }

      setUploadFileState(UploadState.FetchingPresignedUrl);

      const { uploadUrl } = await getUploadUrl({ eventId: id });

      setUploadFileState(UploadState.UploadingFile);

      await uploadFile({ uploadUrl, file: files[0] });

      alert('File was uploaded!');
    } catch (e) {
      alert('Could not upload a file: ' + e.message);
    } finally {
      setUploadFileState(UploadState.NoUpload);
    }
  };

  return (
    <Segment loading={isLoading}>
      <Header size="medium">Upload Image</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <input
            type="file"
            accept="image/*"
            placeholder="Image to upload"
            name="files"
            id="files"
            ref={register({ required: true })}
          />
        </Form.Field>
        <Button.Group>
          <Button basic color="grey" size="medium" as={NavLink} to={`/events`}>
            Cancel
          </Button>
          <Button basic color="blue" size="medium" type="submit">
            Upload
          </Button>
        </Button.Group>
      </Form>
    </Segment>
  );
};
