import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseURL';

function Menu ({dishes, isLoading, ErrMess})
{
    const menu = dishes.map((dish) => {
        return (
        <div className="col-12 col-md-5 m-1">
            <Link to={`/menu/${dish.id}`}>
                <Card key={dish.id} >
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </Link>
            
        </div>);
    } );

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
    else return (
                <div>
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Menu</h3>
                            <hr /> 
                        </div>
                    </div>
                    <div className="row">
                        {menu}
                    </div>
                </div>
                
        )

}

export default Menu;