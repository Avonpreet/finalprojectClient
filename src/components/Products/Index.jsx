import React, { useContext, useState, useEffect } from 'react';
import Header from '../shared/Header';
import { NotificationContext } from '../shared/Notifications';
import { GlobalStoreContext } from '../shared/Globals';
import { UserContext } from '../Authentication/UserProvider';
import Axios from 'axios';
import { Container, Card, Button, CardDeck, CardGroup, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Products = () => {
  
  const { setNotification } = useContext(NotificationContext);
  const { globalStore } = useContext(GlobalStoreContext);
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    Axios.get(`${globalStore.REACT_APP_ENDPOINT}/products`)
    .then(({ data }) => {
      setProducts(data);
      
    })
    .catch(error => {
      console.log(error);
    });
  }, [globalStore, setNotification]);

  return (
    <>

      <Header title="Products">
        Welcome To Avon Shop
      </Header>
      {console.log(products)}
      
      <Container>
        <Row>
          <Col md={2}/>
          <Col md={8}>
          {products && products.length > 0 ?
           products.map(product => {
             return (
             
                     <Card style={{  marginBottom: "20px"}}>
                        <Card.Img variant="top" src={`https://drive.google.com/uc?export=view&id=${product.productUrl}`} alt="products" fluid />
                        <Card.Body>
                          <Card.Title>{product.productName}</Card.Title>
                          <Card.Text>
                            Price {product.price}$
                          </Card.Text>
                          <Button variant="primary">Add To Cart</Button>
                          {user && user.token 
                          ? 
                          <>
                            <Link to={`/edit/${product._id}`}><Button variant="info" style={{marginLeft: "5px"}}>Edit</Button></Link>
                            <Link to={`/destroy/${product._id}`}><Button variant="danger" style={{marginLeft: "5px"}}>Delete</Button></Link>
                          </>
                          :
                          null
                        }
                        </Card.Body>
                    </Card>
             
             )
           })
           : 
           null
        }
          </Col>
          <Col md={2}/>
        </Row>
         
      </Container>
    </>
  );
}
 
export default Products;