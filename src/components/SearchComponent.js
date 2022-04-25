import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, Media, Form, Input, Label, FormGroup, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Component } from 'react';
import { SearchParams } from '../shared/searchParams';
import Menu from './MenuComponent';



class Search extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChanged = this.handleNameChanged.bind(this);
        this.handleLabelChanged = this.handleLabelChanged.bind(this);
    }

    handleNameChanged(event) {
        SearchParams.name = event.target.value;
    }

    handleLabelChanged(event) {
        SearchParams.sessionActivity = event.target.value;
    }


    handleSubmit(event) {
        event.preventDefault();
        this.forceUpdate();
    }

    render() {
        return (

            <div className="container">
                <div className="col-12 mt-2 justify-content-center">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <div className="col-10">
                                <Input type="text" className="form-control" id="name" name="name"
                                    placeholder="Įveskite paieškos parametrus" onChange={this.handleNameChanged} />
                            </div>
                            <div className="col-2">
                                <Button type="submit" className="btn btn-primary">
                                    <span className="fa fa-search fa-lg"></span>
                                </Button>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className="col-2">
                                <Label htmlFor="label">Sesijos statusas:</Label>
                            </div>
                            <div className="col-4">
                                <select onChange={this.handleLabelChanged} >
                                    <option value=""></option>
                                    <option value="Laukia">Laukia</option>
                                    <option value="Aktyvus">Aktyvus</option>
                                    <option value="Baigtas">Baigtas</option>
                                </select>
                            </div>
                        </FormGroup>
                    </Form>

                </div>

                <div className="row col-12 justify-content-center">
                    <Menu dishes={this.props.dishes} />
                </div>


            </div>


        );
    }
}

export default Search;
