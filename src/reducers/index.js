import { combineReducers } from 'redux';

import user_reducer from './user';
import employee_reducer from './employee';
import customer_reducer from './customers';
import inventory_reducer from './inventory';
import work_reducer from './work';
import party_reducer from './party';
import account_reducer from './accounts';
import equipment_reducer from './equipment';
import item_reducer from './item';


export default combineReducers({
    user:user_reducer,
    employee:employee_reducer,
    customer:customer_reducer,
    inventory:inventory_reducer,
    work:work_reducer,
    party:party_reducer,
    account:account_reducer,
    equipment:equipment_reducer,
    item:item_reducer
});