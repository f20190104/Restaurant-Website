import React, {Component} from 'react';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import {connect} from 'react-redux';
import {postComment, fetchDishes, fetchPromos, fetchComments, fetchLeaders, postFeedback} from '../redux/ActionCreator';
import { actions } from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const mapDispatchToProps = (dispatch) => ({
  postComment : (id,rate,auth,comm) =>(dispatch(postComment(id,rate,auth,comm))),
  fetchDishes : () => (dispatch(fetchDishes())),
  resetForm : () => (dispatch(actions.reset('feedback'))),
  fetchComments : () => (dispatch(fetchComments())),
  fetchPromos : () => (dispatch(fetchPromos())),
  fetchLeaders: () => (dispatch(fetchLeaders())),
  postFeedback: (firstname,lastname,telnum,email,contactType,agree,message) => (dispatch(postFeedback(firstname,lastname,telnum,email,contactType,agree,message)))
});
const mapStateToProps = (state) => {
  return (
    {
      dishes : state.dishes,
      promotions: state.promotions,
      leaders : state.leaders,
      comments: state.comments
    }
  );
}
class Main extends Component {
    componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchPromos();
      this.props.fetchComments();
      this.props.fetchLeaders();
    }
    render(){
      const HomePage = () => {
        return (
            <Home dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]} 
            leader={this.props.leaders.leaders.filter((leader)=> leader.featured)[0]} promotion={this.props.promotions.promos.filter((promotion)=> promotion.featured)[0]}
            dishesLoading= {this.props.dishes.isLoading} dishesErrMess={this.props.dishes.ErrMess}
            promosLoading = {this.props.promotions.isLoading} promosErrMess={this.props.promotions.ErrMess}
            leadersLoading={this.props.leaders.isLoading} leadersErrMess={this.props.leaders.ErrMess}/>
        );
      };
      const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
              comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
               postComment = {this.props.postComment}
               isLoading={this.props.dishes.isLoading} ErrMess={this.props.dishes.ErrMess} />
        );
      };
        return (
            <div>
              <Header />
              <div className="container">
                <TransitionGroup>
                  <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
                    <Switch>
                      <Route path="/home" component={HomePage}/>
                      <Route exact path="/menu" component={()=> {return (
                        <Menu dishes={this.props.dishes.dishes} isLoading={this.props.dishes.isLoading} ErrMess={this.props.dishes.ErrMess}/>
                      );}}/>
                      <Route path="/menu/:dishId" component= {DishWithId}/>
                      <Route path="/aboutus" component={()=>{ return(
                        <About leaders={this.props.leaders.leaders} leadersLoading= {this.props.leaders.isLoading} leadersErrMess={this.props.leaders.ErrMess} />
                      );}}/>
                      <Route exact path="/contactus" component={ () => {
                        return(<Contact resetForm= {this.props.resetForm} postFeedback={this.props.postFeedback}/>);
                      }}/>
                      <Redirect to="/home"/>
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </div>
              <Footer />
            </div>
          );
    }
 
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
