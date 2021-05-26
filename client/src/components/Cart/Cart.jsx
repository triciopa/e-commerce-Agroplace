import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// styles
import '../../scss/components/Cart/_Cart.scss';

// Material UI
import swal from 'sweetalert';
import { Button } from '@material-ui/core';

// Redux
import { emptyDb, totalPrice } from '../../redux/cartReducer/cartActions';
import { reset } from '../../redux/iconReducer/iconActions';

// React components
import ProductCart from './ProductCart';

function Cart() {
  const products = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(totalPrice());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(emptyDb());
    dispatch(totalPrice());
  };

  return (
    <div className="cart-container">
      <h1>Carrito ({products.length})</h1>
      <div className="cart">
        {products ? (
          products?.map((product) => (
            <ProductCart product={product} key={product.id} />
          ))
        ) : (
          <h1>No hay elementos en el carrito</h1>
        )}
      </div>
      <div className="deleteAll">
        {products.length !== 0 ? (
          <Button onClick={handleClick}>Eliminar todo</Button>
        ) : (
          ''
        )}
      </div>
      <hr />
      <div></div>
      <div className="total">
        {total ? <h2>Total ${total}</h2> : ''}
        {products.length ? (
          <Link className="link-redirect" to="/user/cart/order">
            <Button>Continuar Compra</Button>
          </Link>
        ) : (
          <div>¿Aún no llenas tu carrito? ¡Anímate a hacerlo!</div>
        )}
      </div>
    </div>
  );
}

export default Cart;
