import {combineReducers} from 'redux';
import { reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import surveyReducer from './surveyReducer';

//this is where the values returned from the reducer are assigned to 
//a property on combineReducers, so that it can be accessed from props
//after being mapped by mapStateToProps
export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	surveys: surveyReducer
})