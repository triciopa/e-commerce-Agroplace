import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../scss/components/UserScreen/_UserScreen.scss';
import { BiLogOut, BiListPlus } from 'react-icons/bi';
import OrderHistory from '../OrderHistory/OrderHistory';
import AdminPanel from '../Admin/AdminPanel';

import DistributionCenters from '../LocationStock/DistributionCenters';
import Preferences from '../Wishlist/Preferences';
import { emptyCart } from '../../redux/cartReducer/cartActions';
import { reset } from '../../redux/iconReducer/iconActions';
import { LogOut } from '../../redux/loginReducer/loginActions';
import { getFavs } from '../../redux/wishlistReducer/wishlistActions';
import Swal from 'sweetalert2';
import Settings from '../SettingsUser/Settings';
import axios from "axios"
import { useHistory } from 'react-router';
import SendOrder from '../SendOrder/SendOrder';
export function UserScreen() {
  const [render, setRender] = useState('miCuenta');
  const login = useSelector((state) => state.loginReducer);
  
  const userId = localStorage.getItem("user")

  const dispatch = useDispatch();
  
  useEffect(() => {
    const data = localStorage.getItem("render");
    if (data) {
      setRender(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("render", JSON.stringify(render));
  },[render]);

  function handleClick(e) {
    e.preventDefault();
    setRender(e.target.id);
    if (e.target.id === 'favorites') {
      let favList = JSON.parse(localStorage.getItem('Fav'));
      dispatch(getFavs(favList));
    }
  }

  const handleLogOut = () => {
    if (login.isLogin) {
      dispatch(LogOut());
      dispatch(emptyCart());
      dispatch(reset());
      Swal.fire('Se ha cerrado sesión');
      localStorage.removeItem('user');
    }

  };

  return (
    <div className="infoContainer">
      <div className="selectScreen">
        <h2 id="MyAccount" onClick={(e) => handleClick(e)}>
          Mi Cuenta
        </h2>
        <div
          id="PurchaseHistory"
          onClick={(e) => handleClick(e)}
          style={
            render === 'PurchaseHistory'
              ? {
                  backgroundColor: 'var(--color-brand)',
                  opacity: '50%',
                  color: 'var(--color-light)',
                }
              : { backgroundColor: '' }
          }
        >
          Mis Compras
        </div>
        
        
        <div
          id="Mis envios"
          onClick={(e) => handleClick(e)}
          style={
            render === 'Mis envios'
              ? {
                  backgroundColor: 'var(--color-brand)',
                  opacity: '50%',
                  color: 'var(--color-light)',
                }
              : { backgroundColor: '' }
          }
        >
          Mis envios
        </div>
        
        <div
          id="Configuracion"
          onClick={(e) => handleClick(e)}
          style={
            render === 'Configuracion'
              ? {
                  backgroundColor: 'var(--color-brand)',
                  opacity: '50%',
                  color: 'var(--color-light)',
                }
              : { backgroundColor: '' }
          }
        >
          Configuración
        </div>
        <div
          id="Preferences"
          onClick={(e) => handleClick(e)}
          style={
            render === 'Preferences'
              ? {
                  backgroundColor: 'var(--color-brand)',
                  opacity: '50%',
                  color: 'var(--color-light)',
                }
              : { backgroundColor: '' }
          }
        >
          Mis listas
        </div>


        {login.isAdmin ? (
          <div
            id="DistributionCenters"
            onClick={(e) => handleClick(e)}
            style={
              render === "DistributionCenters"
                ? {
                    backgroundColor: "var(--color-brand)",
                    opacity: "50%",
                    color: "var(--color-light)",
                  }
                : { backgroundColor: "" }
            }
          >
            Centros de Distribución
          </div>
        ) : null}
        {login.isAdmin ? (
          <div
            id="AdminPanel"
            onClick={(e) => handleClick(e)}
            style={
              render === "AdminPanel"
                ? {
                    backgroundColor: "var(--color-brand)",
                    opacity: "50%",
                    color: "var(--color-light)",
                  }
                : { backgroundColor: "" }
            }
          >
            Administración
          </div>
        ) : null}
        <div
          id="LogOut"
          onClick={() => handleLogOut()}
          style={
            render === 'LogOut'
              ? {
                  backgroundColor: 'var(--color-brand)',
                  opacity: '50%',
                  color: 'var(--color-light)',
                }
              : { backgroundColor: '' }
          }
        >
          Cerrar Sesión <BiLogOut />
        </div>
      </div>

      <div className="rendersContainer">
        {render === 'MyAccount' ? (
          <h3>Datos de mi cuenta</h3>
        ) : render === 'PurchaseHistory' ? (
          <OrderHistory />
        ) : render ==="Configuracion" ?(
          <Settings  />
        ) : render ==="Mis envios" ? (
         <SendOrder/>
        ) : render ==="Preferences" ? (
         <Preferences/>
        ) : render === "DistributionCenters" ? (
          <DistributionCenters />
        ) : render === "AdminPanel" ? (
          <AdminPanel />
        ) : (
          <div id="welcomeUser">
            <h3>¡Hola {login.user.firstName}!</h3>
            <p>
              {login.isAdmin ? (
                <p>Este es tu panel de administrador, en el que podrás:</p>
              ) : (
                <p>Este es tu panel de usuario, en el que podrás:</p>
              )}

              <ul>
                <li>
                  interactuar con tus <strong>favoritos</strong>
                </li>
                <li>
                  administrar tus <strong>listas de deseados</strong>
                </li>
                <li>
                  ver tu historial de <strong>compras</strong>
                </li>
                {login.isAdmin ? (
                  <li>
                    crear <strong>nuevos productos</strong> y modificar{' '}
                    <strong>existencias</strong>
                  </li>
                ) : null}
                {login.isAdmin ? (
                  <li>
                    crear <strong>nuevas categorías</strong> y modificar las{' '}
                    <strong>existentes</strong>
                  </li>
                ) : null}
                {login.isAdmin ? (
                  <li>
                    ver todas las <strong>órdenes de compra</strong>
                  </li>
                ) : null}
                <li>
                  Salir de tu cuenta al <strong>cerrar sesión</strong>
                </li>
              </ul>
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              delectus sunt inventore minima, in beatae, vero eos sapiente qui
              nisi autem obcaecati dolorem molestiae architecto voluptate enim
              exercitationem, vitae quas?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              delectus sunt inventore minima, in beatae, vero eos sapiente qui
              nisi autem obcaecati dolorem molestiae architecto voluptate enim
              exercitationem, vitae quas?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserScreen;
