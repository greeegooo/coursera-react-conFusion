import React, { useState } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

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

const CommentForm = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    return(
        <div>
            <Button outline onClick={toggle}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={toggle}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={2}>Rating</Label>
                            <Col md={12}>
                                <Control.select 
                                    model=".rating" 
                                    name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="name" md={3}>Your Name</Label>
                            <Col md={12}>
                                <Control.text 
                                    model=".name" 
                                    id="name" 
                                    name="name"
                                    className="form-control"
                                    validators={{
                                        required, 
                                        minLength: minLength(3), 
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: 'Required. ',
                                        minLength: 'Must be greater than 2 characters. ',
                                        maxLength: 'Must be 15 characters or less. '
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={2}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea 
                                    model=".comment" 
                                    id="comment" 
                                    name="comment"
                                    rows="6"
                                    className="form-control" 
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Button type="submit" color="primary">Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
    );
}

function RenderComments({comments}){

    let view = (<div></div>);

    if(comments){
        view = (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map(c => {
                        return(
                            <li key={c.id}>
                                <p>{c.comment}</p>
                                <p>-- {c.author}, {formatDate(c.date)}</p>
                            </li>
                        );
                    })}
                </ul>
                <CommentForm />
            </div>
        )
    }

    return view;
}

const Dishdetail = (props) => {

    return (
        <div className="container">
            
            <div className="row">

                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>

                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>   
                             
            </div>
            
            <div className="row">

                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                </div>

                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>

            </div>

        </div>
    );
}

export default Dishdetail;
