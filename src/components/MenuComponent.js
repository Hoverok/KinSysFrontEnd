import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, Media, Form, Input, Label, FormGroup, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Component } from 'react';
import { SearchParams } from '../shared/searchParams';


function RenderMenuItem({ dish, onClick }) {


    if (SearchParams.sessionActivity === '' && SearchParams.name === '') {
        return (

            <Link to={`/menu/${dish.id}`} >
                <div className="col-12 mt-2">
                    <Media className="media border p-2">
                        <div>
                            <Media body>
                                <Media heading>{dish.name}</Media>
                                <Media heading>{dish.personalId}</Media>
                                <div className="d-none d-sm-block">
                                    <span className="badge badge-info">{dish.sessionActivity}</span>
                                </div>
                                <p className="d-none d-sm-block"><b>Diagnozė:</b> {dish.diagnosis}</p>
                                <p className="d-none d-sm-block"><b>Lygos aprašymas:</b> {dish.illnessDescription}</p>
                            </Media>
                        </div>
                    </Media>
                </div>
            </Link>
        );
    } else if (SearchParams.name === '' && SearchParams.sessionActivity === dish.sessionActivity) {
        return (

            <Link to={`/menu/${dish.id}`} >
                <div className="col-12 mt-2">
                    <Media className="media border p-2">
                        <div>
                            <Media body>
                                <Media heading>{dish.name}</Media>
                                <Media heading>{dish.personalId}</Media>
                                <div className="d-none d-sm-block">
                                    <span className="badge badge-info">{dish.sessionActivity}</span>
                                </div>
                                <p className="d-none d-sm-block"><b>Diagnozė:</b> {dish.diagnosis}</p>
                                <p className="d-none d-sm-block"><b>Lygos aprašymas:</b> {dish.illnessDescription}</p>
                            </Media>
                        </div>
                    </Media>
                </div>
            </Link>
        );
    } 
    else if (dish.name.includes(SearchParams.name) && SearchParams.sessionActivity === dish.sessionActivity) {
        return (

            <Link to={`/menu/${dish.id}`} >
                <div className="col-12 mt-2">
                    <Media className="media border p-2">
                        <div>
                            <Media body>
                                <Media heading>{dish.name}</Media>
                                <Media heading>{dish.personalId}</Media>
                                <div className="d-none d-sm-block">
                                    <span className="badge badge-info">{dish.sessionActivity}</span>
                                </div>
                                <p className="d-none d-sm-block"><b>Diagnozė:</b> {dish.diagnosis}</p>
                                <p className="d-none d-sm-block"><b>Lygos aprašymas:</b> {dish.illnessDescription}</p>
                            </Media>
                        </div>
                    </Media>
                </div>
            </Link>
        );
    }
    else if (dish.name.includes(SearchParams.name) && SearchParams.sessionActivity === '') {
        return (

            <Link to={`/menu/${dish.id}`} >
                <div className="col-12 mt-2">
                    <Media className="media border p-2">
                        <div>
                            <Media body>
                                <Media heading>{dish.name}</Media>
                                <Media heading>{dish.personalId}</Media>
                                <div className="d-none d-sm-block">
                                    <span className="badge badge-info">{dish.sessionActivity}</span>
                                </div>
                                <p className="d-none d-sm-block"><b>Diagnozė:</b> {dish.diagnosis}</p>
                                <p className="d-none d-sm-block"><b>Lygos aprašymas:</b> {dish.illnessDescription}</p>
                            </Media>
                        </div>
                    </Media>
                </div>
            </Link>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}

const Menu = (props) => {

    const menu = props.dishes.dishes.map((dish) => {
        return (
            //key identifies rendered property, id taken from dishes
            <div key={dish.id} className="col-12">
                <RenderMenuItem dish={dish} />
            </div>
        );
    });

    if (props.dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.dishes.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.dishes.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container">
                <div className="row col-12">
                    <h3>Pacientai</h3>
                    <hr />
                </div>
                <div className="row col-12">
                    <Media list>
                        {menu}
                    </Media>
                </div>


            </div>
        );
}


export default Menu;