import React, { Component } from 'react';
import { Form, Col, Button, Container, Row, Navbar, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Column, Table, AutoSizer } from 'react-virtualized';
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from './LoadingIndicator';
import { faEnvelope, faBuilding, faGlobe, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  fetchContacts,
  fetchContact,
  fetchFilterByName,
  fetchFilterByCompany,
  fetchFilterByRevenue } from '../../api/Contacts';
import 'react-virtualized/styles.css';
import './styles.css';

class Contacts extends Component {
  constructor() {
    super();

    this.state = {
      contacts: [],
      detailData: null,
      search: '',
      filterBy: 'name'
    }
  }

  handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    let f;
    switch(this.state.filterBy){
      case 'name': f = fetchFilterByName(this.state.search);break;
      case 'companyID': f = fetchFilterByCompany(this.state.search);break;
      case 'revenue': f = fetchFilterByRevenue(this.state.search);break;
      default: break;
    }
    if(this.state.search==='')
      f = fetchContacts();
    trackPromise(
      f
      .then((data) => {
        let dt = [];
        if(data.data!=null){
          dt = data.data
        }
        this.setState({ contacts: dt });
      })
      .catch(console.log)
    );
  }

  handleDetail = ({index}) => {
   trackPromise(
     fetchContact(this.state.contacts[index].id)
     .then((data) => {
       this.setState({ detailData: data.data });
     })
     .catch(console.log)
   );
 }

  componentDidMount() {
    trackPromise(
      fetchContacts()
      .then((data) => {
        this.setState({ contacts: data.data })
      })
      .catch(console.log)
    );
  }

  render() {
    return(
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">Contacts</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Link to='/login'>Login</Link>
              </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
        <Container>
          <div className="formContainer">
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} xs={7} controlId="search" className="flex-group">
                  <Form.Label className="control-label col-3" >Search:</Form.Label>
                  <Form.Control
                    type="text"
                    value={this.state.search}
                    onChange={this.handleChange} />
                </Form.Group>

                <Form.Group as={Col} xs={4} controlId="filterBy" className="flex-group">
                  <Form.Label className="control-label col-4" >Search By:</Form.Label>
                  <Form.Control as="select"
                    className="col-8"
                    value={this.state.filterBy}
                    onChange={this.handleChange}>
                    <option value="name">Name</option>
                    <option value="companyID">Company ID</option>
                    <option value="revenue">Revenue</option>
                  </Form.Control>
                </Form.Group>
                <Col xs={1}>
                  <Button type="submit" block>
                    Search
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </div>
          <Row>
            <Col xs={this.state.detailData==null?12:8}>
              <AutoSizer disableHeight>
              {({width}) => (
                <Table
                  rowClassName={({index}) => index!==-1?"contact-row contact-row-pointer":"contact-row"}
                  onRowClick={this.handleDetail}
                  width={width}
                  height={450}
                  noRowsRenderer={() => <LoadingIndicator />}
                  headerHeight={30}
                  rowHeight={40}
                  rowCount={this.state.contacts.length}
                  rowGetter={({ index }) => {
                    let data= this.state.contacts[index];
                    data.index=index;
                    return data;
                  }}>
                  <Column
                    width={80}
                    cellDataGetter={({ rowData }) => rowData.index+1}
                    label='#'
                    dataKey='index'/>
                  <Column
                    width={400}
                    label='Name'
                    dataKey='name'/>
                  <Column
                    width={400}
                    cellDataGetter={({ dataKey, rowData }) => rowData.company[dataKey]}
                    label='Company'
                    dataKey='name'/>
                  <Column
                    width={400}
                    label='Email'
                    dataKey='email'/>
                </Table>
              )}
            </AutoSizer>
            </Col>
            { this.state.detailData!==null &&
            <Col xs={4}>
              <Card>
                <Card.Header as="h5">Details</Card.Header>
                <Card.Body>
                  <Card.Title>{this.state.detailData.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                  <p><FontAwesomeIcon icon={faEnvelope}/> <a href={"mailto:"+this.state.detailData.email}>{this.state.detailData.email}</a></p>
                  <hr/>
                  <h6>Company</h6>
                  <p><FontAwesomeIcon icon={faBuilding}/> {this.state.detailData.company.name}</p>
                  <p><FontAwesomeIcon icon={faGlobe}/> {this.state.detailData.company.country}</p>
                  <p><FontAwesomeIcon icon={faDollarSign}/> {this.state.detailData.company.revenue}</p>
                  <Button onClick={() => {this.setState({detailData: null})}}>Close</Button>
                </Card.Body>
              </Card>
            </Col>
          }
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default Contacts;
