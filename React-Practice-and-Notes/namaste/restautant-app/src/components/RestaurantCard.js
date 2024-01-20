import React from 'react';
import {CLOUDINARY_IMAGE_URL} from '../utils/constant';

// TODO: re-design this component in later lessons
const RestaurantCard = (props) => { 
  const { data } = props;

  return (
    <div className="restaurant-card">
      <div className="restaurant-image">
        <img src={CLOUDINARY_IMAGE_URL + data.cloudinaryImageId} alt="restaurant" />
      </div>
      <div className="restaurant-info">
        <div className="restaurant-name">
          <h2>{data.name}</h2>
        </div>
        <div className="restaurant-location">
          <h4>{data.cuisines.join(', ')}</h4>
        </div>
        <div className="restaurant-rating">
          <h4>{data.avgRating} Stars</h4>
        </div>
        <div className="restaurant-cost">
          <h4>{data.costForTwo}</h4>
        </div>
        <div className="restaurant-delivery">
          <h4>{data.sla.slaString}</h4>
        </div>

      </div>
    </div>
  );
}

export default RestaurantCard;