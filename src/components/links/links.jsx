
import React from 'react';
import { Link } from 'react-router-dom';
import './links.scss'; // import the SCSS

const Links = ({ onClose, animateOut }) => {
    return (
        <div className="links">
        <Link to="/" className="link">Home</Link>
        <Link to="/menu" className="link">local Menu</Link>
        <Link to="/dashboard" className="link">NationWide Menu</Link>
        <Link to="/item/1" className="link">Contact</Link>
        </div>
    );
};

export default Links;
