import React, { useState } from 'react';
import './cart.scss';

import Item from '../itemTile/itemTile'



const initialCartItems = [
    {
        id: 1,
        name: 'Brookie',
        price: 300.0, // Use a numeric value for price
        image: '/Brookie.jpg',
        quantity: 1,
    },
    {
        id: 2,
        name: 'Classic Chocolate Chip',
        price: 310.0,
        image: '/classic-choc-chip.jpg',
        quantity: 1,
    },
    {
        id: 3,
        name: 'Double Chocolate Chip',
        price: 320.0,
        image: '/double-choc-chip.jpg',
        quantity: 1,
    },
];


const CartSidebar = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState(initialCartItems);

    const handleIncrement = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrement = (id) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQty = item.quantity - 1;
                    return { ...item, quantity: newQty < 1 ? 1 : newQty };
                }
                return item;
            })
        );
    };


    const handleRemove = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );


    return (
        <>
            <div
                className={`cart-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
            ></div>

            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Your Cart</h2>
                    <button className="material-symbols-outlined close-btn" onClick={onClose}>close</button>
                </div>
                <div className="cart-items">

                    {cartItems.map(item => (
                        <Item
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            showQuantity={true}
                            quantity={item.quantity}
                            onIncrement={() => handleIncrement(item.id)}
                            onDecrement={() => handleDecrement(item.id)}
                            onRemove={() => handleRemove(item.id)}
                            horisontal={true}
                        />
                    ))}

                </div>
                <div className="cart-footer">
                    <button className="checkout-btn  global-button">
                        <span className="material-symbols-outlined">shopping_cart_checkout</span>
                        <p>Checkout ({total.toFixed(2)} Pkr)</p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartSidebar;
