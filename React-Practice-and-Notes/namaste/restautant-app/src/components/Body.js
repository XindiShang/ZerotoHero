import React from "react";
import RestaurantCard from "./RestaurantCard";
import { resList } from "../utils/mockData";

const Body = () => {
  const onFilterClick = () => {
    console.log("Filter button clicked!");
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
      </div>

      <div className="restaurant-container">
        {renderRestaurantList()}
      </div>
    </div>
  );
}

const renderRestaurantList = () => { 
  return resList.map((res) => {
    return (
      <RestaurantCard 
        key={res.id}
        data={res}
      />
    );
  });
}

export default Body;