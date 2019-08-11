import axios from 'axios';

const apiUrl = 'http://localhost:3000/shipments';

export const fetchShipmentData = () => {
  return dispatch => {
    axios
      .get(apiUrl)
      .then(res => {
        dispatch(fetchDataSuccess(res.data));
      })
      .catch(err => {
        console.error(err);
        dispatch(fetchDataError);
      });
  };
};

const fetchDataSuccess = tableData => ({
  type: 'FETCH_DATA_SUCCESS',
  tableData
});


const fetchDataError = error => ({
  type: 'FETCH_DATA_ERROR',
  tableData: []
});

export const updateShipmentChartInfo = (id, name) => {
  return (dispatch, getState) => {
    const shipmentData = getState().chart.tableData;
    const updatedShipmentData = shipmentData.map((sd) => {
      if(sd.id === id) {
        return {...sd, ...{name}};
      }
      return sd;
    });

    dispatch(fetchDataSuccess(updatedShipmentData));
  }
}

export const sortData = (sortBy, sortOrder) => {
  return  (dispatch, getState) => {
        try {
           const shipmentData = getState().chart.tableData;
           const sorting = sortOrder === 'asc' ? 1 : -1;
           const sortedData = shipmentData.sort((a, b) => {
              if(a[sortBy] < b[sortBy]) return -sorting;
              if(a[sortBy] > b[sortBy]) return sorting;
              return 0;
           });

            dispatch(fetchDataSuccess(sortedData));
        } catch (e) {
            dispatch(fetchDataError);
        }
    }
}

const updatePageIndexSuccess = pageIndex => ({
    type: 'CHANGE_PAGE_INDEX',
    pageIndex
});

export const updatePageIndex = (count) => {
  return (dispatch, getState) => {
    const pageIndex = getState().chart.pageIndex;
    const updatedIndex = pageIndex + count;

    dispatch(updatePageIndexSuccess(updatedIndex));
  }
}


