import React, { useState, useEffect, useRef } from "react";
import { ShoppingCart, Trash, Plus, Minus } from "phosphor-react";

import "./style.css";

export default function App() {
  const nameToCartRef = useRef();
  const priceToCartRef = useRef();

  const [isNew, setIsNew] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [prod, setProd] = useState([]);

  useEffect(() => {
    totalSum();
  }, [prod]);

  const totalSum = () => {
    let totalVal = 0;
    for (let i = 0; i < prod.length; i++) {
      let no = Number(prod[i].price);
      totalVal += no;
    }
    setTotalPrice(totalVal);
  };

  const removeFromCart = (item) => {
    let hardCopy = [...prod];
    hardCopy = hardCopy.filter((prev) => prev.name !== item.name);
    setProd(hardCopy);
  };

  const addToCart = (e) => {
    const name = nameToCartRef.current.value;
    const price = priceToCartRef.current.value;

    if (name === "") return;

    setProd((prev) => {
      return [...prev, { name: name, price: price }];
    });
  };

  const Item = () => {
    return (
      <>
        {prod.map((item, index) => (
          <div key={index} className="item">
            <Trash className="trash" onClick={() => removeFromCart(item)} />{" "}
            {item.name} <span>£{item.price !== "" ? item.price : 0}</span>
          </div>
        ))}
      </>
    );
  };

  const NewProd = () => {
    return (
      <div className="item" style={{ display: isNew ? "block" : "none" }}>
        <input ref={nameToCartRef} type="text" placeholder="new product" />
        <input
          ref={priceToCartRef}
          type="number"
          placeholder="new price"
          max="99"
        />
        <input onClick={addToCart} type="submit" value="ADD NEW" />
      </div>
    );
  };

  const Total = () => {
    return (
      <div className="item total">
        TOTAL<span>£{totalPrice}</span>
      </div>
    );
  };

  return (
    <div className="todo">
      <div className="container">
        <h2>
          <div className="cartCount">{prod.length}</div>
          <ShoppingCart className="shoppingCart" /> Shopping List
        </h2>
        <span className="plus" onClick={() => setIsNew((prev) => !prev)}>
          {isNew ? <Minus /> : <Plus />}
        </span>
        <NewProd />
        <Item />
        <Total />
        <div className="list"></div>
      </div>
    </div>
  );
}
