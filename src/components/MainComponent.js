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
import {addComment, fetchDishes} from '../redux/ActionCreator'

const mapDispatchToProps = (dispatch) => ({
  addComment : (id,rate,auth,comm) =>(dispatch(addComment(id,rate,auth,comm))),
  fetchDishes : () => (dispatch(fetchDishes())) 
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
    }
    render(){
      const HomePage = () => {
        return (
            <Home dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]} 
            leader={this.props.leaders.filter((leader)=> leader.featured)[0]} promotion={this.props.promotions.filter((promotion)=> promotion.featured)[0]}
            isLoading= {this.props.dishes.isLoading} ErrMess={this.props.dishes.ErrMess}/>
        );
      };
      const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
              comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
               addComment = {this.props.addComment}
               isLoading={this.props.dishes.isLoading} ErrMess={this.props.dishes.ErrMess} />
        );
      };
        return (
            <div>
              <Header />
              <div className="container">
                <Switch>
                  <Route path="/home" component={HomePage}/>
                  <Route exact path="/menu" component={()=> {return (
                    <Menu dishes={this.props.dishes.dishes} isLoading={this.props.dishes.isLoading} ErrMess={this.props.dishes.ErrMess}/>
                  );}}/>
                  <Route path="/menu/:dishId" component= {DishWithId}/>
                  <Route path="/aboutus" component={()=>{ return(
                    <About leaders={this.props.leaders}/>
                  );}}/>
                  <Route exact path="/contactus" component={Contact}/>
                  <Redirect to="/home"/>
                </Switch>
              </div>
              <Footer />
            </div>
          );
    }
 
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
