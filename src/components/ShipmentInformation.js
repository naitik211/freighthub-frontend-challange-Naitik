import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {updateShipmentInfo} from '../actions/shipmentInformationAction';
import {updateShipmentChartInfo} from '../actions/shipmentChartAction';
import '../style/information.css';

class ShipmentInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            name: this.props.shipment.name
        }
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    editNameHandler = () => {
        this.setState({
            isEdit: true,
        })
    }

    cancelEdit = () => {
        this.setState({
            isEdit: false,
            name: this.props.shipment.name
        })
    }

    saveName = () => {
        this.setState({
            isEdit: false
        });
        this.props.updateShipment(this.props.shipment.id, this.state.name);
    }

    generateInput() {
        return(
            <React.Fragment>
                <input type='text' value={this.state.name} className='input-text' onChange={this.nameChangeHandler}/>
                <div>
                    <Button variant="success" size="sm" onClick={this.saveName}>Save</Button>
                    <Button variant="danger" size="sm" onClick={this.cancelEdit}>Cancel</Button>
                </div>
            </React.Fragment>
        )
    }

    generateValue() {
        return(
            <React.Fragment>
                <span>{this.state.name}</span>
                <Button variant="warning" size="sm" className='button-container' onClick={this.editNameHandler}>Edit</Button>
            </React.Fragment>
        )
    }

    render() {
        const {
            id,
            origin,
            destination,
            mode,
            cargo,
            type,
            services,
            total,
            status,
            userId
        } = this.props.shipment;
        return (
            <div className='details-container'>
                <Link to='/'>
                    <Button variant="primary" className='back-button'> Back</Button>
                </Link>

                <Card>
                    <Card.Header><h3> {id}: {this.state.name}</h3></Card.Header>
                    <Card.Body>
                        <Card.Title><b>Overview:</b></Card.Title>
                        <div className='overview-content'>
                            <Card.Text className="mb-2 text-muted overview-title">Name</Card.Text>
                            <Card.Text>{this.state.isEdit ? this.generateInput() : this.generateValue()}</Card.Text>
                        </div>
                        <div className='overview-content '>
                            <Card.Text className="mb-2 text-muted overview-title">user Id</Card.Text>
                            <Card.Text>{userId}</Card.Text>
                        </div >
                        <div className='overview-content '>
                            <Card.Text className="mb-2 text-muted overview-title">Origin</Card.Text>
                            <Card.Text>{origin}</Card.Text>
                        </div>
                        <div className='overview-content '>
                            <Card.Text className="mb-2 text-muted overview-title">Destination</Card.Text>
                            <Card.Text>{destination}</Card.Text>
                        </div>
                        <div className='overview-content '>
                            <Card.Text className="mb-2 text-muted overview-title">Mode</Card.Text>
                            <Card.Text>{mode}</Card.Text>
                        </div>
                        <div className='overview-content '>
                            <Card.Text className="mb-2 text-muted overview-title">Type</Card.Text>
                            <Card.Text>{type}</Card.Text>
                        </div>
                        <div className='overview-content '>
                            <Card.Text className="mb-2 text-muted overview-title">Status</Card.Text>
                            <Card.Text>{status}</Card.Text>
                        </div>
                        <div className='overview-content '>
                            <Card.Text className="mb-2 text-muted overview-title">total</Card.Text>
                            <Card.Text>{total}</Card.Text>
                        </div>
                    </Card.Body>
                </Card>
                   
                <Card>
                    <Card.Body>
                        <Card.Title><b>Services:</b></Card.Title>
                            {services ? services.map((s, index) => (
                                    <div key={index} >
                                        <div className='service-container'>
                                            <Card.Text className='service-title'>Type</Card.Text>
                                            <Card.Text>{s.type}</Card.Text>
                                        </div>
                                        <div className='service-container'>
                                            <Card.Text className='service-title'>Value</Card.Text>
                                            <Card.Text>{s.value || 'N/A'}</Card.Text>
                                        </div>
                                    </div>
                                    
                            )): ''}
                        </Card.Body>
                </Card>
    
                <Card>
                    <Card.Body>
                    <Card.Title><b>Cargo:</b></Card.Title>
                            {cargo ? cargo.map((s, index) => (
                                    <div key={index}>
                                        <div className='service-container'>
                                            <Card.Text className='service-title'>Type</Card.Text>
                                            <Card.Text>{s.type}</Card.Text>
                                        </div>
                                        <div className='service-container'>
                                            <Card.Text className='service-title'>Description</Card.Text>
                                            <Card.Text>{s.description || 'N/A'}</Card.Text>
                                        </div>
                                        <div className='service-container'>
                                            <Card.Text className='service-title'>Volume</Card.Text>
                                            <Card.Text>{s.volume || 'N/A'}</Card.Text>
                                        </div>
                                    </div>
                                    
                            )): ''}
                    </Card.Body>
                </Card>
                
            </div>
    
        )
    }
    
}

ShipmentInformation.propTypes = {
    shipment: PropTypes.object,
    updateShipment: PropTypes.func,
};




const mapStateToProps = (state) => ({
    shipment: state.details.shipment
});

const mapDispatchToProps = (dispatch) => {
    return {
        updateShipment(id, name) {
            dispatch(updateShipmentInfo(name));
            dispatch(updateShipmentChartInfo(id, name));
        }
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(ShipmentInformation);