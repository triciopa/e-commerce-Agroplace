import React, { useState, useEffect } from 'react';
import Newsletter from '../Newsletter/Newsletter';
import Wishlists from '../Wishlist/Wishlists';
import Favorites from '../Wishlist/Favorites';
import '../../scss/components/Wishlists/_Preferences.scss';

export default function Preferences() {
  const [render, setRender] = useState('favorites');

  function handleClick(e) {
    e.preventDefault();
    setRender(e.target.id);
  }

  return (
    <div className="preferencePanel">
      <Newsletter />
      <div className="preferenceTabs">
        <div
          id="favorites"
          onClick={(e) => handleClick(e)}
          style={
            render === 'favorites'
              ? {
                  backgroundColor: 'var(--color-brand)',
                  opacity: '50%',
                  color: 'var(--color-light)',
                  fontWeight: '700',
                }
              : { backgroundColor: '' }
          }
        >
          Favoritos
        </div>
        <div
          id="wishlists"
          onClick={(e) => handleClick(e)}
          style={
            render === 'wishlists'
              ? {
                  backgroundColor: 'var(--color-brand)',
                  opacity: '50%',
                  color: 'var(--color-light)',
                  fontWeight: '700',
                }
              : {}
          }
        >
          Lista de deseados
        </div>
      </div>
      {render === 'favorites' ? <Favorites /> : null}
      {render === 'wishlists' ? <Wishlists /> : null}
    </div>
  );
}
