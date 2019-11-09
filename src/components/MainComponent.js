import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES
    };
  }

  onDishSelect = (dishId) => this.setState({ selectedDish: dishId });
  selectedDish = () => this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0];

  render() {

    const HomePage = () => (<Home />);

    return (
      <div>
        <Header />
        <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}