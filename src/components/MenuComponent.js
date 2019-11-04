import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

export default class Menu extends Component {

    renderDish(dish){

        let view = (<div></div>);

        if(dish){
            view = (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.props.onClick(dish.id)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle >{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        }

        return view;
    }

    renderMenu = (dishes) => dishes ? dishes.map(dish => this.renderDish(dish)) : (<div></div>);

    render() {

        return (
            <div className="container">
                <div className="row"> 
                    {this.renderMenu(this.props.dishes)} 
                </div>
            </div>
        );
    }
}
