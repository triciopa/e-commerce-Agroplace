import React from 'react';
import { NavLink } from "react-router-dom";

function product_form_query(props) {
    return (
        <div className = "cont-gral">
            <h1>Consultar producto</h1>
            <form>
        <div className = "cont-1">
          <label className="label">Id del producto:</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder=" Id..."
            /* onChange={ (e) => handleId(e) } */
          />
         </div> 
        <button
          onClick={() => {/*DESPACHAR LA ACCION CORRECTA*/}}
        >
          Consultar producto
        </button>
      </form>
      <NavLink to="/admin/product/form">
        <button>Volver</button>
      </NavLink>
        </div>
    );
}

export default product_form_query;