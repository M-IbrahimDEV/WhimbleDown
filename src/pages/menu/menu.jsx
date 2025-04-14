import React, { useRef } from 'react';
import './menu.scss';

import Navbar from "../../components/navbar/navbar";
import Footer from '../../components/footer/footer';
import Topbar from "../../components/topbar/topbar";
import Item from "../../components/itemTile/itemTile"

import { animateCookieToCart } from "../../utils/animatecookie"




const menuItems = [
    {
        id: 1,
        name: 'Brookie',
        price: '300.0 Pkr',
        image: './Brookie.jpg',
    },
    {
        id: 2,
        name: 'Classic Chocolate Chip',
        price: '310.0 Pkr',
        image: './classic-choc-chip.jpg',
    },
    {
        id: 3,
        name: 'Double Chocolate Chip',
        price: '320.0 Pkr',
        image: './double-choc-chip.jpg',
    },
    {
        id: 4,
        name: 'Hazelnut Chocolate Chip',
        price: '330.0 Pkr',
        image: './Hazelnut-chocolate-chip.jpg',
    },
    {
        id: 5,
        name: 'Lindt Dark Chocolate Chip',
        price: '340.0 Pkr',
        image: './Lindt-Dark-Chocolate-Chip.jpg',
    },
    {
        id: 6,
        name: 'Lindt Milk',
        price: '350.0 Pkr',
        image: './Lindt-Milk.jpg',
    },
    {
        id: 7,
        name: 'Pistachio',
        price: '360.0 Pkr',
        image: './Pistachio.jpg',
    },
    {
        id: 8,
        name: 'Red Velvet Cheesecake',
        price: '370.0 Pkr',
        image: './Red-velvet-cheesecake.jpg',
    },
    {
        id: 9,
        name: 'Walnut Chocolate Chip',
        price: '380.0 Pkr',
        image: './Walnut-Chocolate-chip.jpg',
    },
];




const Menu = () => {
    const cartIconRef = useRef(null);

    const handleAddToCart = (event) => {
        const startX = event.clientX;
        const startY = event.clientY;
        if (cartIconRef && cartIconRef.current) {
            animateCookieToCart(startX, startY, cartIconRef.current);
        }
    };


    return (
        <>
            <Topbar />
            <Navbar cartIconRef={cartIconRef} />

            <div className="menu">

                <div className="menu-grid">
                    {menuItems.map(item => (
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
            <Footer />
        </>
    );
}


export default Menu;