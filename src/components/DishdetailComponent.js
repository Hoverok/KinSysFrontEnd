import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { SearchParams } from '../shared/searchParams';
import adParams from '../shared/adParams';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({ dish, putDish, deleteDish }) {
    if (dish != null) {
        return (

            <FadeTransform in
                trasnformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <div className="row">
                    <div className="col-4">
                        <CardImg width="100%" src={baseUrl + dish.imagebig} alt={dish.name} />
                    </div>
                    <div className="col-5">
                        <EditAdForm dish={dish} putDish={putDish} deleteDish={deleteDish} />
                        <h4>Specializacija:</h4>
                        <p>{dish.label}</p>

                        <h4>Aprašymas </h4>
                        <p>{dish.description}</p>

                        <h4>Darbo patirtis:</h4>
                        <p>{dish.work}</p>

                        <h4>Sportiniai pasiekimai ir laimėjimai: </h4>
                        <p>{dish.achievement}</p>

                        <h4>Kontaktai:</h4>
                        <p>{dish.tel}</p>

                        <a class="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i
                            class="fa fa-facebook fa-lg"></i></a>
                        <a class="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i
                            class="fa fa-linkedin fa-lg"></i></a>
                        <a class="btn btn-social-icon btn-instagram" href="http://instagram.com/"><i
                            class="fa fa-instagram fa-lg"></i></a>
                        <a class="btn btn-social-icon" href="mailto:"><i class="fa fa-envelope-o fa-lg"></i></a>

                    </div>
                </div>


            </FadeTransform>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}


function RenderComments({ comments, postComment, dishId }) {
    if (comments == null) {
        return (<div></div>)
    }
    else {

        const commmentArray = comments.map((review) => {
            return (


                <li key={review.id}>
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p>{review.rating}/5 <span class="fa fa-star checked fa-lg"></span></p>

                                <p>{review.comment}</p>
                                <footer className="blockquote-footer">{review.author} ,
                                    &nbsp;
                                    {new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: '2-digit'
                                    }).format(new Date(Date.parse(review.date)))}
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </li >

            )
        });

        return (
            <Stagger in>
                <Fade in>
                    <div className='col-12' >

                        <h4> Atsiliepimai </h4>

                        <ul className='list-unstyled'>
                            {commmentArray}
                        </ul>
                        <CommentForm dishId={dishId} postComment={postComment} />
                    </div>
                </Fade>
            </Stagger>
        );
    }
}


const DishDetail = (props) => {

    console.log('Dishdetail Component render is invoked');

    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <RenderDish dish={props.dish} putDish={props.putDish} deleteDish={props.deleteDish}/>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <div className="col-12">
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>

            </div>
        );
    }
    else {
        return <div></div>
    }
}

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Pateikti atsiliepimą
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Pateikti atsiliepimą</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Vertinimas</Label>
                                <Col md={12}>
                                    <Control.select defaultValue="1" model=".rating" name="rating" id="rating"
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
                                <Label htmlFor="author" md={12}>Vardas</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Vardas"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }} />
                                    <Errors className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Komentaras</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">
                                        Pateikti
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

class EditAdForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isDeleteModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
        this.handleUpdateAd = this.handleUpdateAd.bind(this);
        this.handleDeleteAd = this.handleDeleteAd.bind(this);
    }

    toggleModal() {
        //alert(this.props.dish.label)
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    toggleDeleteModal() {
        //alert(this.props.dish.label)
        this.setState({
            isDeleteModalOpen: !this.state.isDeleteModalOpen
        });
    }

    handleUpdateAd(event) {
        this.toggleModal();


        //alert(adParams.image)

        //this.props.putDish(adParams.name, "images/" + adParams.image, "images/" + adParams.imagebig, adParams.tel,
        // adParams.label, adParams.work, adParams.achievement, false, adParams.description);

        if (adParams.name === '') {
            adParams.name = this.props.dish.name
        }
        if (adParams.image === '') {
            adParams.image = this.props.dish.image
        } else {
            adParams.image = "images/" + adParams.image
        }
        if (adParams.imagebig === '') {
            adParams.imagebig = this.props.dish.imagebig
        } else {
            adParams.imagebig = "images/" + adParams.imagebig
        }
        if (adParams.tel === '') {
            adParams.tel = this.props.dish.tel
        }
        if (adParams.label === '') {
            adParams.label = this.props.dish.label
        }
        if (adParams.work === '') {
            adParams.work = this.props.dish.work
        }
        if (adParams.achievement === '') {
            adParams.achievement = this.props.dish.achievement
        }
        if (adParams.description === '') {
            adParams.description = this.props.dish.description
        }

        this.props.putDish(this.props.dish.id, adParams.name, adParams.image, adParams.imagebig, adParams.tel,
            adParams.label, adParams.work, adParams.achievement, false, adParams.description);
    }

    handleDeleteAd(event) {
        this.toggleDeleteModal();

        this.props.deleteDish(this.props.dish.id);
    }

    handleNameChanged(event) {
        adParams.name = event.target.value;
    }

    handleImageChanged(event) {
        adParams.image = event.target.files[0].name;
    }

    handleImageBigChanged(event) {
        adParams.imagebig = event.target.files[0].name;
    }

    handleTelChanged(event) {
        adParams.tel = event.target.value;
    }

    handleLabelChanged(event) {
        adParams.label = event.target.value;
    }

    handleWorkChanged(event) {
        adParams.work = event.target.value;
    }

    handleAchievementChanged(event) {
        adParams.achievement = event.target.value;
    }

    handleDescriptionChanged(event) {
        adParams.description = event.target.value;
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Redaguoti skelbimą
                </Button>
                {"   "}
                <Button outline onClick={this.toggleDeleteModal}>
                    <span className="fa fa-trash fa-lg"></span> Pašalinti skelbimą
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Redaguoti skelbimą</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleUpdateAd}>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="Photo">Nuotrauka (maža): </label>
                                    <div className="col-12 col-md-6 align-items-center">
                                        <input type="file" id="photo" onChange={this.handleImageChanged} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="Photo">Nuotrauka (didelė): </label>
                                    <div className="col-12 col-md-6 align-items-center">
                                        <input type="file" id="photo" onChange={this.handleImageBigChanged} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="specialization">Specializacija</label>
                                    <div className="form-group row">
                                        <div className="col-6">
                                            <select onChange={this.handleLabelChanged} defaultValue={this.props.dish.label}>
                                                <option value=""></option>
                                                <option value="Jėga">Jėga</option>
                                                <option value="Ištvermė">Ištvermė</option>
                                                <option value="H.I.I.T">H.I.I.T</option>
                                                <option value="Crossfit">Crossfit</option>
                                                <option value="Reabilitacija">Reabilitacija</option>
                                                <option value="Svorio metimas">Svorio metimas</option>
                                                <option value="Svorio priaugimas">Svorio priaugimas</option>
                                                <option value="Kūno skulptūra">Kūno skulptūra</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-8">
                                    <label className="control-label" for="name">Pilnas vardas</label>
                                    <input type="text" className="form-control form-control-sm mr-1" id="name"
                                        placeholder="Pilnas vardas" defaultValue={this.props.dish.name} onChange={this.handleNameChanged} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="competence">Aprašymas</label>
                                    <textarea className="form-control" id="competence" placeholder="Aprašymas" name="competence" rows="6" defaultValue={this.props.dish.description} onChange={this.handleDescriptionChanged}></textarea>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="workExperience">Darbo patirtis</label>
                                    <textarea className="form-control" id="workExperience" placeholder="Darbo patirtis" name="workExperience" rows="3" defaultValue={this.props.dish.work} onChange={this.handleWorkChanged}></textarea>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="achievements">Sportiniai pasiekimai ir laimėjimai</label>
                                    <textarea className="form-control" id="achievements" placeholder="Sportiniai pasiekimai ir laimėjimai" name="achievements" rows="6" defaultValue={this.props.dish.achievement} onChange={this.handleAchievementChanged}></textarea>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-8">
                                    <label className="control-label" for="telNum">Telefono numeris</label>
                                    <input type="tel" className="form-control form-control-sm mr-1" id="telNum"
                                        placeholder="Telefono numeris" defaultValue={this.props.dish.tel} onChange={this.handleTelChanged} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-sm-8">
                                    <label for="facebookLink">Facebook paskyra</label>
                                    <input type="link" className="form-control form-control-sm mr-1" id="facebookLink"
                                        placeholder="Facebook paskryos nuoroda" value="http://www.facebook.com/profile.php?id=" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-sm-8">
                                    <label for="linkedinLink">Linkedin paskyra</label>
                                    <input type="link" className="form-control form-control-sm mr-1" id="linkedinLink"
                                        placeholder="Linkedin paskyros nuoroda" value="http://www.linkedin.com/in/" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-sm-8">
                                    <label for="instagramLink">Instagram paskyra</label>
                                    <input type="link" className="form-control form-control-sm mr-1" id="instagramLink"
                                        placeholder="Instagram paskyros nuoroda" value="http://instagram.com/" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-sm-8">
                                    <label for="email">El. paštas</label>
                                    <input type="email" className="form-control form-control-sm mr-1" id="email"
                                        placeholder="Eletroninio pašto adresas" />
                                </div>
                            </div>
                            <div className="form-row">
                                <Button type="cancel" className="btn btn-secondary btn-sm ml-auto"
                                    data-dismiss="modal">Atšaukti</Button>
                                <Button type="submit" value="submit" className="bg-primary">Patvirtinti skelbimo pakeitimus</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isDeleteModalOpen} toggle={this.toggleDeleteModal}>
                    <ModalHeader toggle={this.toggleDeleteModal}>Redaguoti skelbimą</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleDeleteAd}>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="Photo">Ar tikrai norite pašalinti skelbimą </label>
                                </div>
                            </div>
                            <div className="form-row">
                                <Button type="cancel" className="btn btn-secondary btn-sm ml-auto"
                                    data-dismiss="modal">Atšaukti</Button>
                                <Button type="submit" value="submit" className="bg-primary">Pašalinti skelbimą</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}



export default DishDetail;