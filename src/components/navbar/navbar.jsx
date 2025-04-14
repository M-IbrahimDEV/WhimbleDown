import React, { useState } from 'react';
import './navbar.scss';

import Link from "../links/links";
import SearchBar from '../search/search';
import CartSidebar from '../cart/cart';


const Navbar = ({ cartIconRef }) => {

    const [isCartOpen, setCartOpen] = useState(false);


    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarOpenanime, setIsSidebarOpenanime] = useState(false);
    const [icon, setIcon] = useState('menu');
    const [showSearch, setShowSearch] = useState(false);
    const [animateOut, setAnimateOut] = useState(false);

    //sidebar
    const toggleSidebar = () => {
        setIsSidebarOpenanime((prev) => !prev);
        setTimeout(() => {
            setIsSidebarOpen((prev) => !prev);
        }, 300);
    };

    const closeSidebar = () => {
        setIsSidebarOpenanime(false);
        setTimeout(() => {
            setIsSidebarOpen(false);
        }, 300);
    };



    //for menu button
    const toggleIcon = () => {
        setIcon(icon === 'menu' ? 'close' : 'menu');
    };

    //search showhide

    const handleSearchClick = () => {
        setShowSearch(true);
        setAnimateOut(false);
    };

    const handleSearchClose = () => {
        setAnimateOut(true);
        setTimeout(() => {
            setShowSearch(false);
        }, 300);
    };

    return (
        <>
            <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />

            <nav className="navbar" >

                <div className="nav-left">
                    <span className="hamburger" onClick={toggleSidebar} >
                        <span
                            className={`material-symbols-outlined`}
                            onClick={toggleIcon}
                        >
                            {icon}
                        </span>

                    </span>
                    <div className="logo">WHIMBLEDOWN</div>
                    <Link />
                </div>
                <div className="nav-right">
                    <span className="material-symbols-outlined" onClick={handleSearchClick}>search</span>
                    <span className="material-symbols-outlined person">person</span>
                    <span className="material-symbols-outlined shopping" ref={cartIconRef} onClick={() => setCartOpen(true)}>shopping_cart</span>
                </div>
                
                {showSearch && (
                    <SearchBar onClose={handleSearchClose} animateOut={animateOut} />
                )}

            </nav>


            {isSidebarOpen && (
                <>
                    <div className={`sidebar-overlay ${isSidebarOpenanime ? 'in' : 'out'}`} onClick={closeSidebar}></div>

                    <div className={`sidebar ${isSidebarOpenanime ? 'open' : 'close'}`}>
                        <Link />

                        <div className="side-bottom">
                            <div className='side-bottom-item shopping' onClick={() => setCartOpen(true)}>
                                <span className="material-symbols-outlined">shopping_cart</span>
                                <p>Cart</p>
                            </div>
                            <div className='side-bottom-item person'>
                                <span className="material-symbols-outlined">person</span>
                                <p>Account</p>
                            </div>
                        </div>

                    </div>
                </>
            )}


        </>
    );
};

export default Navbar;
