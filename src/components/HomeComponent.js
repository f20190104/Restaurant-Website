import React from 'react'
import {Card, CardBody, CardImg, CardTitle, CardSubtitle, CardText} from 'reactstrap'
import {Loading} from './LoadingComponent'
function RenderCard({item, isLoading, ErrMess}) {
    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (ErrMess) {
        return (
        <h4>{ErrMess}</h4>
        );
    }
    else 
    return (
    <Card>
        <CardImg src={item.image} alt={item.name}/>
        <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>:null}
            <CardText>
                {item.description}
            </CardText>
        </CardBody>
    </Card>
);
}
function Home(props) 
{
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isLoading={props.isLoading} ErrMess={props.ErrMess}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}/>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}/>
                </div>
            </div>
        </div>

    );
}

export default Home;