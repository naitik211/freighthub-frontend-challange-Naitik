import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Button, Alert, Badge } from "react-bootstrap";
import Search from "./Search";
import Pagination from "./Pagination";
import { fetchShipmentData, sortData, updatePageIndex } from "../actions/shipmentChartAction";
import { fetchShipmentDetails } from "../actions/shipmentInformationAction";
import '../style/chart.css';

class ShipmentsChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortby: "",
      sortOrder: "",
      filterdData: []
    };
  }

  componentDidMount() {
    this.props.fetchData();
  }

  viewDetails(shipmentId) {
    this.props.fetchDetails(shipmentId);
    this.props.history.push("/details");
  }

  handleSort = (e, id) => {
    const sortBy = id;

    this.setState({
      [id]: this.state[id] === 'asc' ? 'dec' : 'asc',
      sortBy: sortBy
    }, ()=> {
        this.props.sortTableData(sortBy, this.state[id]);
    });
  }

  search = e => {
    this.setState(
      {
        input: e.target.value.trim()
      },
      () => {
        this.searchShipment();
      }
    );
  };

  searchShipment = () => {
    const { props: { tableData }, state: { input } } = this;
    const shipments = tableData;
    const updatedList = shipments.filter(item => {
      return item.id.toLowerCase().search(input.toLowerCase()) !== -1;
    });

    this.setState({
      filterdData: updatedList.length === tableData.length ? [] : updatedList,
      noFilterMatch: !updatedList.length && input.length
    });
  };

  goToPrevPage = () => {
    this.props.updatePageCount(-1);
  }

  goToNextPage = () => {
      this.props.updatePageCount(1);
  }

  render() {
    const {
      props: { tableData, tableHeaders, itemsPerPage, pageIndex },
      state: { filterdData, noFilterMatch, input }
    } = this;
    const pageCount = filterdData.length 
        ? Math.ceil(filterdData.length / itemsPerPage)
        : Math.ceil(tableData.length / itemsPerPage);
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageTableData = filterdData.length
      ? filterdData.slice(startIndex, endIndex)
      : tableData.slice(startIndex, endIndex);
    const STATUS_BADGE = {
        'COMPLETED': 'success',
        'NEW': 'primary',
        'ACTIVE': 'warning'
    }

    return (
      <div>
        <h3>Shipments chart</h3>
        <Search search={this.search} />
        {noFilterMatch ? (
          <Alert variant="warning">
            No shipment having {input} ID!
          </Alert>
        ) : (
          <Table
            responsive
            striped
            bordered
            hover
            size="sm"
            className="table-data"
          >
            <thead>
              <tr>
                {tableHeaders.map(th => (
                  <th
                    key={th}
                    onClick={(e) => this.handleSort(e, th)}
                  >
                    <span>{th.toUpperCase()}</span>
                    <span
                      id={th}
                      className={this.state[th]}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageTableData.map((data, index) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.origin}</td>
                  <td>{data.destination}</td>
                  <td>
                    <Badge variant={STATUS_BADGE[data.status]}>{data.status}</Badge>
                  </td>
                  <td>
                    <Button
                      as="input"
                      type="button"
                      variant="dark"
                      size="sm"
                      value="View Details"
                      id={data.id}
                      onClick={e => this.viewDetails(data.id)}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Pagination 
            goToNextPage={this.goToNextPage}
            goToPrevPage={this.goToPrevPage}
            isLast={ (pageCount - 1) === pageIndex }
            isFirst={!pageIndex}/>
      </div>
    );
  }
}

ShipmentsChart.propTypes = {
  fetchData: PropTypes.func,
  tableData: PropTypes.array,
  tableHeaders: PropTypes.array,
  fetchDetails: PropTypes.func,
  sortTableData: PropTypes.func,
  itemsPerPage: PropTypes.number
};

const mapStateToProps = state => ({
  tableData: state.chart.tableData,
  tableHeaders: state.chart.tableHeaders,
  itemsPerPage: state.chart.itemsPerPage,
  pageIndex: state.chart.pageIndex
});

const mapDispatchToProps = dispatch => {
  return {
    fetchData() {
      dispatch(fetchShipmentData());
    },
    fetchDetails(shipmentId) {
      dispatch(fetchShipmentDetails(shipmentId));
    },
    sortTableData(sortBy, sortOrder) {
        dispatch(sortData(sortBy, sortOrder))
    },
    updatePageCount(count) {
        dispatch(updatePageIndex(count))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentsChart);
