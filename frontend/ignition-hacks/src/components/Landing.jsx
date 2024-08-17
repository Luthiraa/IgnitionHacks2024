import React, { useEffect } from 'react';
import Button from './Button';
import backgroundImage from '../assets/bg.gif';
import './Landing.css';


const Landing = () => {

    useEffect(() => {
        const text = "NINJA BRAIN";
        const container = document.getElementById("animatedText");

        // Clear any existing content in the container
        container.innerHTML = "";

        // Create spans for each letter
        text.split("").forEach(char => {
            const span = document.createElement("span");
            span.className = "letter";
            span.innerHTML = char === " " ? "&nbsp;" : char;
            container.appendChild(span);
        });

        const letters = document.querySelectorAll(".letter");
        const totalLetters = letters.length;
        const delayIncrement = 100; 

        function easeInOutQuart(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        }

        function animateLetters() {
            letters.forEach((letter, index) => {
                const delay = index * delayIncrement;
                setTimeout(() => {
                    letter.style.opacity = 1;
                    letter.style.transform = "translateY(0)";
                }, delay);
            });
        }

        function resetLetters() {
            letters.forEach(letter => {
                letter.style.opacity = 0;
                letter.style.transform = "translateY(20px)";
            });
        }

        function loopAnimation() {
            resetLetters();
            setTimeout(animateLetters, 500); // Add a small delay before restarting the animation
        }

        animateLetters();
        const intervalId = setInterval(loopAnimation, (totalLetters - 1) * delayIncrement + 2000); // Adjust the interval time as needed

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);
    
    useEffect(() => {
        const text = "NINJA BRAIN";
        const container = document.getElementById("animatedText");

        // Clear any existing content in the container
        container.innerHTML = "";

        // Create spans for each letter
        text.split("").forEach(char => {
            const span = document.createElement("span");
            span.className = "letter";
            span.innerHTML = char === " " ? "&nbsp;" : char;
            container.appendChild(span);
        });

        const letters = document.querySelectorAll(".letter");
        const totalLetters = letters.length;
        const delayIncrement = 100; 

        function easeInOutQuart(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        }

        function animateLetters() {
            letters.forEach((letter, index) => {
                const normalizedIndex = Math.max(index, totalLetters - 1 - index) / (totalLetters - 1);
                const easedDelay = easeInOutQuart(normalizedIndex);
                const delay = easedDelay * (totalLetters - 1) * delayIncrement;

                setTimeout(() => {
                    letter.style.setProperty("--wght", 700);
                    letter.style.setProperty("--wdth", 400);
                    letter.style.setProperty("--opacity", 1);
                    letter.style.setProperty("--letter-spacing", '0.05em');
                }, delay);
            });
        }

        function resetLetters() {
            letters.forEach(letter => {
                letter.style.setProperty("--wght", 100);
                letter.style.setProperty("--wdth", 85);
                letter.style.setProperty("--opacity", 0.25);
                letter.style.setProperty("--letter-spacing", '0');
            });
        }

        function loopAnimation() {
            resetLetters();
            setTimeout(animateLetters, 500); // Add a small delay before restarting the animation
        }

        animateLetters();
        const intervalId = setInterval(loopAnimation, (totalLetters - 1) * delayIncrement + 2000); // Adjust the interval time as needed

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []); 

    return (
        <div className="landing-page">
        <div className='desc'>TRANSFORM YOUR NOTES INTO QUESTIONS INSTANTLY</div>
        <div id="animatedText" className="animated-text"></div>
        <Button targetPage="/signup">Sign Up</Button>
    </div>
    );
}

export default Landing;