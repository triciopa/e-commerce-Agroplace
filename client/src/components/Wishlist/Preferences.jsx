import React, { useState, useEffect } from 'react';
import Newsletter from '../Newsletter/Newsletter';
import Wishlists from '../Wishlist/Wishlists';
import Favorites from '../Wishlist/Favorites';
import '../../scss/components/Wishlists/_Preferences.scss'


export default function Preferences() {
    const [render, setRender] = useState('favorites');      

    function handleClick(e) {
      e.preventDefault();
      setRender(e.target.id);
    };

  return (
    <div className="preferencesPanel"> 

    <div>Quiero recibir mails de:
        <Newsletter/>
    </div> 
    <div id="favorites" onClick={(e) => handleClick(e)}>Favoritos</div> 
    <div id="wishlists" onClick={(e) => handleClick(e)}>Lista de deseados</div> 
        { render === "favorites" ?(
                <Favorites />
            ) : null
        }
        { render === "wishlists" ?(
                <Wishlists />
            ) : null
        }
    </div>
  )
}
