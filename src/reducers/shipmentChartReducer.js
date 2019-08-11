const initialState = {
    tableData: [],
    tableHeaders: ['id', 'origin', 'destination', 'status', ''],
    itemsPerPage: 20,
    pageIndex: 0,
};
const shipmentChartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
            return {...state, tableData: action.tableData};
        case 'FETCH_DATA_ERROR':
            return {...state, tableData: []};
        case 'CHANGE_PAGE_INDEX':
            return {...state, pageIndex: action.pageIndex};
        default:
                break;
    }
    return state;
};
export default shipmentChartReducer;