document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio loaded!");

    // Smooth scrolling for navigation links
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
        });
    });

    // Hero section fade-in animation
    setTimeout(() => {
        document.querySelector(".hero-section").classList.add("opacity-100");
    }, 500);

    // Text animations for Hero Section
    const heroTitle = document.querySelector(".hero-title");
    const heroSubtitle = document.querySelector(".hero-subtitle");

    if (heroTitle) {
        heroTitle.style.opacity = "0";
        heroTitle.style.transform = "translateY(-20px)";
        setTimeout(() => {
            heroTitle.style.transition = "opacity 1.5s ease-out, transform 1.5s ease-out";
            heroTitle.style.opacity = "1";
            heroTitle.style.transform = "translateY(0)";
        }, 700);
    }

    if (heroSubtitle) {
        heroSubtitle.style.opacity = "0";
        heroSubtitle.style.transform = "translateY(20px)";
        setTimeout(() => {
            heroSubtitle.style.transition = "opacity 1.5s ease-out, transform 1.5s ease-out";
            heroSubtitle.style.opacity = "1";
            heroSubtitle.style.transform = "translateY(0)";
        }, 1200);
    }

    // Clients Section Progress Bar Animation
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
        let progressFill = document.createElement("div");
        progressFill.classList.add("progress-fill");
        progressBar.appendChild(progressFill);

        progressFill.style.animation = "progressMove 3s infinite alternate ease-in-out";
    }

    // Fix navbar positioning

    // Main section (white box) appears after scrolling
    const mainSection = document.querySelector("main");
    mainSection.style.opacity = "0"; // Hide initially
    mainSection.style.transition = "opacity 1s ease-out";

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 100) { // Adjust as needed
            mainSection.style.opacity = "1"; // Fade in when scrolling down
        }
    });

    // Ball Animation Setup
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none"; // Prevent blocking interactions

    const balls = [];
    const gravity = 0.4; // Slower falling speed
    const friction = 0.7; // More bounce retention
    let batchDropped = false; // Ensure only one batch falls

    class Ball {
        constructor(x, y, radius, velocity) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = "#FFFFFF"; // Set ball color to white
            this.velocity = velocity;
            this.bounceCount = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }

        update() {
            this.y += this.velocity.y;
            this.velocity.y += gravity; // Apply gravity

            // Bounce off the white box (main section)
            const mainBox = document.querySelector("main").getBoundingClientRect();
            if (
                this.bounceCount < 2 && // Allow exactly 2 bounces
                this.y + this.radius > mainBox.top &&
                this.x > mainBox.left &&
                this.x < mainBox.right
            ) {
                this.velocity.y *= -friction; // Bounce up slightly
                this.bounceCount++;

                // Split: Half go left, half go right with some variation
                this.velocity.x = Math.random() > 0.5 ? Math.random() * 3 + 2 : -Math.random() * 3 - 2;
            }

            // Move sideways after bouncing
            this.x += this.velocity.x;

            // Remove ball if it falls off screen after the second bounce
            if (this.bounceCount >= 2 && this.y - this.radius > canvas.height) {
                balls.splice(balls.indexOf(this), 1);
            }
        }
    }

    function dropBallBatch() {
        if (batchDropped) return; // Only allow one batch
        batchDropped = true;

        for (let i = 0; i < 20; i++) { // Spawn 20 balls
            const x = canvas.width / 2 + (Math.random() * 50 - 25); // Random slight variation
            const y = 50;
            const radius = Math.random() * 15 + 5; // Bigger variation in sizes
            const velocity = { x: 0, y: Math.random() * 1.5 + 1 }; // Slower initial fall
            balls.push(new Ball(x, y, radius, velocity));
        }
    }

    function animateBalls() {
        requestAnimationFrame(animateBalls);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        balls.forEach(ball => {
            ball.update();
            ball.draw();
        });
    }

    dropBallBatch();
    animateBalls();
});
document.addEventListener("DOMContentLoaded", function () {
    const text = `Hello I'm Wayne. I specialize in crafting seamless, interactive, and visually stunning user experiences, focusing on building responsive, efficient, and scalable frontend solutions that power web applications. I thrive on the challenge of optimizing performance, writing clean, maintainable code, and designing intuitive interfaces that enhance user engagement. For me, great frontend development goes beyond aesthetics—its about creating solutions that are accessible, scalable, and user-friendly. I take pride in building dynamic and efficient interfaces that not only deliver smooth interactions but also ensure long-term usability and performance.`;

    let i = 0;
    const speed = 15; // Speed of typing effect
    const targetElement = document.getElementById("typewriter-text");

    function typeWriter() {
        if (i < text.length) {
            targetElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
});


