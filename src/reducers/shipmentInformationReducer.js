const initialState = {
    shipment: {},
};
const shipmentInformationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SHIPMENT_DETAILS':
            return {...state, shipment: action.shipment};
        default:
            break;
    }
    
    return state;
};
export default shipmentInformationReducer;