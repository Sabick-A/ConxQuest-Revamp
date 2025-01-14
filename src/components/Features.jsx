import React from "react";
import './Features.css'
function Features() {
    return (
        <div className="w-full min-h-screen bg-green-950 flex items-center justify-center">
            <div class="container mx-auto my-40">
                <a class="card" href="#">
                    <img
                        alt="Owl"
                        height="40"
                        src="https://assets.codepen.io/221808/owl.svg"
                        width="40"
                    />
                    <h2>Owl</h2>
                    <p>
                        A nocturnal bird that flies silently. Known for its
                        large eyes, sharp claws, and as a symbol of wisdom.
                    </p>
                </a>
                <a class="card" href="#">
                    <img
                        alt="Rabbit"
                        height="40"
                        src="https://assets.codepen.io/221808/rabbit.svg"
                        width="40"
                    />
                    <h2>Rabbit</h2>
                    <p>
                        A herbivorous animal with long ears and a hopping
                        motion. Loved for its cute appearance.
                    </p>
                </a>
                <a class="card" href="#">
                    <img
                        alt="Rabbit"
                        height="40"
                        src="https://assets.codepen.io/221808/raven.svg"
                        width="40"
                    />
                    <h2>Raven</h2>
                    <p>
                        A smart bird with black feathers. Often depicted in
                        myths and stories as a symbol of mystery.
                    </p>
                </a>
            </div>
        </div>
    );
}

export default Features;
