const setShipmentDetails = shipmentData => ({
  type: "SET_SHIPMENT_DETAILS",
  shipment: shipmentData
});

export const fetchShipmentDetails = shipmentId => {
  return function(dispatch, getState) {
    const tableData = getState().chart.tableData;
    const shipmentDetails = tableData.find(data => data.id === shipmentId);

    dispatch(setShipmentDetails(shipmentDetails));
  };
};

export const updateShipmentInfo = updatedName => {
  return function(dispatch, getState) {
    const shipmentInfo = getState().details.shipment;
    const updatedShipmentInfo = {...shipmentInfo, ...{name: updatedName}};
    
    dispatch(setShipmentDetails(updatedShipmentInfo));
  }
}