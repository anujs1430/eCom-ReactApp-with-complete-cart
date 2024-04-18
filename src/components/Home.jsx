import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Loader from "./Loader";

const Home = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  const ApiData = "https://fakestoreapi.com/products";

  useEffect(() => {
    axios
      .get(ApiData)
      .then((res) => {
        setData(res.data);
        setLoader(false);
      })

      .catch((err) => {
        console.log("Error : ", err);
      });
  }, []);

  const dispatch = useDispatch();

  const addToCart = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculatePrice" });
    toast.success("Added To Cart");
  };

  return (
    <div className="home">
      {loader ? (
        <Loader />
      ) : (
        data.map((i) => (
          <ProductCard
            key={i.id}
            name={i.title}
            price={i.price}
            imgSrc={i.image}
            handler={addToCart}
            id={i.id}
          />
        ))
      )}
    </div>
  );
};

const ProductCard = ({ name, id, price, handler, imgSrc }) => {
  return (
    <div className="productCard">
      <img src={imgSrc} alt={name} />
      <h4>{name}</h4>
      <h4>{price}/-</h4>
      <button onClick={() => handler({ name, price, quantity: 1, id, imgSrc })}>
        Add to Cart
      </button>
    </div>
  );
};

export default Home;
