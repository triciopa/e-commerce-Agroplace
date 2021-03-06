import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../scss/components/PromotionsForm/_PromotionsCreate.scss";
import { postPromotion } from "../../redux/PromotionsFormReducer/actionsPromotionsForm";
import swal from "sweetalert";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  getProductName,
  clearProduct,
} from "../../redux/reducerProductForms/actionsProductForms";

const grisPrincipal = "#EFEFEF";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "40px auto",
      width: "90%",
      borderRadius: "5px",
      background: "white",
      color: "black",
    },
  },
  input: {
    width: "90%",
    color: "red",
    marginTop: "15px",
    marginBottom: "15px",
  },
  cancelIcon: {
    color: "rgb(245, 59, 26)",
    backgroundColor: grisPrincipal,
    cursor: "pointer",
    borderRadius: "50%",
  },
  button: {
    color: "white",
    padding: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

export default function PromotionsCreate(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [input, setInput] = useState({
    description: "",
    categoryCheck: [],
    products: [],
    discountDate: "",
    combo: "",
    days: [],
  });

  //TRAIGO EL PRODUCTO CONSULTADO X NOMBRE
  const [name, setName] = useState("");
  const [product, setProduct] = useState([]);
  const [productRender, setProductRender] = useState([]);
  const productGlobal = useSelector(
    (state) => state.reducerProductForms.product
  );

  useEffect(() => {
    setProduct(productGlobal);
    async function alerting() {
      if (productGlobal[0]?.error) {
        swal("Oops!", "No existe un producto con ese nombre", "error");
      }
    }
    alerting();
    async function setter() {
      if (productGlobal[0]) {
        setProductRender([
          ...productRender?.filter((e) => e[1] !== productGlobal[0].id),
          [productGlobal[0].name, productGlobal[0].id],
        ]);

        setInput({
          ...input,
          products: [
            ...input.products?.filter((n) => n !== productGlobal[0].id),
            productGlobal[0].id,
          ],
        });
      }
    }
    setter();
  }, [productGlobal, dispatch]);

  const category = useSelector(
    (state) => state.categoryFilterReducer.categories
  );

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryCheck = function (e) {
    if (e.target.checked) {
      setInput({
        ...input,
        categoryCheck: [...input.categoryCheck, parseInt(e.target.value)],
      });
    } else {
      setInput({
        ...input,
        categoryCheck: input.categoryCheck.filter(
          (category) => category !== parseInt(e.target.value)
        ),
      });
    }
  };

  const handleDeleteProduct = function (e, id) {
    setInput({
      ...input,
      products: input.products.filter((p) => p !== id),
    });
    setProductRender(productRender.filter((pr) => pr[1] !== id));
  };
  //BUSCAR PRODUCTO
  function handleQuery(name, event) {
    event.preventDefault();
    if (!name)
      return swal("Advertencia", "No lo se Rick, parece vacio", "warning");
    dispatch(getProductName(name));
  }
  //FIN BUSCAR PRODUCTO
  const handleDayCheck = function (e) {
    if (e.target.checked) {
      setInput({
        ...input,
        days: [...input.days, parseInt(e.target.value)],
      });
    } else {
      setInput({
        ...input,
        days: input.days.filter((day) => day !== parseInt(e.target.value)),
      });
    }
  };

  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Mi??rcoles",
    "Jueves",
    "Viernes",
    "S??bado",
  ];

  const handleSubmit = function (event) {
    event.preventDefault();
    if (input.discountDate <= 0 || input.discountDate > 99) {
      swal(
        "Aviso!",
        "El valor del porcentaje de descuento debe estar entre 1 y 99",
        "warning"
      );
    } else if (input.combo < 0) {
      swal("Aviso!", "El n??mero del combo no debe ser negativo", "warning");
    } else {
      dispatch(
        postPromotion(
          input.description,
          input.categoryCheck,
          input.products,
          input.discountDate,
          input.combo,
          input.days
        )
      );

      setInput({
        description: "",
        categoryCheck: [],
        products: [],
        discountDate: [],
        combo: "",
        days: [],
      });

      setProductRender([]);
      setName("");
      let inputs = document.querySelectorAll("input[type=checkbox]");
      inputs.forEach((item) => {
        item.checked = false;
      });
      swal("??xito!", `La promocion ${input.combo} ha sido creada`, "success");
    }
  };

  return (
    <div className="containerPromotionFormCreate">
      <h1>Agregar promociones</h1>
      <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
        <div className="cont-1">
          <TextField
            id="outlined-basic"
            label="Descripci??n..."
            placeholder="Agregue la descripci??n de la promoci??n..."
            variant="outlined"
            name="description"
            value={input.description}
            type="text"
            required
            onChange={handleChange}
            className={classes.input}
          />

          <label className="label">Categoria:</label>
          <div className="categoryBoxes">
            {category &&
              category.map((c) => {
                return (
                  <div key={c.name}>
                    <label>{c.name}</label>
                    <input
                      type="checkbox"
                      value={c.id}
                      onChange={(e) => handleCategoryCheck(e)}
                    />
                  </div>
                );
              })}
          </div>

          <TextField
            id="outlined-basic"
            label="Productos..."
            placeholder="Agregue los productos a los que aplicar?? la promoci??n..."
            variant="outlined"
            name="product"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={classes.input}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={(e) => {
              handleQuery(name, e);
            }}
          >
            Consultar producto
          </Button>
          {productRender.length &&
            productRender.map((n) => {
              return (
                <div className="ProductName">
                  <p>{n[0]}</p>
                  <CancelIcon
                    className={classes.cancelIcon}
                    onClick={(e) => handleDeleteProduct(e, n[1])}
                  />
                </div>
              );
            })}

          <TextField
            id="outlined-basic"
            label="Porcentaje"
            placeholder="Agregue el porcentaje de descuento..."
            variant="outlined"
            name="discountDate"
            value={input.discountDate}
            type="number"
            InputProps={{ inputProps: { min: 1, max: 99 } }}
            required
            onChange={handleChange}
            className={classes.input}
          />

          <TextField
            id="outlined-basic"
            label="Combo..."
            variant="outlined"
            name="combo"
            value={input.combo}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 999999 } }}
            required
            onChange={handleChange}
            className={classes.input}
          />

          <label className="label">D??a/s:</label>
          <div className="categoryBoxes">
            {dias &&
              dias.map((d) => {
                return (
                  <div key={d}>
                    <label>{d}</label>
                    <input
                      type="checkbox"
                      value={dias.indexOf(d)}
                      onChange={(e) => handleDayCheck(e)}
                    />
                  </div>
                );
              })}
          </div>

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
          >
            Crear promocion
          </Button>
        </div>
      </form>

      <NavLink to="/user/info">
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => dispatch(clearProduct())}
        >
          Volver
        </Button>
      </NavLink>
    </div>
  );
}
