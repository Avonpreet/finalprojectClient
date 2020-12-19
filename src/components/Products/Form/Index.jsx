import React, { useContext, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { NotificationContext } from '../../shared/Notifications';
import { UserContext } from '../../Authentication/UserProvider';
import { GlobalStoreContext } from '../../shared/Globals';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';


const ProductForm = ({ endpoint, preload }) => {

    let imageArr = [
        {
            itemName: 'casual backpack',
            imageUrl: '1Hy7fI7_Fj2oEzRtN5vMJbNC-X224SyTT'
        },
        {
            itemName: 'fashion shoes',
            imageUrl: '1zT3Kfn4wI68upeXaVosOcdL-k6xjfAvJ'
        },
        {
            itemName: 'flower pot',
            imageUrl: '1SPAwpmUnX5_pYbpxcheGUhXSeGOeUUCb'
        },
        {
            itemName: 'head phone',
            imageUrl: '11ZnjETsZbYeHX24VlonlaEP_64vkfvUa'
        },
        {
            itemName: 'lip stick',
            imageUrl:  '1mMvxat9tnKxJN3BVSIRvgBJu4yFK0fwM'
        },
        {
            itemName: 'ray ban',
            imageUrl: '1yt-N6Ay-AgADhjpaJD0h2Bnbl3FNXLA-'
        },
        {
            itemName: 'running shoes',
            imageUrl: '1mZDJMeJdfMXSBkrzLmDxSUovngfH4olr'
        },
        {
            itemName: 'speaker',
            imageUrl: '1ofKn9FsjJaBIjFgM0JGSdeYIROJ6EtJG'
        },
        {
            itemName: 'JD Whisky',
            imageUrl: '1tkFSqZ0icV0WBg7bKJLjFZaTIKls8C5U'
        }
    ]
    

  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);
  const { setNotification } = useContext(NotificationContext);
  const { user } = useContext(UserContext);
  const { globalStore } = useContext(GlobalStoreContext);

  useEffect(() => {
    setInputs({...preload});
  }, [preload])

  const handleChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(inputs);

    Axios.post(`${globalStore.REACT_APP_ENDPOINT}/${endpoint}`, {
      ...inputs,
      secret_token: (user && user.token)
    })
    .then(({ data }) => {
      if (data) {
        if(endpoint == "products"){
          setNotification({
            type: "success",
            message: "Product was created successfully"
          });
        }else{
          setNotification({
            type: "success",
            message: "Product was updated successfully"
          });
        }
      }
      setRedirect(true);
    })
    .catch((error) => {
      setNotification({
        type: "danger",
        message: `There was an error creating the product: ${error.message}`
      });
    });
  };

  if (redirect) return <Redirect to="/"/>;
  
  return (
  
    <Form onSubmit={handleSubmit} style={{marginBottom: "45px"}}>
    <Form.Group controlId="exampleForm.ControlInput1">
      <Form.Label>Product Name</Form.Label>
      <Form.Control 
      name="productName"
      placeholder="Product Name"
      onChange={handleChange} 
      defaultValue={inputs.productName}
      />
    </Form.Group>

     <Form.Group controlId="exampleForm.ControlInput1">
      <Form.Label>Quantity</Form.Label>
      <Form.Control 
      name="quantity"
      placeholder="Quantity"
      onChange={handleChange} 
      defaultValue={inputs.quantity}
      />
    </Form.Group>
   
     <Form.Group controlId="exampleForm.ControlInput1">
      <Form.Label>Category</Form.Label>
      <Form.Control 
      name="category"
      placeholder="Category"
      onChange={handleChange} 
      defaultValue={inputs.category}
      />
    </Form.Group>

     <Form.Group controlId="exampleForm.ControlInput1">
      <Form.Label>Price</Form.Label>
      <Form.Control 
      name="price"
      placeholder="price"
      onChange={handleChange} 
      defaultValue={inputs.price}
      />
    </Form.Group>

    <Form.Group controlId="exampleForm.ControlSelect1">
      <Form.Label>Product Image</Form.Label>
      
      <Form.Control as="select" name="productUrl" onChange={handleChange}>
        {imageArr.map(image => {
          return <option value={image.imageUrl} key={image.imageUrl}>{image.itemName}</option>
        })}
      </Form.Control>
    </Form.Group>

     <Button variant="primary" type="submit">
              Submit
      </Button>
  </Form>

  );
}
 
export default ProductForm;