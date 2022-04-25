import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal,
    ModalHeader, ModalBody, FormGroup, Form, Input, Label, img, Alert
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import adParams from '../shared/adParams';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isLoginModalOpen: false,
            isRegisterAdModalOpen: false,
            isRegisterSertModalOpen: false,
            LoggedIn: true,
            Button: "Prisijungti"



        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleRegisterAdModal = this.toggleRegisterAdModal.bind(this);
        this.toggleRegisterSertModal = this.toggleRegisterSertModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegisterAd = this.handleRegisterAd.bind(this);
        this.handleRegisterSert = this.handleRegisterSert.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleLoginModal() {

        if (!this.state.LoggedIn) {
            this.setState({
                isLoginModalOpen: !this.state.isLoginModalOpen
            });
        } else {
            this.setState({
                LoggedIn: false,
                Button: "Prisijungti"
            });
        }
    }

    toggleRegisterAdModal() {
        this.setState({
            isRegisterAdModalOpen: !this.state.isRegisterAdModalOpen
        });
    }

    toggleRegisterSertModal() {
        this.setState({
            isRegisterSertModalOpen: !this.state.isRegisterSertModalOpen
        });
    }


    handleLogin(event) {

        this.toggleLoginModal();
        //alert("Username: " + this.username.value + " Password: " + this.password.value
        //    + " Remeber: " + this.remember.checked + "logged in"+ this.state.LoggedIn);
        this.setState({
            LoggedIn: true,
            Button: "Atsijungti"
        });
        event.preventDefault();
    }

    handleRegisterAd(event) {
        this.toggleRegisterAdModal();
        this.props.postDish(adParams.sessionActivity, adParams.name, adParams.healthHistoryNr, adParams.personalId, adParams.dateOfBirth, adParams.gender,
            adParams.address, adParams.tel, adParams.email, adParams.illnessDescription, adParams.diagnosis);
    }

    handleRegisterSert(event) {
        this.toggleRegisterSertModal();
        alert("Sertifikatas užregistruotas ir laukia patvirtinimo")
        //this.props.postDish(3, "Janis Jonas", "images/trainerJanisCropped.png", "images/trainerJanis.png", "+37068888888",
        //"Toble tenis?", "Nuo 2017 metų", "Toble tennis god", false, "Veri gud toble tennis sportsmen");
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
            //react fragment
            <React.Fragment>
                <Navbar className="sticky-nav" dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"></span> Pradinis
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg"></span> Pacientai
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button disabled={!this.state.LoggedIn} color="primary" onClick={this.toggleRegisterSertModal}>
                                        Registruoti sertifikatą
                                    </Button>
                                </NavItem>
                                ' '
                                <NavItem>
                                    <Button disabled={!this.state.LoggedIn} color="success" onClick={this.toggleRegisterAdModal}>
                                        Registruoti pacientą
                                    </Button>
                                </NavItem>
                                ' '
                                <NavItem>
                                    <Button color="danger" onClick={this.toggleLoginModal}>
                                        {this.state.Button}<span className="fa fa-sign-in fa-lg"></span>
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Trenerių paieškos sistema</h1>
                            </div>
                        </div>
                    </div>
                </Jumbotron>

                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader toggle={this.toggleLoginModal}>Prisijungti</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Vartotojo vardas</Label>
                                <Input type="text" id="username" name="username" innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Slaptažodis</Label>
                                <Input type="password" id="password" name="password" innerRef={(input) => this.password = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember" innerRef={(input) => this.remember = input} />
                                    Atsiminti
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" className="bg-primary">Prisijungti</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isRegisterAdModalOpen} toggle={this.toggleRegisterAdModal}>
                    <ModalHeader toggle={this.toggleRegisterAdModal}>Registruoti pacientą</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleRegisterAd}>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="kineState">Sesijos statusas</label>
                                    <div className="form-group row">
                                        <div className="col-6">
                                            <select onChange={this.handleLabelSessionChanged} >
                                                <option value="Laukia">Pacientas laukia sesijos pradžios</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-8">
                                    <label className="control-label" for="name">Vardas Pavardė</label>
                                    <input type="text" className="form-control form-control-sm mr-1" id="name"
                                        placeholder="Vardas Pavardė" onChange={this.handleNameChanged} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-8">
                                    <label className="control-label" for="healthHistoryNr">Sveikatos istorijos numeris</label>
                                    <input type="text" className="form-control form-control-sm mr-1" id="healthHistoryNr"
                                        placeholder="Sveikatos istorijos Nr." onChange={this.handleHealthHistoryChanged} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-8">
                                    <label className="control-label" for="personalId">Asmens kodas</label>
                                    <input type="text" className="form-control form-control-sm mr-1" id="personalId"
                                        placeholder="Asmens kodas" onChange={this.handlePersonalIdChanged} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-8">
                                    <label className="control-label" for="dateOfBirth">Gimimo data</label>
                                    <input type="text" className="form-control form-control-sm mr-1" id="dateOfBirth"
                                        placeholder="YYYY-MM-DD" onChange={this.handleDateOfBirthChanged} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="kineState">Lytis</label>
                                    <div className="form-group row">
                                        <div className="col-6">
                                            <select onChange={this.handleLabelGenderChanged} >
                                                <option value="male">Vyr.</option>
                                                <option value="female">Mot.</option>
                                                <option value="other">Kit.</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-8">
                                    <label className="control-label" for="address">Adresas</label>
                                    <input type="text" className="form-control form-control-sm mr-1" id="address"
                                        placeholder="Miestas, Gatvė namas-būtas" onChange={this.handleAddressChanged} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-8">
                                    <label className="control-label" for="telNum">Telefono numeris</label>
                                    <input type="tel" className="form-control form-control-sm mr-1" id="telNum"
                                        placeholder="Telefono numeris" onChange={this.handleTelChanged} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-sm-8">
                                    <label for="email">El. paštas</label>
                                    <input type="email" className="form-control form-control-sm mr-1" id="email"
                                        placeholder="Elektroninio pašto adresas" onChange={this.handleEmailChanged} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="illnessDescription">Lygos aprašymas</label>
                                    <textarea className="form-control" id="illnessDescription" placeholder="Paciento lygos aprašymas"
                                     name="address" rows="6" onChange={this.handleIllnessDescriptionChanged}></textarea>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="diagnosis">Diagnozės</label>
                                    <textarea className="form-control" id="diagnosis" placeholder="Diagnozės"
                                     name="address" rows="6" onChange={this.handleDiagnosisChanged}></textarea>
                                </div>
                            </div>
                            <div className="form-row">
                                <Button type="cancel" className="btn btn-secondary btn-sm ml-auto"
                                    data-dismiss="modal">Atšaukti</Button>
                                <Button type="submit" value="submit" className="bg-primary">Registruoti pacientą</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>


                <Modal isOpen={this.state.isRegisterSertModalOpen} toggle={this.toggleRegisterSertModal}>
                    <ModalHeader toggle={this.toggleRegisterSertModal}>Registruoti sertifikatą</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleRegisterSert}>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="Photo">Sertifikatas: </label>
                                    <div className="col-12 col-md-6 align-items-center">
                                        <input type="file" id="photo" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group required col-sm-12">
                                    <label className="control-label" for="competence">Aprašymas</label>
                                    <textarea className="form-control" id="competence" name="competence" rows="6"></textarea>
                                </div>
                            </div>
                            <div className="form-row">
                                <Button type="cancel" className="btn btn-secondary btn-sm ml-auto"
                                    data-dismiss="modal">Atšaukti</Button>
                                <Button type="submit" value="submit" className="bg-primary">Registruoti sertifikatą</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )

    }

}

export default Header;