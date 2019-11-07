import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        selectedDish: null
    };
  }

  onDishSelect = (dishId) => this.setState({ selectedDish: dishId });
  selectedDish = () => this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0];

  render() {
    return (
      <div>
        <Header />
        <Menu dishes={this.state.dishes} onClick={this.onDishSelect} />
        <DishDetail dish={this.selectedDish()} />
        <Footer />
      </div>
    );
  }
}