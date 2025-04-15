import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

import Navbar from "../../components/navbar/navbar";
import Topbar from "../../components/topbar/topbar";
import Footer from '../../components/footer/footer';
import AnimatedStepIcon from "../../components/animatedIcon/animatedIcon";

const categories = [
    { title: "Regular Cookies", img: "/regular.png", nationalShipping: true },
    { title: "Brownies", img: "/brownie.png", nationalShipping: false },
    { title: "Jumbo Cookies", img: "/jumbo.png", nationalShipping: true },
    { title: "Banana Breads", img: "/bread.png", nationalShipping: false },
];


const Home = () => {

    const [showModal, setShowModal] = useState(false);

    const handleOrderClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };


    return (
        <>
            <Topbar />
            <Navbar />

            <div className='Home-container'>

                <section className='section-1'>
                    <h1>WimbleDown brings taste to your doorstep</h1>
                    <p>
                        Our food is made with love and care, and we bake it with love, from scratch &amp; fresh every day, just for you
                    </p>
                    <button className='global-button order-btn' onClick={handleOrderClick}>Order Now</button>




                </section>


                {showModal && (
                        <div
                            className="order-modal"
                            onClick={(e) => {
                                // Close only if the click target is the backdrop itself
                                if (e.target.classList.contains("order-modal")) {
                                    handleClose();
                                }
                            }}
                        >
                            <div className="modal-content">
                                <h2>Select an Order Type</h2>
                                <div className="options">
                                    <Link to="/menu" className="option">
                                        <img src="/map.png" alt="Nationwide Order" />
                                        <p>Nationwide Order</p>
                                    </Link>
                                    <Link to="/menu" className="option">
                                        <img src="/delivery.png" alt="Same Day Delivery" />
                                        <p>Local Delivery or Pickup</p>
                                    </Link>
                                </div>
                                <button className="close-btn" onClick={handleClose}>×</button>
                            </div>
                        </div>
                    )}


                <section className='section-2'>
                    <h1>Categories</h1>

                    <div className="gallery">
                        {categories.map((cat, i) => {
                            const cardContent = (
                                <>
                                    {cat.nationalShipping && (
                                        <div className="national-available">
                                            <img src="/map.png" alt="Nationally Available" />
                                        </div>
                                    )}
                                    <img src={cat.img} alt={cat.title} />
                                    <div className="overlay">
                                        <h3>{cat.title}</h3>
                                    </div>
                                </>
                            );

                            return cat.nationalShipping ? (
                                <div key={i} className="card" onClick={handleOrderClick}>
                                    {cardContent}
                                </div>
                            ) : (
                                <Link to="/menu" key={i} className="card">
                                    {cardContent}
                                </Link>
                            );
                        })}
                    </div>


                </section>

                <section className="section-3">
                    <h2>How It Works</h2>
                    <div className="steps">
                        <AnimatedStepIcon iconId="483488" text="1. Choose Your Box" />
                        <AnimatedStepIcon iconId="551358" text="2. Place Your Order" />
                        <AnimatedStepIcon iconId="480236" text="3. We Bake With Love" />
                        <AnimatedStepIcon iconId="262991" text="4. Delivered to Your Door" />
                    </div>
                    <div className="note">
                        <p><strong>Local orders:</strong> Pickup or delivery every <strong>Monday</strong>.</p>
                        <p><strong>Nationwide orders:</strong> Shipped every <strong>Friday</strong>.</p>
                    </div>
                </section>

            </div >

            <Footer />
        </>
    );
}


export default Home;