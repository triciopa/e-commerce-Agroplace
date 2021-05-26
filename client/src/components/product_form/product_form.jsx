import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { clearProduct } from "../../redux/reducerProductForms/actionsProductForms";
import { useDispatch } from "react-redux";
import "../../scss/components/productsForm/_ProductForm.scss";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CategoriesForm from '../formCategories/Form';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: "10px",
    color: "white",
    padding: "10px",
    fontWeight: "bold"
  },
}));

function Product_form(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  // const [render, setRender] = useState('');

  // function handleClick(e) {
  //   e.preventDefault();
  //   setRender(e.target.id);
  // }


  return (
    <div className="containerProdForm">
      <h1>Administración de productos</h1>
      <div className="contBtnProdForm">
        <NavLink to="/admin/product/form/create">
          <Button className={classes.button} variant="contained" color="primary">
            Crear
          </Button>
        </NavLink>
        <NavLink to="/admin/product/form/query">
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => dispatch(clearProduct())}
          >
            Consultar
          </Button>
        </NavLink>
      </div>
      <h1>Administración de categorías</h1>
        <div>
          <CategoriesForm /> 
        </div>
    </div>
  );
}

export default Product_form;

