import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, Media, Form, Input, Label, FormGroup, Button } from "reactstrap";
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Component } from 'react';
import { SearchParams } from '../shared/searchParams';


function RenderMenuItem({ dish, onClick }) {


    if (SearchParams.label === '' && SearchParams.name === '') {
        return (

            <Link to={`/menu/${dish.id}`} >
                <div className="col-12 mt-5">
                    <Media className="media border p-3">

                        <div className="col-3">
                            <Media left middle>
                                <Media className="d-block mr-3 img-fluid img-fit" object src={baseUrl + dish.image} alt={dish.name} />
                            </Media>
                        </div>
                        <div className="col-9">
                            <Media body>
                                <Media heading>{dish.name} {dish.lastName}</Media>
                                <div className="d-none d-sm-block">
                                    <span className="badge badge-info">{dish.label}</span>
                                </div>
                                <p className="d-none d-sm-block">{dish.description}</p>
                            </Media>
                        </div>

                    </Media>
                </div>
            </Link>
        );
    } else if (SearchParams.name === '' && SearchParams.label === dish.label) {
        return (

            <Link to={`/menu/${dish.id}`} >
                <div className="col-12 mt-5">
                    <Media className="media border p-3">

                        <div className="col-3">
                            <Media left middle>
                                <Media className="d-block mr-3 img-fluid img-fit" object src={baseUrl + dish.image} alt={dish.name} />
                            </Media>
                        </div>
                        <div className="col-9">
                            <Media body>
                                <Media heading>{dish.name}</Media>
                                <div className="d-none d-sm-block">
                                    <span className="badge badge-info">{dish.label}</span>
                                </div>
                                <p className="d-none d-sm-block">{dish.description}</p>
                            </Media>
                        </div>

                    </Media>
                </div>
            </Link>
        );
    } 
    else if (dish.name.includes(SearchParams.name) && SearchParams.label === dish.label) {
        return (

            <Link to={`/menu/${dish.id}`} >
                <div className="col-12 mt-5">
                    <Media className="media border p-3">

                        <div className="col-3">
                            <Media left middle>
                                <Media className="d-block mr-3 img-fluid img-fit" object src={baseUrl + dish.image} alt={dish.name} />
                            </Media>
                        </div>
                        <div className="col-9">
                            <Media body>
                                <Media heading>{dish.name}</Media>
                                <div className="d-none d-sm-block">
                                    <span className="badge badge-info">{dish.label}</span>
                                </div>
                                <p className="d-none d-sm-block">{dish.description}</p>
                            </Media>
                        </div>

                    </Media>
                </div>
            </Link>
        );
    }
    else if (dish.name.includes(SearchParams.name) && SearchParams.label === '') {
        return (

            <Link to={`/menu/${dish.id}`} >
                <div className="col-12 mt-5">
                    <Media className="media border p-3">

                        <div className="col-3">
                            <Media left middle>
                                <Media className="d-block mr-3 img-fluid img-fit" object src={baseUrl + dish.image} alt={dish.name} />
                            </Media>
                        </div>
                        <div className="col-9">
                            <Media body>
                                <Media heading>{dish.name}</Media>
                                <div className="d-none d-sm-block">
                                    <span className="badge badge-info">{dish.label}</span>
                                </div>
                                <p className="d-none d-sm-block">{dish.description}</p>
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
                <div className="row col-12 justify-content-center">
                </div>
                <div className="row col-12">
                    <h3>Treneriai</h3>
                    <hr />
                </div>
                <div className="row col-12 justify-content-center">
                    <Media list>
                        {menu}
                    </Media>
                </div>


            </div>
        );

}


export default Menu;