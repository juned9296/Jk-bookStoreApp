import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./Cards";

function Freebook() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const url = "http://localhost:4001/book";
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const filteredData = data.filter((item) => item.category === "free");
          setBook(filteredData);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    };

    fetchData();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
          <p>
            "Discover the treasure trove of literary gems in our Free Books section! Dive into captivating tales without spending a dime. From timeless classics to contemporary masterpieces, embark on unforgettable journeys that won't cost you a penny. Start exploring today and unlock the magic of reading, completely free!"
          </p>
        </div>

        {book.length > 0 && (
          <Slider {...settings}>
            {book.map((item) => (
              <Cards item={item} key={item.id} />
            ))}
          </Slider>
        )}
      </div>
    </>
  );
}

export default Freebook;
