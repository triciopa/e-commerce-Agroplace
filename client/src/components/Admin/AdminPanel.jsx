import React, { useState, useEffect } from 'react';
import AllOrders from '../AllOrders/AllOrders';
import PromotionsQuery from '../PromotionsForm/PromotionsQuery';
import ManageAccount from '../Admin/ManageAccount';
import ProductForm from '../product_form/product_form';
import '../../scss/components/Admin/_AdminPanel.scss'


export default function AdminPanel() {
    const [render, setRender] = useState('buttons');      

    function handleClick(e) {
      e.preventDefault();
      setRender(e.target.id);
    };
    function handleBackClick(e) {
      e.preventDefault();
      setRender('buttons');
    };

  return (
    <div className="adminPanel">  
        { render === "buttons" ?(
            <div id="buttons">
                
                <button id="products" onClick={(e) => handleClick(e)}>Products</button>
                <button id="orders" onClick={(e) => handleClick(e)}>Orders</button>
                <button id="promotions" onClick={(e) => handleClick(e)}>Promotions</button>
                <button id="users" onClick={(e) => handleClick(e)}>Users</button>
                
            </div>) : null
        }
        { render === "products" ?(
        <div>
            <div
                className="backButton"
                onClick={(e) => {handleBackClick(e)                   
                }}
            >
                {'<'}
            </div>   
            <ProductForm />
        </div>) : null
        }
        { render === "orders" ?(
        <div >
            <div
                className="backButton"
                onClick={(e) => {handleBackClick(e)                   
                }}
            >
                {'<'}
            </div>
            <AllOrders />
        </div>) : null
        }
        { render === "promotions" ?(
        <div>
            <div
                className="backButton"
                onClick={(e) => {handleBackClick(e)                   
                }}
            >
                {'<'}
            </div>
            <PromotionsQuery />
        </div>) : null
        }
        { render === "users" ?(
        <div id="users">
            <div
                className="backButton"
                onClick={(e) => {handleBackClick(e)                   
                }}
            >
                {'<'}
            </div>
            <ManageAccount />
        </div>) : null
        }
    </div>
  )
}
