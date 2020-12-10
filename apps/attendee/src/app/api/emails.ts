import { useMutation } from 'react-query';

import { apiEndpoint } from '../../config';
import { SendSignupEmailRequest } from '../types/SendSignupEmailRequest';

interface SendSignupEmailVariables {
  signupEmail: SendSignupEmailRequest;
}

export function useSendSignupEmail(idToken: string) {
  return useMutation(({ signupEmail }: SendSignupEmailVariables) =>
    fetch(`${apiEndpoint}/sendSignupEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(signupEmail),
    }).then((res) => res.json())
  );
}
