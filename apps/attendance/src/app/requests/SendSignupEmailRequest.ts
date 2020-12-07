/**
 * Fields in a request to send a SES Signup Email to an attendee.
 */
export interface SendSignupEmailRequest {
  name: string;
  recipient: string;
  url: string;
}
