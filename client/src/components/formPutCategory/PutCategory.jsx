import React, { useState } from 'react';
import axios from 'axios';
import '../../scss/components/formPutCategory/_PutCategory.scss';

function PutCategory({ categorySelect, setPut, put, dataCategories }) {
  const [input, setInput] = useState('');

  const handleChange = async () => {
    setPut(!put);
    await axios.post('http://localhost:3001/putCategory', {
      name: categorySelect,
      newName: input,
    });
    alert('Categoria Modificada');
    dataCategories();
  };

  return (
    <div>
      {categorySelect === '-Seleccione una Categoria-' ? (
        ''
      ) : (
        <div>
          <form>
            <input
              className="input-category"
              placeholder="Nuevo nombre..."
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="button-putcategory"
              type="submit"
              value="Enviar"
              onClick={handleChange}
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PutCategory;
