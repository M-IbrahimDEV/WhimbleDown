// src/utils/animateCookie.js
export const animateCookieToCart = (startX, startY, cartIconElement) => {
    if (window.innerWidth < 350) return; // Disable animation on small screens
  
    // Add scroll offsets to the starting position (client coordinates to document coordinates)
    const startXDocument = startX + window.scrollX;
    const startYDocument = startY + window.scrollY;
  
    // Get the destination position of the cart icon and add scroll offsets
    const cartRect = cartIconElement.getBoundingClientRect();
    const destX = cartRect.left + cartRect.width / 2 - 11 + window.scrollX; // 11 is half the cookie's width (22px/2)
    const destY = cartRect.top + cartRect.height / 2 - 12.5 + window.scrollY; // 12.5 is half the cookie's height (25px/2)
  
    // Create the cookie element
    const cookie = document.createElement('img');
    cookie.src = '/cookie.png'; // Update this path as needed
    cookie.style.position = 'absolute';
    cookie.style.left = `${startXDocument - 11}px`; // position adjusted for center
    cookie.style.top = `${startYDocument - 12.5}px`;
    cookie.style.width = '22px';
    cookie.style.height = '25px';
    cookie.style.zIndex = 250;
    cookie.style.pointerEvents = 'none';
    document.body.appendChild(cookie);
  
    // Calculate the differences in coordinates
    const deltaX = destX - (startXDocument - 11);
    const deltaY = destY - (startYDocument - 12.5);
  
    // Define keyframes for a custom animation effect
    const keyframes = [
      { transform: 'translate(0px, 0px) scale(0)', opacity: 0 },
      { transform: 'translate(0px, 0px) scale(1)', opacity: 1, offset: 0.1 },
      { transform: `translate(${deltaX * 0.2}px, ${deltaY * 0.2}px) scale(1)`, opacity: 1, offset: 0.3 },
      { transform: `translate(${deltaX}px, ${deltaY}px) scale(1)`, opacity: 1, offset: 1 },
      { transform: `translate(${deltaX}px, ${deltaY}px) scale(0)`, opacity: 0, offset: 1 }
    ];
  
    const timing = {
      duration: 500, // Total duration of the animation
      easing: 'ease-out',
      fill: 'forwards'
    };
  
    // Start the animation and remove the cookie after finishing
    cookie.animate(keyframes, timing).onfinish = () => {
      cookie.remove();
    };
  };
  
  



