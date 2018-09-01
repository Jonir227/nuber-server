import MailGun from 'mailgun-js';

const mailGunClient = new MailGun({
  apiKey: process.env.MAIL_GUN_API_KEY || '',
  domain: 'sandbox98bd6dd1e04a495998dfea341711115c.mailgun.org',
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: 'bjbj6363@gmail.com',
    to: 'bjbj6363@gmail.com',
    subject,
    html,
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/">here</a>`;
  return sendEmail(emailSubject, emailBody);
};
