import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function formatDate(dateString) {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(dateString)));
}

function RenderDish({dish}){

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

function RenderComments({dish}){

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
                                <p>-- {c.author}, {formatDate(c.date)}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }

    return view;
}

const Dishdetail = (props) => {

    return (
        <div className="container">

            <div className="row">

                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                </div>

                <div className="col-12 col-md-5 m-1">
                    <RenderComments dish={props.dish} />
                </div>

            </div>

        </div>
    );
}

export default Dishdetail;
