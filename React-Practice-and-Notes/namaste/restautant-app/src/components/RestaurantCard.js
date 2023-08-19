import React from 'react';

// TODO: re-design this component in later lessons
const RestaurantCard = (props) => { 
  const { data } = props;

  return (
    <div className="restaurant-card">
      <div className="restaurant-image">
        <img src={data.image} alt="restaurant" />
      </div>
      <div className="restaurant-info">
        <div className="restaurant-name">
          <h2>{data.name}</h2>
        </div>
        <div className="restaurant-location">
          <h4>{data.address}</h4>
        </div>
        <div className="restaurant-rating">
          <h4>{data.rating}</h4>
        </div>
        <div className="restaurant-delivery">
          <h4>{data.description}</h4>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;