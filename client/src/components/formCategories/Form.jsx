import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PutCategory from '../formPutCategory/PutCategory';
import '../../scss/components/formCategories/_Form.scss';

function Form() {
  const [categories, setCategories] = useState([]);
  const [categorySelect, setCategorySelect] = useState(
    '-Seleccione una Categoria-'
  );
  const [addCategory, setAddCategory] = useState('');
  const [put, setPut] = useState('true');
  const [reload, setReload] = useState('true');

  useEffect(() => {
    dataCategories();
  }, [put, reload]);

  async function dataCategories() {
    let data = await axios.get(`http://localhost:3001/allCategories`);
    setCategories(data.data);
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!categorySelect) {
      alert('Empty');
    } else {
      await axios.post('http://localhost:3001/deleteCategory', {
        name: categorySelect,
      });
      alert('Deleted');
    }
    dataCategories();
    setCategorySelect('-Seleccione una Categoria-');
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!addCategory) {
      alert('Ingrese una categoria');
    } else {
      await axios.post('http://localhost:3001/addCategory', {
        name: addCategory,
      });
      alert('Categoria Creada');
    }
    dataCategories();
    setReload(!reload);
  };

  return (
    <div className="categories-form">
      <div className="box-form">
        
        <div className="box-options">

          <form onSubmit={handleAddCategory}>
            <label className="label-category">
              Crear categoría
            </label>
            <input
              className="input-category"
              value={addCategory}
              placeholder='Nuevos Fertilizantes...'
              onChange={(e) => setAddCategory(e.target.value)}
            ></input>
            
            <button
              className="button-putcategory"
              type="submit"
              onClick={(e) => handleAddCategory(e)}
            >
              Agregar
            </button>
          </form>
          <form>
            <label className="label-category">Modificar categoria</label>
            <select
              className="select-category"
              type="text"
              name=""
              required
              onChange={(e) => setCategorySelect(e.target.value)}
            >
              <option defaultValue>-Seleccione una Categoria-</option>
              {categories?.map((x) => (
                <option key={x.name} value={x.name}>
                  {x.name}
                </option>
              ))}
            </select>

            {categorySelect === '-Seleccione una Categoria-' ? (
              ''
            ) : (
              <div className="buttons-put">
                <button
                  className="button-putcategory"
                  onClick={(e) => {
                    handleDelete(e);
                    setReload(!reload);
                  }}
                >
                  Borrar
                </button>
                {categories.length === 0 ? (
                  ''
                ) : (
                  <button
                    className="button-putcategory"
                    onClick={(e) => {
                      e.preventDefault();
                      setPut(false);
                    }}
                  >
                    Modificar
                  </button>
                )}
              </div>
            )}

            <div>
              {put ? (
                ''
              ) : (
                <PutCategory
                  categorySelect={categorySelect}
                  setPut={setPut}
                  put={put}
                  dataCategories={dataCategories}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
