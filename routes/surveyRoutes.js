
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const sgMail = require('@sendgrid/mail');
const Survey = mongoose.model('surveys');
const keys = require('../config/keys');

module.exports = app => {

	app.get('/api/surveys', requireLogin, async (req,res)=> {

		const surveys = await Survey.find({_user: req.user.id}).select({recipients: false});
		res.send(surveys);
	})


	app.get('/api/surveys/thanks', (req,res ) =>{
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys/webhooks', (req, res) =>{
		console.log('webhooks initiated');
		console.log('this is the req.body', req.body[0]);
		
		let pathname = new URL(req.body[0].url).pathname;
		console.log('this is the pathname', pathname);

		const p = new Path('/api/surveys/:surveyId/:choice');

		console.log('this is the path', p);
		pathname = pathname.toString();

		const match = p.test(pathname);
		console.log('match: ', match);


		if(match){
		
			const choice = match.choice;
			const increment = {};
			increment[choice] = 1;
			console.log('searching id: ', match.surveyId);
			console.log('updating survey');
			Survey.updateOne({
				id: match.surveyId,
				recipients: {
					$elemMatch: {email: req.body[0].email, responded: false}

				}}, {$inc:{increment,
					$set: {'recipients.$.responded' : true,
					lastResponded: new Date()}
				}
			})

		}
		

		res.send({});
	});

	app.post('/api/surveys', requireLogin, requireCredits, async(req,res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email })),
			_user: req.user.id,
			dateSent: Date.now(),

		});

		const mailer = new Mailer(survey, surveyTemplate(survey));

		try{ 
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();
			res.send(user);
		}catch(err){
			res.status(422).send(err);
		}
		
// sgMail.setApiKey(keys.sendGridKey);
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);
	});
};

