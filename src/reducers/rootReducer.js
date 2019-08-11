import { combineReducers } from 'redux';
import chart from './shipmentChartReducer';
import details from './shipmentInformationReducer';

const rootReducer = combineReducers({
    chart,
    details
});

export default rootReducer;