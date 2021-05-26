import React, { useEffect, useState } from 'react';
import OrderDetail from './OrderDetail';
import { useSelector } from 'react-redux';
import '../../scss/components/Order/_Order.scss';
import '../../scss/components/formCategories/_Form.scss';
import FormPayment from '../formPayment/FormPayment';

function Order() {
  const product = useSelector((state) => state.cartReducer.cart);

  return (
    <div>
      <div className="order-container">
        <div className="cart">
          <div className="OrderModify">
            <OrderModify />
          </div>
          {products ? (
            products?.map((product) => <OrderDetail product={product} />)
          ) : (
            <h1>No hay elementos en el carrito</h1>
          )}
        </div>
      </div>

      <div className="total">
        {total ? <h2>Total ${total}</h2> : ''}
        {isLogin ? (
          <a>Espacio para mercadoPago</a>
        ) : (
          <Link className="link-redirect" to="/user/login">
            <Button className="test2">Realizar Pago</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Order;
