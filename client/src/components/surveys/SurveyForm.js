//SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';


class SurveyForm extends Component {

	renderFields(){

		return _.map(formFields, ({label, name}) => {
			return (<Field 
					key={name}
					label={label}
				 	type="text" 
				 	name={name}
				 	component={SurveyField} />
				 	)
		});
	}

	render(){
		return(
			<div>
			<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
				{this.renderFields()}
				<Link to="/surveys" className="red btn-flat white-text">
				Cancel
				</Link>
				<button type="submit" className="teal btn-flat right white-text"> Next
				<i className="material-icons right">done</i> </button>
				</form>
			</div>
			);
	}
}

function validate(values){
	const errors = {};

	

	_.each(formFields, ( { name }) =>{

		if(!values[name]){
			errors[name] = `You must provide a valid ${name}`;
		}
	});

	errors.recipients = validateEmails(values.recipients || '');

	return errors;
}

export default reduxForm({
	form: 'surveyForm', 
	validate, 
	destroyOnUnmount: false
})(SurveyForm);