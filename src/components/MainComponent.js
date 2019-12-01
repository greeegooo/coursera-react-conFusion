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

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {

  selectedDish = (dishId) => this.props.dishes.filter((dish) => dish.id === dishId)[0];
  selectedDishComments = (dishId) => this.props.comments.filter((comment) => comment.dishId === dishId);

  render() {

    const DishWithId = ({match}) => {

      let dishId = parseInt(match.params.dishId, 10);
      
      return(
        <Dishdetail
          dish={this.selectedDish(dishId)} 
          comments={this.selectedDishComments(dishId)} 
        />
      );
    };

    const HomePage = () => {
      return(
          <Home 
              dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
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
            <Route exact path='/contactus' component={Contact} />
            <Route exact path='/aboutus' component={AboutPage} />
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));