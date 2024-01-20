import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { resList } from "../utils/mockData";

const Body = () => {
  const [restaurants, setRestaurants] = useState(resList);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6105073&lng=77.1145653&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
    
    const json = await data.json();
    console.log(json);

    const restaurants = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

    console.log(restaurants);
    
    setRestaurants(restaurants);
  }

  const onFilterClick = () => {
    const filteredRestaurants = restaurants.filter((res) => {
      return res.info.rating >= 4.5;
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
        key={res.info.id}
        data={res.info}
      />
    );
  });
}

export default Body;