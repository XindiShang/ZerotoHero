import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { resList } from "../utils/mockData";

const Body = () => {
  const [restaurants, setRestaurants] = useState(resList);

  const onFilterClick = () => {
    const filteredRestaurants = restaurants.filter((res) => {
      return res.rating >= 4.5;
    });

    setRestaurants(filteredRestaurants);
  }

  const onResetClick = () => {
    setRestaurants(resList);
  }

  return (
    <div className="body">
      {/* <div className="search-container">
        <input type="text" placeholder="Search for restaurants" />
      </div> */}

      <div className="filter">
        <button
          className="filter-btn"
          onClick={onFilterClick}
        >
          Top Rated Restaurants
        </button>
        <button
          className="filter-btn"
          onClick={onResetClick}
        >
          All Restaurants
        </button>
      </div>

      <div className="restaurant-container">
        {renderRestaurantList(restaurants)}
      </div>
    </div>
  );
}

const renderRestaurantList = (restaurants) => {
  return restaurants.map((res) => {
    return (
      <RestaurantCard
        key={res.id}
        data={res}
      />
    );
  });
}

export default Body;