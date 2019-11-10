import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS
    };
  }

  selectedDish = (dishId) => this.state.dishes.filter((dish) => dish.id === dishId)[0];
  selectedDishComments = (dishId) => this.state.comments.filter((comment) => comment.dishId === dishId);

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
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    };

    const MenuPage = () => (<Menu dishes={this.state.dishes} />);
    const AboutPage = () => <About leaders={this.state.leaders} />;

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