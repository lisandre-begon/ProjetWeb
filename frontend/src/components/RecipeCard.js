import React, { useState } from 'react';
import '../style/Recipe.scss';

function RecipeCard({ recipe }) {
  const [isActive, setIsActive] = useState(true);

  function open_close() {
    setIsActive(!isActive);
  }

  return (
    <div className="cont_principal">
      <div className="cont_central">
        <div className={`cont_modal ${isActive ? 'cont_modal_active' : ''}`}>
          <div className="cont_photo">
            <div className="cont_img_back">
              <img src={recipe.imageUrl} alt={recipe.name} />
            </div>
            <div className="cont_details">
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
            </div>
            <div className="cont_btn_open_dets">
              <a href="#e" onClick={open_close}><i className="material-icons">&#xE314;</i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;