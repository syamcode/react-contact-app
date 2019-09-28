import React, { Component } from 'react';
import { Form, Col, Button, Container, Row, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Column, Table, AutoSizer } from 'react-virtualized';
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from './LoadingIndicator.js';
import 'react-virtualized/styles.css';
import './styles.css';

class Contacts extends Component {
  constructor() {
    super();

    this.state = {
      contacts: []
    }
  }

  handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
  }

  handleSubmit = event => {
    event.preventDefault();

  }

  componentDidMount() {
    trackPromise(
      fetch('http://165.22.60.22/api/v1/contacts')
      .then((res) => res.json())
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
            <Navbar.Brand href="#home">Contacts</Navbar.Brand>
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
            <Col>
              <AutoSizer disableHeight>
              {({width}) => (
                <Table
                  rowClassName={({index}) => index!==-1?"contact-row contact-row-pointer":"contact-row"}
                  onRowClick={this.viewDetail}
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
                    width={60}
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
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default Contacts;
