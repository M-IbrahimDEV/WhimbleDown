// ItemDetails.jsx
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import './itemDetail.scss';

import Navbar from '../../components/navbar/navbar';
import Item from "../../components/itemTile/itemTile"
import Topbar from "../../components/topbar/topbar";
import QuantityCounter from '../../components/quantityCounter/quantityCounter';
import Footer from '../../components/footer/footer';


import { animateCookieToCart } from "../../utils/animatecookie"

const ItemDetails = () => {
    const { id } = useParams();

    // Dummy data (in real app, you might fetch details by ID)
    const item = {
        id,
        name: 'Brookie',
        price: 300.0,
        description:
            'This delicious brookie is a perfect fusion of brownie and cookie, baked to perfection.',
        image: '/Brookie.jpg',
    };

    // Dummy related items
    const relatedItems = [
        {
            id: 2,
            name: 'Classic Chocolate Chip',
            price: '310.0 Pkr',
            image: '/classic-choc-chip.jpg',
        },
        {
            id: 3,
            name: 'Double Chocolate Chip',
            price: '320.0 Pkr',
            image: '/double-choc-chip.jpg',
        },
        {
            id: 4,
            name: 'Hazelnut Chocolate Chip',
            price: '330.0 Pkr',
            image: '/Hazelnut-chocolate-chip.jpg',
        },
        {
            id: 5,
            name: 'Lindt Dark Chocolate Chip',
            price: '340.0 Pkr',
            image: '/Lindt-Dark-Chocolate-Chip.jpg',
        },
    ];


    const cartIconRef = useRef(null);

    const handleAddToCart = (event) => {
        const startX = event.clientX;
        const startY = event.clientY;
        if (cartIconRef && cartIconRef.current) {
            animateCookieToCart(startX, startY, cartIconRef.current);
        }
    };

    const [quantity, setQuantity] = useState(0)
    const handleAddQty = () => {
        setQuantity(quantity + 1);
    }
    const handleRemoveQty = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <>
            <Topbar />
            <Navbar cartIconRef={cartIconRef} />

            <div className="item-details">
                <div className="details-header">
                    <div className="details-image">
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className="details-info">
                        <h1>{item.name}</h1>
                        <p className="price">{item.price.toFixed(2)} Pkr</p>
                        <p className="description">{item.description}</p>
                        <QuantityCounter
                            quantity={quantity}
                            onIncrement={handleAddQty}
                            onDecrement={handleRemoveQty}
                            onRemove={() => setQuantity(0)} // or whatever logic
                            showDelete={true}
                        />
                        <button className="btn-add global-button" onClick={handleAddToCart}>Add to Cart</button>

                        <p className='description'>Vanilla cookie with white chocolate and pistachios, filled with pistachio cream.</p>
                        <p className='description'>Handmade product.</p>
                        <p className='description'><b>General ingredients: </b>wheat flour, pistachios, chocolate, sugar, butter, eggs, raising powders, vanilla and salt.</p>
                        <p className='description'><b>Allergy warning:</b> our cookies may contain soy, eggs, tree nuts, peanuts or dairy products.</p>
                        <p className='description'>We do our best to avoid cross contamination but we do not guarantee it.</p>
                        <p className='description'><b>Weight:</b> 7 oz (approx)</p>
                    </div>
                </div>

                <div className="related-items">
                    <h2 className='heading'>You May Also Like</h2>
                    <div className="related-items-grid">
                        <div className="related-grid">
                            {relatedItems.map((item) => (

                                <Item
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                    handleAddToCart={handleAddToCart}
                                />

                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ItemDetails;
