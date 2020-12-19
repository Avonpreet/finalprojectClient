import Axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { NotificationContext } from '../../shared/Notifications';
import { GlobalStoreContext } from '../../shared/Globals';
import { UserContext } from '../../Authentication/UserProvider';

const Destroy = () => {

  const { user } = useContext(UserContext);
  const { id } = useParams();
  const { setNotification } = useContext(NotificationContext);
  const { globalStore } = useContext(GlobalStoreContext);

  useEffect(() => {
    Axios.post(`${globalStore.REACT_APP_ENDPOINT}/products/destroy`, {
        _id : id,
        secret_token: (user && user.token)
    })
    .then(({ data }) => {
        if (data) {
            setNotification({
                type: "success",
                message: "Product was deleted successfully"
            });
        }
      
      }
    )
    .catch((error) => {
        setNotification({
          type: "danger",
          message: `There was an error deleting the product: ${error.message}`
        });
      });
  });
    return <Redirect to="/" />
}
 
export default Destroy;