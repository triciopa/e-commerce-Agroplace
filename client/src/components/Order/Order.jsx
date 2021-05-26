import React,{useEffect, useState} from 'react';
import OrderDetail from './OrderDetail';
import { useSelector } from 'react-redux';
import '../../scss/components/Order/_Order.scss';
import '../../scss/components/formCategories/_Form.scss';
import FormPayment from '../formPayment/FormPayment';

function Order() {
  const product = useSelector((state) => state.cartReducer.cart);  
 
  return (
    <div className="checkoutCart">
      <div className="order-container">
        <div className="cart">
          {product ? (
            product?.map((product) => <OrderDetail product={product} />)
          ) : (
            <h1>No hay elementos en el carrito</h1>
          )}
        </div>
       
      </div>

      <div className="total">
        <FormPayment />
      </div>
    </div>
  );
}

export default Order;
