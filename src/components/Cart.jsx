import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { cartItems, subTotal, shipping, tax, total } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  const deletehandler = (id) => {
    dispatch({ type: "removeFromCart", payload: id });
    dispatch({ type: "calculatePrice" });
  };

  const increment = (id) => {
    dispatch({ type: "addToCart", payload: { id } });
    dispatch({ type: "calculatePrice" });
  };

  const decrement = (id) => {
    dispatch({ type: "decrement", payload: id });
    dispatch({ type: "calculatePrice" });

    // if (id.quantity == 0) {
    //   dispatch({ type: "removeFromCart", payload: id });
    //   dispatch({ type: "calculatePrice" });
    // }
  };

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i) => (
            <CartItem
              id={i.id}
              key={i.id}
              imgSrc={i.imgSrc}
              name={i.name}
              price={i.price}
              qty={i.quantity}
              deletehandler={deletehandler}
              increment={increment}
              decrement={decrement}
            />
          ))
        ) : (
          <img
            className="emptyCartImg"
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png"
          />
        )}
      </main>
      <aside>
        <h5>SubTotal: {subTotal}</h5>
        <h5>Shipping: {shipping}</h5>
        <h5>Tax: {tax}</h5>
        <h3>Total: {total}</h3>
      </aside>
    </div>
  );
};

const CartItem = ({
  imgSrc,
  name,
  price,
  qty,
  decrement,
  increment,
  deletehandler,
  id,
}) => {
  return (
    <div className="CartItem mt-3">
      <img src={imgSrc} alt={name} />
      <article>
        <h3>{name}</h3>
        <h3>${price}</h3>
      </article>
      <div>
        <button onClick={() => increment(id)}>+</button>
        <p>{qty}</p>
        <button onClick={() => decrement(id)}>-</button>
      </div>
      <MdDeleteForever onClick={() => deletehandler(id)} />
    </div>
  );
};

export default Cart;
