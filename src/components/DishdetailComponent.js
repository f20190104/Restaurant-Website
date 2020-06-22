import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Row, Label, Button, Modal, ModalBody, ModalHeader} from 'reactstrap';
import {Link } from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form'
import {Loading} from './LoadingComponent'
import {baseUrl} from '../redux/baseURL'

const minLength = (limit) => (value) => value && value.length >=limit;
const maxLength = (limit) => (value) => !(value) || value.length <=limit;
class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState(
            {
                isModalOpen : !(this.state.isModalOpen)
            }
        );
            
    }
    handleSubmit(values) {
        alert("Current state is: " + JSON.stringify(values));
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render(){
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                    Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit} className="p-2">
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" className="form-control" placeholder='Your Name' validators={{
                                   minLength: minLength(3), maxLength: maxLength(15)
                                }}/>
                                <Errors model=".author" className="text-danger" show="touched" messages={{
                                    minLength: "Must be greater than 2 characters",
                                    maxLength: "Must be 15 characters or less"
                                }}/>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" rows='6' className="form-control"/>
                            </Row>
                            <Button role="submit" color="primary" onclick={this.handleSubmit} >Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}


    function RenderComments({comments, dishId, postComment})
    {
        if (comments!=null)
        {
            const commentList = comments.map((comment) => 
                    { 
                    //Parsing the date in a correct format
                    const date = new Date(Date.parse(comment.date));
                    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
                    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
                    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
                    //returning the list items
                        return (<li key={comment.id}>
                            <p>{ comment.comment }</p>
                            <p>--{comment.author}, {mo} {da}, {ye}</p>
                        </li>);
                    });

                return(
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {commentList}
                        </ul>
                        <CommentForm dishId={dishId} postComment={postComment}/>
                    </div>
                    
                );
        }
        else 
        {
            return (<div></div>);
        }
    }
    function RenderDish({dish})
    {  
    return (
        
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>    
            </div>
        );
    }
    function DishDetail({dish,comments, postComment, isLoading, ErrMess})
    {
        if (isLoading) {
            return (<Loading />);
            }
        else if (ErrMess) {
            return (<h4>{ErrMess}</h4>);
            }   
        else if (dish!=null) 
            {return (
            <React.Fragment>
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr /> 
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={dish}/> 
                    <RenderComments comments={comments} dishId={dish.id} postComment={postComment}/>              
                </div>
            </React.Fragment> 
            );}
        else return (<div></div>)
    }

export default DishDetail;