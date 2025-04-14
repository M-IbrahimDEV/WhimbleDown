import React from 'react';
import './itemTile.scss';

import QuantityCounter from '../quantityCounter/quantityCounter';

const ItemTile = ({ id, name, price, image, handleAddToCart, showQuantity, quantity, onIncrement, onDecrement, onRemove, horisontal }) => {

    const item = {
        id: id,
        name: name,
        price: price,
        image: image,
    };


    return (
        <div key={item.id} className={`item ${horisontal ? 'horisontal' : ''}`}>
            <div className="item-image-cont">
                <img src={item.image} alt={item.name} className="item-image" />
            </div>
            <div className="item-content">
                <h2>{item.name}</h2>
                <p>{item.price} Pkr</p>
                {handleAddToCart ? (
                    <button className='add-cart  global-button' onClick={handleAddToCart}>
                        <span className="material-symbols-outlined shopping">
                            shopping_cart
                        </span>
                        Add to cart
                    </button>
                ) : showQuantity ? (
                    <>
                        <div className="subtotal">
                            Subtotal: {(price * quantity).toFixed(2)} Pkr
                        </div>
                        <QuantityCounter
                            quantity={quantity}
                            onIncrement={onIncrement}
                            onDecrement={onDecrement}
                            onRemove={onRemove}
                        />
                    </>
                ) : null}
            </div>
        </div>
    );
};


export default ItemTile;
