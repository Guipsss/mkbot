const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class Email {
  async send(to, subject, body) {
    console.log(`Email "${subject}" to`, to);
    const email = {
      to,
      from: { name: 'MKBot', email: 'mkbot@mrkeebs.com' },
      subject,
      text: body,
    };

    if (process.env.npm_lifecycle_event && process.env.npm_lifecycle_event.indexOf('test') > -1) {
      global.emails = global.emails || [];
      global.emails.push(email);
      return;
    }

    try {
      return await sgMail.send(email);
    } catch (err) {
      console.log('Error sending email', err, err.response.body);
      return err;
    }
  }
}

module.exports = new Email();
