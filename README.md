# gc-webhook-to-slack
A Google Cloud function which takes a Google Cloud Alert Notification Webook and write the message to a slack channel

This is already deployed for `os-app-down-alerts` slack channel.  Use the Google Cloud Notifcation Channel Webhook `Slack - OS App Down Alerts Channel`.  However, this should ONLY be used for CORE PRODUCTION applications.

# Create New Channel

Go to your slack account and create a new app. Add the app to your workspace and give it the necessary permissions to a slack channel to write to.  Then create a new webhook for the slack app and copy the webhook url.  The url should look like this: https://hooks.slack.com/services/XXXXXXXXX/XXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXX

Now go to your Google Cloud Monitoring Alert -> Notification Channels -> Manage Notification Channels.  Scroll down to 'Webhooks' Section, then click 'Add New'.  Give the webhook a name and paste the url, formatted as describe below, in the 'Endpoint' field.  Click 'Save'.  

Url Format: https://us-central1-digital-ucdavis-edu.cloudfunctions.net/gcWebhookToSlack/[SLACK_FULL_WEBHOOK_PATH]?secret=[SECRET]

Where:
- [SLACK_FULL_WEBHOOK_PATH] is the full path of the slack webhook url, including the 'services' part.  For example: /services/XXXXXXXXX/XXXXXXXXX/XXXXXXXXXXXXXXXXXXXXXXXX
- [SECRET] is found in the Google Cloud Secret Manager: `gc-webhook-to-slack-secret`
