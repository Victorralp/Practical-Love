const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export type Web3FormFields = {
  subject: string;
  name?: string;
  email?: string;
  message?: string;
  [field: string]: string | number | undefined;
};

/**
 * Sends a form to the ministry inbox through Web3Forms. Throws with a readable
 * message when the key is missing or the service rejects the submission.
 */
export async function sendWeb3Form(fields: Web3FormFields): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error('This form is not configured yet. Please add VITE_WEB3FORMS_ACCESS_KEY.');
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      from_name: 'Practical Love Website',
      replyto: fields.email,
      botcheck: '',
      ...fields,
      subject: `[Practical Love] ${fields.subject}`,
    }),
  });

  const result = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Unable to send right now. Please try again.');
  }
}
