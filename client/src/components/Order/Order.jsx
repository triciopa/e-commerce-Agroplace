import React,{useEffect} from "react";
import OrderDetail from "./OrderDetail";
import { useSelector } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import "../../scss/components/Order/_Order.scss"
import { Button } from "@material-ui/core";
import OrderModify from './OrderModify'
import axios from 'axios'


function Order() {
  const products = useSelector((state) => state.cartReducer.cart);
  const total = useSelector((state) => state.cartReducer.total);
  const user = useSelector(state=>state.loginReducer.user)
  const isLogin = useSelector(state=>state.loginReducer.isLogin)

  useEffect(() => {
    async function postOrder(){
      let id= Date.now()

      let user={
        "firstName": "NataN",
        "lastName": "J",
        "state": "cart",             
        "paymentDate": "hoy",
        "totalPrice": total
      }
      console.log(typeof id)
      await axios.post(`http://localhost:3001/order/orders/${id}`,{
        
        "firstName": user.firstName,
        "lastName": user.lastName,
        "state": "cart",             
        "paymentDate": user.paymentDate,
        "totalPrice": total

      
      })

      
    }

    postOrder()

  }, [isLogin])

 


  return (
    <div>
      <div className="order-container">
        <div className="cart">
          {products ? (
            products?.map((product) => <OrderDetail product={product} />)
          ) : (
            <h1>No hay elementos en el carrito</h1>
          )}
        </div>
      </div>
      <div className="total">{total ? <h2>Total ${total}</h2> : ""}
      {(isLogin ? <a>Espacio para mercadoPago</a> : <Link className="link-redirect" to='/user/login'><Button className="test2">Realizar Pago</Button></Link>)}
      
      </div>
     <div>
          <OrderModify />
     </div>
        
    </div>
  );
}

export default Order;
