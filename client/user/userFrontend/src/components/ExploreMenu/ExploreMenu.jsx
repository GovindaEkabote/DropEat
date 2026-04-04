import React, { useRef } from "react";
import { categories } from "../../assets/assets";
import './ExploreMenu.css'

const ExploreMenu = () => {
    const listRef = useRef();

  const scroll = (direction) => {
    listRef.current.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="explore-menu position-relative">
      <h1 className="d-flex align-items-center justify-content-between">
        Explore Our Menu
        <div className="d-flex">
          <i
            className="bi bi-arrow-left-circle scroll-icon"
            onClick={() => scroll("left")}
          ></i>
          <i
            className="bi bi-arrow-right-circle scroll-icon"
            onClick={() => scroll("right")}
          ></i>
        </div>
      </h1>
      <p>Explore curated Lists of dishes from top categories</p>
      <div 
      ref={listRef}
      className="d-flex justify-content-between gap-4 overflow-auto explore-menu-list">
        {categories.map((item, index) => {
          return (
            <div key={index} className="text-center explore-menu-list-item">
              <img src={item.image} className="rounded-circle" height={150} width={150}/>
              <p className="mt-2 fw-bold">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;
