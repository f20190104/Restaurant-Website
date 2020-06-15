import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Form, Input, FormGroup, Button, Label, Col, FormFeedback} from 'reactstrap';
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
            message: '',
            touched : {
                firstname : false,
                lastname : false ,
                email : false,
                telnum: false
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    handleBlur = (field)=>(event)=> {
        this.setState({
            touched : {...this.state.touched, [field]:true}
        });
    }
    validate(firstname,lastname,email,telnum){
        const errors = {
            firstname : '',
            lastname: '',
            email:'',
            telnum:''
        };
        if (this.state.touched.firstname && firstname.length <3){
            errors.firstname = "The First Name must be >=3 characters.";
        }
        else if (this.state.touched.firstname && firstname.length >15){
            errors.firstname= "The First Name must be <=15 characters.";
        }

        if (this.state.touched.lastname && lastname.length <3){
            errors.lastname = "The Last Name must be >=3 characters.";
        }
        else if (this.state.touched.lastname && lastname.length >15){
            errors.lastname= "The Last Name must be <=15 characters.";
        }

        const emailreg = /.*@.*/;
        if (this.state.touched.email && !emailreg.test(email) ){
            errors.email = "The email must have @ symbol.";
        }
        const telreg = /^\d+$/;
        if (this.state.touched.telnum && !telreg.test(telnum)){
            errors.telnum = "The Telephone number must contain digits only."
        }
        return errors;
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
        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.email, this.state.telnum);
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
                                    <Input  type="text" name="firstname" id="firstname" placeholder="First Name" value={this.state.firstname} valid= {errors.firstname === ''} invalid = {errors.firstname !== ''} onChange={this.handleInput} onBlur={this.handleBlur('firstname')}/>
                                    <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                               
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" className="col-md-2">Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" name="lastname" id="lastname" placeholder="Last Name" value={this.state.lastname} valid= {errors.lastname === ''} invalid = {errors.lastname !== ''} onChange={this.handleInput} onBlur={this.handleBlur('lastname')}/>
                                    <FormFeedback>{errors.lastname}</FormFeedback>                                
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="telnum" className="col-md-2">Tel. Num</Label>
                                <Col md={10}>
                                    <Input type="tel" name="telnum" id="telnum" placeholder="Tel. Num" value={this.state.telnum} valid= {errors.telnum === ''} invalid = {errors.telnum !== ''} onChange={this.handleInput} onBlur={this.handleBlur('telnum')}/>
                                    <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" className="col-md-2">Email</Label>
                                <Col md={10}>
                                    <Input type="email" name="email" id="email" placeholder="Email" value={this.state.email} valid= {errors.email === ''} invalid = {errors.email !== ''} onChange={this.handleInput} onBlur={this.handleBlur('email')}/>
                                    <FormFeedback>{errors.email}</FormFeedback>
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
                                <Label htmlFor="message" className="col-md-2">Your Feedback</Label>
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