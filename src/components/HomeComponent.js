import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';
import { Link } from 'react-router-dom';

function RenderCard({ item, isLoading, errMess }) {
    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    }
    else
        return (
            <FadeTransform in
                trasnformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <div>
                <Link to={`/menu`} >
                    <Button color="primary" size="lg" block>Gydytojams</Button>
                </Link>
                    <Button color="secondary" size="lg" block>Pacientams</Button>
                </div>
            </FadeTransform>
        );
}

function Home(props) {
    return (
        <div className="container">
            <div className="row col-12">
            </div>
            <div className="row justify-content-center">
                <div className="col-8 ">
                    <RenderCard />
                </div>
            </div>
        </div>
    );
}

export default Home;