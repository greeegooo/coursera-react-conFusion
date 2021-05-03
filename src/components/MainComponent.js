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
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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

  fetchPromos: () => dispatch(fetchPromos()),

  fetchLeaders: () => dispatch(fetchLeaders()),

  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => 
    dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message))
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
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
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leaderLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}
          />
      );
    };
    const MenuPage = () => (<Menu dishes={this.props.dishes} />);
    const AboutPage = () => (<About leaders={this.props.leaders} />);
    const ContactPage = () => (
      <Contact 
        resetFeedbackForm={this.props.resetFeedbackForm}
        postFeedback={this.props.postFeedback}
      />
    );

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route exact path='/menu' component={MenuPage} />
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path='/contactus' component={ContactPage} />
                <Route exact path='/aboutus' component={AboutPage} />
                <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));