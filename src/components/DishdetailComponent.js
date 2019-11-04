import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

export default class Dishdetail extends Component {

    formatDate = (dateString) => new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dateString)));

    renderDish(dish){

        let view = (<div></div>);

        if(dish){
            view = (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }

        return view;
    }

    renderComments(dish){

        let view = (<div></div>);

        if(dish && dish.comments){
            view = (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {dish.comments.map(c => {
                            return(
                                <li key={c.id}>
                                    <p>{c.comment}</p>
                                    <p>-- {c.author}, {this.formatDate(c.date)}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )
        }

        return view;
    }

    render() {

        return (
            <div className="container">

                <div className="row">

                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>

                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish)}
                    </div>

                </div>

            </div>
        );
    }
}
