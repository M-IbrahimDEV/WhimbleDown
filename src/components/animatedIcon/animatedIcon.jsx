import { useEffect, useRef } from "react";

const AnimatedStepIcon = ({ iconId, text }) => {
    const containerRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "/animations.js"; // Path relative to the public folder
        script.async = true;
        document.body.appendChild(script);


        const waitForAnimations = () => {
            if (window.__Animations && window.__Animations[iconId]) {
                // Create the animation instance using the provided API.
                animRef.current = window.OnlineWebFonts_Com({
                    // Use a custom attribute: note we render a data attribute
                    'Id': `[data-online-webfonts-id="${iconId}"] .i`,
                    'Data': window.__Animations[iconId],
                });
                animRef.current.Play();
            } else {
                setTimeout(waitForAnimations, 100);
            }
        };
        waitForAnimations();

        return () => {
            document.body.removeChild(script);
        };
    }, [iconId]);

    // On mouse hover, restart the animation from the beginning.
    const handleMouseLeave = () => {
        if (animRef.current) {
            animRef.current.Stop();
            animRef.current.Play();
        }
    };

    return (
        <>
            <div className="step" 
                    onMouseLeave={handleMouseLeave}>
                <div
                    className="animated-icon"
                    data-online-webfonts-id={iconId}
                    ref={containerRef}
                >
                    <div className="i"></div>
                </div>
                <p>{text}</p>
            </div>
        </>
    );
};

export default AnimatedStepIcon;
