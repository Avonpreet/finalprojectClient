import React from 'react';
import Header from '../../shared/Header';
import { Container } from 'react-bootstrap';
import ProductForm from '../Form/Index';

const New = () => {
  return (
    <>
      <Header title="Add Product">
        Welcome To Avon Shop
      </Header>

      <Container>
        <ProductForm endpoint="products"/>
      </Container>
    </>
  );
}
 
export default New;