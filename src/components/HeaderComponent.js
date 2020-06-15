import React, { Component } from 'react'
import {Navbar, NavbarBrand, Jumbotron, Collapse, Nav, NavbarToggler, NavItem, Form, FormGroup, Button, Label, Modal, ModalBody, ModalHeader, Input} from 'reactstrap'
import {NavLink} from 'react-router-dom'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            NavbarOpen : false,
            isModalOpen : false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleModaldata = this.handleModaldata.bind(this);
    }
    toggleNav() {
        this.setState(
            {
                NavbarOpen : !this.state.NavbarOpen
            }
        )
    } 
    toggleModal() {
        this.setState(
            {
                isModalOpen : !this.state.isModalOpen
            }
        )
    }  
    handleModaldata() {
        this.toggleModal();
        alert("Username: " + this.username.value +"\nPassword: " + this.password.value + "\nRemember Me: " + this.remember.checked);
    } 
    render()
    {
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}/>
                        <NavbarBrand className="mr-auto" href="/">
                            <img src='assets/images/logo.png' width="41" height="30" alt="Ristorante con Fusion"/>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.NavbarOpen} navbar>
                            <Nav navbar>
                                <NavLink className="nav-link" to="/home">
                                    <NavItem>
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavItem>
                                </NavLink>
                                <NavLink className="nav-link" to="/aboutus">
                                    <NavItem>
                                        <span className="fa fa-info fa-lg"></span> About Us
                                    </NavItem>
                                </NavLink>
                                <NavLink className="nav-link" to="/menu">
                                    <NavItem>
                                        <span className="fa fa-list fa-lg"></span> Menu
                                    </NavItem>
                                </NavLink>
                                <NavLink className="nav-link" to="/contactus">
                                    <NavItem>
                                        <span className="fa fa-address-card fa-lg"></span> Contact Us
                                    </NavItem>
                                </NavLink>
                            </Nav>
                            <Button onClick={this.toggleModal} outline className="ml-auto">
                                <span className="fa fa-sign-in fa-lg"></span> Login
                            </Button>
                        </Collapse>
                      
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen = {this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleModaldata}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" name="username" placeholder="Username" id="username" innerRef={(input)=> {this.username=input}}/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" name="password" placeholder="Password" id="password" innerRef={(input)=> {this.password=input}}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label htmlFor="remember">
                                    <Input type="checkbox" name="remember" id="remember" innerRef={(input)=> {this.remember=input}}/> Remember Me
                                </Label>
                            </FormGroup>
                            <Button type="submit" color="primary" onClick={this.state.handleModaldata}>Sign In</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

export default Header;