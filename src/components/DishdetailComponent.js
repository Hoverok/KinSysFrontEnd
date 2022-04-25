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
                    <div className="col">
                        <EditAdForm dish={dish} putDish={putDish} deleteDish={deleteDish} />
                        <h4>Asmeninė informacija:</h4>
                        <p>Asmens Kodas: {dish.personalId}</p>
                        <p>Sveikatos istorijos numeris: {dish.healthHistoryNr}</p>
                        <p>Gimimo data: {dish.dateOfBirth}</p>
                        <p>Lytis: {dish.gender}</p>
                        <p>Adresas: {dish.address}</p>
                        <p>Tel. numeris:{dish.tel}</p>
                        <p>El. paštas: {dish.email}</p>

                        <h4>Lygos aprašymas:</h4>
                        <p>{dish.illnessDescription}</p>

                        <h4>Diagnozė:</h4>
                        <p>{dish.diagnosis}</p>

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
                                <p>{review.author}</p>
                                <p>{review.videoLink}</p>
                                <p>{review.comment}</p>
                                <Button>
                                    <span className="fa fa-pencil fa-lg"></span> Redaguoti pratimą
                                </Button>
                                {"   "}
                                <Button>
                                    <span className="fa fa-pencil fa-lg"></span> Ištrinti pratimą
                                </Button>
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

                        <h4> Pratimai </h4>

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
                        <BreadcrumbItem><Link to='/menu'>Pacientų sąrašas</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <RenderDish dish={props.dish} putDish={props.putDish} deleteDish={props.deleteDish} />
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
        this.props.postComment(this.props.dishId, values.rating, values.author, values.videoLink, values.comment);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Pridėti pratimą
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Pridėti pratimą</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Pratimo pavadinimas</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Pavadinimas"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="videoLink" md={12}>Vaizdo įrašo nuoroda</Label>
                                <Col md={12}>
                                    <Control.text model=".videoLink" id="videoLink" name="videoLink"
                                        placeholder="https:/...."
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Pratimo komentaras</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">
                                        Pridėti
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
        if (adParams.sessionActivity === '') {
            adParams.sessionActivity = this.props.dish.sessionActivity
        }
        if (adParams.healthHistoryNr === '') {
            adParams.healthHistoryNr = this.props.dish.healthHistoryNr
        }
        if (adParams.personalId === '') {
            adParams.personalId = this.props.dish.personalId
        }
        if (adParams.dateOfBirth === '') {
            adParams.dateOfBirth = this.props.dish.dateOfBirth
        }
        if (adParams.gender === '') {
            adParams.gender = this.props.dish.gender
        }
        if (adParams.address === '') {
            adParams.address = this.props.dish.address
        }
        if (adParams.tel === '') {
            adParams.tel = this.props.dish.tel
        }
        if (adParams.email === '') {
            adParams.email = this.props.dish.email
        }
        if (adParams.illnessDescription === '') {
            adParams.illnessDescription = this.props.dish.illnessDescription
        }
        if (adParams.diagnosis === '') {
            adParams.diagnosis = this.props.dish.diagnosis
        }

        this.props.putDish(this.props.dish.id, adParams.sessionActivity, adParams.name, adParams.healthHistoryNr, adParams.personalId, adParams.dateOfBirth, adParams.gender,
            adParams.address, adParams.tel, adParams.email, adParams.illnessDescription, adParams.diagnosis);
    }

    handleDeleteAd(event) {
        this.toggleDeleteModal();

        this.props.deleteDish(this.props.dish.id);
    }


    handleLabelSessionChanged(event) {
        adParams.sessionActivity = event.target.value;
    }

    handleNameChanged(event) {
        adParams.name = event.target.value;
    }

    handleHealthHistoryChanged(event) {
        adParams.healthHistoryNr = event.target.value;
    }

    handlePersonalIdChanged(event) {
        adParams.personalId = event.target.value;
    }

    handleDateOfBirthChanged(event) {
        adParams.dateOfBirth = event.target.value;
    }

    handleLabelGenderChanged(event) {
        adParams.gender = event.target.value;
    }

    handleAddressChanged(event) {
        adParams.address = event.target.value;
    }

    handleTelChanged(event) {
        adParams.tel = event.target.value;
    }

    handleEmailChanged(event) {
        adParams.email = event.target.value;
    }

    handleIllnessDescriptionChanged(event) {
        adParams.illnessDescription = event.target.value;
    }

    handleDiagnosisChanged(event) {
        adParams.diagnosis = event.target.value;
    }
    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Redaguoti duomenis
                </Button>
                {"   "}
                <Button outline onClick={this.toggleDeleteModal}>
                    <span className="fa fa-trash fa-lg"></span> Ištrinti
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Redaguoti duomenis</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleUpdateAd}>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="kineState">Sesijos statusas</label>
                                    <div className="form-group row">
                                        <div className="col-6">
                                            <select onChange={this.handleLabelChanged} defaultValue={this.props.dish.sessionActivity}>
                                                <option value=""></option>
                                                <option value="Laukia">Laukia</option>
                                                <option value="Aktyvus">Aktyvus</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-8">
                                    <label className="control-label" for="name">Vardas Pavardė</label>
                                    <input type="text" className="form-control form-control-sm mr-1" id="name"
                                        placeholder="Vardas Pavardė" defaultValue={this.props.dish.name} onChange={this.handleNameChanged} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-8">
                                    <label className="control-label" for="healthHistoryNr">Sveikatos istorijos numeris</label>
                                    <input type="text" className="form-control form-control-sm mr-1" id="healthHistoryNr"
                                        placeholder="Sveikatos istorijos Nr." defaultValue={this.props.dish.healthHistoryNr} onChange={this.handleHealthHistoryChanged} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-8">
                                    <label className="control-label" for="personalId">Asmens kodas</label>
                                    <input type="text" className="form-control form-control-sm mr-1" id="personalId"
                                        placeholder="Asmens kodas" defaultValue={this.props.dish.personalId} onChange={this.handlePersonalIdChanged} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-8">
                                    <label className="control-label" for="dateOfBirth">Gimimo data</label>
                                    <input type="text" className="form-control form-control-sm mr-1" id="dateOfBirth"
                                        placeholder="YYYY-MM-DD" defaultValue={this.props.dish.dateOfBirth} onChange={this.handleDateOfBirthChanged} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="kineState">Lytis</label>
                                    <div className="form-group row">
                                        <div className="col-6">
                                            <select defaultValue={this.props.dish.gender} onChange={this.handleLabelGenderChanged} >
                                                <option value=""></option>
                                                <option value="Vyr.">Vyr.</option>
                                                <option value="Mot.">Mot.</option>
                                                <option value="Kit.">Kit.</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-8">
                                    <label className="control-label" for="address">Adresas</label>
                                    <input type="text" className="form-control form-control-sm mr-1" id="address"
                                        placeholder="Miestas, Gatvė namas-būtas" defaultValue={this.props.dish.address} onChange={this.handleAddressChanged} />
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
                                    <label for="email">El. paštas</label>
                                    <input type="email" className="form-control form-control-sm mr-1" id="email"
                                        placeholder="Elektroninio pašto adresas" defaultValue={this.props.dish.email} onChange={this.handleEmailChanged} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="illnessDescription">Lygos aprašymas</label>
                                    <textarea className="form-control" id="illnessDescription" placeholder="Paciento lygos aprašymas"
                                        name="address" rows="6" defaultValue={this.props.dish.illnessDescription} onChange={this.handleIllnessDescriptionChanged}></textarea>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="diagnosis">Diagnozės</label>
                                    <textarea className="form-control" id="diagnosis" placeholder="Diagnozės"
                                        name="address" rows="6" defaultValue={this.props.dish.diagnosis} onChange={this.handleDiagnosisChanged}></textarea>
                                </div>
                            </div>
                            <div className="form-row">
                                <Button type="cancel" className="btn btn-secondary btn-sm ml-auto"
                                    data-dismiss="modal">Atšaukti</Button>
                                <Button type="submit" value="submit" className="bg-primary">Patvirtinti duoemnų pakeitimus</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isDeleteModalOpen} toggle={this.toggleDeleteModal}>
                    <ModalHeader toggle={this.toggleDeleteModal}>Redaguoti paciento duomenis</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleDeleteAd}>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="Photo">Ar tikrai norite pašalinti? </label>
                                </div>
                            </div>
                            <div className="form-row">
                                <Button type="cancel" className="btn btn-secondary btn-sm ml-auto"
                                    data-dismiss="modal">Atšaukti</Button>
                                <Button type="submit" value="submit" className="bg-primary">Pašalinti</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}



export default DishDetail;