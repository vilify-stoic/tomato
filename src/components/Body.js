import RestaurantCard from "./RestuarantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
	// Local state Variable
	const [listOfRestaurants, setListOfRestaurants] = useState([]);

	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		fetchData();
	});

	const fetchData = async () => {
		const data = await fetch(
			"https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5679146&lng=73.91434319999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
		);

		const json = await data.json();
		setListOfRestaurants(
			json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
		);
	};

	return listOfRestaurants === 0 ? (
		<Shimmer />
	) : (
		<div className="body">
			<div className="search">
				<input
					placeholder="Serach food"
					type="text"
					className="search-box"
					value={searchText}
					onChange={(e) => {
						setSearchText(e.target.value);
					}}
				/>
				<button
					className="search-btn"
					onClick={() => {
						const filteredRestaurant = listOfRestaurants.filter((res) =>
							res.info.name.toLowerCase().includes(searchText.toLowerCase())
						);

						setListOfRestaurants(filteredRestaurant);
					}}>
					Serach
				</button>
			</div>
			<div className="filter">
				<button
					className="filter-btn"
					onClick={() => {
						const filteredList = listOfRestaurants.filter(
							(res) => res.info.avgRating > 4
						);
						setListOfRestaurants(filteredList);
					}}>
					Top Rated Restuarant
				</button>
			</div>
			<div className="res-conatiner">
				{listOfRestaurants.map((restaurant) => (
					<RestaurantCard key={restaurant.info.id} resData={restaurant} />
				))}
			</div>
		</div>
	);
};

export default Body;
