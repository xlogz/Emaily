const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const sgMail = require('@sendgrid/mail');
const Survey = mongoose.model('surveys');
const keys = require('../config/keys');

module.exports = app => {
	app.post('/api/surveys',(req,res) => {
		// const { title, subject, body, recipients } = req.body;

		// const survey = new Survey({
		// 	title,
		// 	subject,
		// 	body,
		// 	recipients: recipients.split(',').map(email => ({ email })),
		// 	_user: req.user.id,
		// 	dateSent: Date.now(),

		// });

		// const mailer = new Mailer(survey, surveyTemplate(survey));
		// mailer.send();
		console.log('sending email...');

		
		sgMail.setApiKey(keys.sendGridKey);
			const msg = {
				to: 'loganxlow@stoletheinter.net',
				from: 'noreply@stoletheinter.net',
				subject: 'Sending with Twilio SendGrid is Fun',
				text: 'and easy to do anywhere, even with Node.js',
				html: '<strong>and easy to do anywhere, even with Node.js</strong>',
			};
			(async () => {
  try {
    await sgMail.send(msg);
  } catch (err) {
    console.error(err.toString());
  }
})();


	});
};