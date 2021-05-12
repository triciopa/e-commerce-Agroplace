import React, { useState } from 'react';
import AllOrders from '../AllOrders/AllOrders';
import PromotionsQuery from '../PromotionsForm/PromotionsQuery';
import ManageAccount from '../Admin/ManageAccount';
import ProductForm from '../product_form/product_form';
import '../../scss/components/Admin/_AdminPanel.scss'
import { RiPlantLine, RiUserSettingsLine } from 'react-icons/ri'
import { AiOutlineTags } from 'react-icons/ai'
import { GrDocumentVerified } from 'react-icons/gr'


export default function AdminPanel() {
    const [render, setRender] = useState('buttons');     
    const [buttons, setButtons] = useState('buttons');     
    
    function handleClick(e, word) {
      e.preventDefault();
      setRender(word);
    };

  return (
    <div className="adminPanel">  
        { render === "buttons" ?(
            <div id="buttons">
                
                <button id="products" onClick={(e) => handleClick(e, 'products')}><RiPlantLine/> <p>Products </p></button>
                <button id="orders" onClick={(e) => handleClick(e, 'orders')}> <GrDocumentVerified/>  <p>Orders</p></button>
                <button id="promotions" onClick={(e) => handleClick(e, 'promotions')}> <AiOutlineTags/> <p>Promotions</p></button>
                <button id="users" onClick={(e) => handleClick(e, 'users')}> <RiUserSettingsLine/> <p>Users</p></button>
                
            </div>) : null
        }
        { render === "products" ?(
        <div>
            <div
                className="backButton"
                onClick={(e) => {setRender('buttons')                   
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
                onClick={(e) => {setRender('buttons')                 
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
                onClick={(e) => {setRender('buttons')                   
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
                onClick={(e) => {setRender('buttons')                  
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
