import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({

  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),

  fetchDishes: () => dispatch(fetchDishes()),

  resetFeedbackForm: () => dispatch(actions.reset('feedback')),

  fetchComments: () => dispatch(fetchComments()),

  fetchPromos: () => dispatch(fetchPromos())
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  selectedDish = (dishId) => this.props.dishes.dishes.filter((dish) => dish.id === dishId)[0];
  selectedDishComments = (dishId) => this.props.comments.comments.filter((comment) => comment.dishId === dishId);

  render() {

    const DishWithId = ({match}) => {

      let dishId = parseInt(match.params.dishId, 10);
      
      return(
        <Dishdetail
          dish={this.selectedDish(dishId)} 
          comments={this.selectedDishComments(dishId)} 
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
        />
      );
    };
    const HomePage = () => {
      return(
          <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    };
    const MenuPage = () => (<Menu dishes={this.props.dishes} />);
    const AboutPage = () => <About leaders={this.props.leaders} />;

    return (
      <div>
        <Header />
        <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={MenuPage} />
            <Route path='/menu/:dishId' component={DishWithId} />
            <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
            <Route exact path='/aboutus' component={AboutPage} />
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));