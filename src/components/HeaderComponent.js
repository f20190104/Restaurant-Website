import React, { Component } from 'react'
import {Navbar, NavbarBrand, Jumbotron, Collapse, Nav, NavbarToggler, NavItem} from 'reactstrap'
import {NavLink} from 'react-router-dom'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            NavbarOpen : false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }
    toggleNav() {
        this.setState(
            {
                NavbarOpen : !this.state.NavbarOpen
            }
        )
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
            </React.Fragment>
        )
    }
}

export default Header;