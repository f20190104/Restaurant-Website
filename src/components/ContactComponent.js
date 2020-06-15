import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Form, Input, FormGroup, Button, Label, Col} from 'reactstrap';
import {Link} from 'react-router-dom';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state={
            firstname: '',
            lastname: '',
            email: '',
            telnum: '',
            agree: false,
            contactType: 'Tel.',
            message: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(event){
        const target = event.target;
        const name = target.name;
        const value = name ==='agree'? target.checked : target.value;
        this.setState({
            [name] : value
        });
    }
    handleSubmit(event) {
        console.log("The submitted form data is:\n"+ JSON.stringify(this.state));
        alert("The submitted form data is:\n"+ JSON.stringify(this.state));
        event.preventDefault();
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr /> 
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            {// eslint-disable-next-line
                            }<a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us Your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label for="firstname" className="col-md-2">First Name</Label>
                                <Col md={10}>
                                    <Input type="text" name="firstname" id="firstname" placeholder="First Name" value={this.state.firstname} onChange={this.handleInput}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="lastname" className="col-md-2">Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" name="lastname" id="lastname" placeholder="Last Name" value={this.state.lastname} onChange={this.handleInput}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="telnum" className="col-md-2">Tel. Num</Label>
                                <Col md={10}>
                                    <Input type="tel" name="telnum" id="telnum" placeholder="Tel. Num" value={this.state.telnum} onChange={this.handleInput}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" className="col-md-2">Email</Label>
                                <Col md={10}>
                                    <Input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleInput}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:6,offset:2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree" id="agree" checked={this.state.agree} onChange={this.handleInput}/>{' '} May we contact you?
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size:3, offset:1}}>
                                    <select name="contactType" id="contactType" value={this.state.contactType} onChange={this.handleInput}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </select>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="message" className="col-md-2">Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" rows="12" name="message" value={this.state.message} onChange={this.handleInput}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{offset:2}}>
                                    <Button type="submit" color="primary">
                                        Send Your Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                
            </div>
        );
    }
    
}

export default Contact;