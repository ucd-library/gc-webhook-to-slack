import fetch from 'node-fetch';

const BASE_URL = 'https://hooks.slack.com';

/**
 * Responds to an HTTP request from Google Cloud alert notifications and sends a formatted message to Slack.
 *
 * @param {object} req - HTTP request context.
 * @param {object} res - HTTP response context.
 */
async function gcWebhookToSlack(req, res) {
  if( req.query.secret !== process.env.WEBHOOK_SECRET ) {
    console.log('Unauthorized request, secret does not match', req.query.secret, process.env.WEBHOOK_SECRET);
    res.status(401).send('Unauthorized');
    return;
  }

  const webhookUrl = `${BASE_URL}${req.path.replace(/\/gcWebhookToSlack/g, '')}`;
  console.log('Slack Webhook URL:', webhookUrl);
  
  let message = req.body;
  if( typeof message === 'string' ) {
    message = JSON.parse(message);
  }

  // Prepare the Slack message payload
  const slackMessage = {
    text: `Google Cloud Alert: ${message.incident.condition_name}`,
    attachments: [{
      color: '#ff0000', // Color of the sidebar in the Slack message, red for alert
      fields: [
        { title: "Condition", value: message.incident.condition_name, short: true },
        { title: "State", value: message.incident.state, short: true },
        { title: "Summary", value: message.incident.summary, short: false },
        { title: "Documentation", value: message.incident.documentation.content, short: false}
      ]
    }]
  };

  try {
    // Sending the message to Slack
    const response = await fetch(webhookUrl, {
      method: 'POST',
      body: JSON.stringify(slackMessage),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Sending a response back to the caller if needed
    res.status(200).send('Notification sent to Slack successfully!');
  } catch (error) {
    console.error('Failed to send notification:', error);
    res.status(500).send('Failed to send notification');
  }
};

export {gcWebhookToSlack};