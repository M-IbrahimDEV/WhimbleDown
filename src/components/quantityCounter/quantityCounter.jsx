import React from 'react';
import './quantityCounter.scss';

const QuantityCounter = ({ quantity, onIncrement, onDecrement, onRemove, showDelete = true }) => {
    return (
        <div className="quantity-counter">
            <button className="btn-qty btn-dec global-button" onClick={onDecrement}>
                <span className="material-symbols-outlined">remove</span>
            </button>

            <span className="qty-value">{quantity}</span>

            <button className="btn-qty btn-inc global-button" onClick={onIncrement}>
                <span className="material-symbols-outlined">add</span>
            </button>

            {showDelete && (
                <button
                    className={`btn-remove global-button ${quantity === 0 ? 'disabled' : ''}`}
                    onClick={quantity === 0 ? undefined : onRemove}
                    disabled={quantity === 0}
                >
                    <span className="material-symbols-outlined delete-icon">delete</span>
                </button>
            )}
        </div>
    );
};

export default QuantityCounter;
