import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Label, Col, Row} from 'reactstrap';
import {Form, Control, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';

const required = (value) => value && value.length;
const maxLength = (limit) => (value) => !(value)||value.length<=limit;
const minLength = (limit) => (value) => value && value.length >=limit;
const number = (value) => !isNaN(Number(value));
const validEmail = (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
class Contact extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(values) {
        console.log("The submitted form data is:\n"+ JSON.stringify(values));
        alert("The submitted form data is:\n"+ JSON.stringify(values));
        this.props.resetForm();
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
                        <Form model='feedback' onSubmit={this.handleSubmit}>
                            <Row className="form-group">
                                <Label for="firstname" className="col-md-2">First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" name="firstname" id="firstname" 
                                    placeholder="First Name" className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}/>
                                    <Errors className="text-danger" model=".firstname" show="touched" messages={{
                                         required: "Required ",
                                         minLength: "Must have greater than 2 characters",
                                         maxLength: "Must have less than 16 characters"
                                    }
                                    }/>
                                    
                                </Col>
                               
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" className="col-md-2">Last Name</Label>
                                <Col md={10}>
                                    <Control.text className="form-control" model=".lastname" name="lastname" id="lastname" placeholder="Last Name"
                                     validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}/>
                                    <Errors className="text-danger" model=".lastname" show="touched" messages={{
                                         required: "Required ",
                                         minLength: "Must have greater than 2 characters",
                                         maxLength: "Must have less than 16 characters"
                                    }
                                    }/>                            
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" className="col-md-2">Tel. Num</Label>
                                <Col md={10}>
                                    <Control.text className="form-control" model=".telnum" id="telnum" placeholder="Tel. Num"  validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15), number
                                    }}/>
                                    <Errors className="text-danger" model=".telnum" show="touched" messages={{
                                         required: "Required ",
                                         minLength: "Must have greater than 2 numbers",
                                         maxLength: "Must have less than 16 numbers",
                                         number : "Must contain only digits"
                                    }
                                    }/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" className="col-md-2">Email</Label>
                                <Col md={10}>
                                    <Control.text  className="form-control" model=".email" name="email" id="email" placeholder="Email" validators={{
                                        required, validEmail
                                    }}/>
                                    <Errors className="text-danger" model=".email" show="touched" messages={{
                                         required: "Required ",
                                         validEmail: "Invalid Email"
                                    }
                                    }/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:6,offset:2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox className = "form-check-input" model=".agree" name="agree" id="agree" />{' '} May we contact you?
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size:3, offset:1}}>
                                    <Control.select model=".contactType" name="contactType" id="contactType">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" className="col-md-2">Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea className="form-control" model=".message" rows="12" name="message" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{offset:2}}>
                                    <Button type="submit" color="primary">
                                        Send Your Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                
            </div>
        );
    }
    
}

export default Contact;