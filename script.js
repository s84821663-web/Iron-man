// ===============================
// JARVIS SYSTEM
// ===============================

const jarvisBtn = document.getElementById("jarvisBtn");
const commandBtn = document.getElementById("commandBtn");
const status = document.getElementById("jarvisStatus");

let systemActive = false;


// ===============================
// ACTIVATE JARVIS
// ===============================

function activateJarvis() {

    if (!systemActive) {

        systemActive = true;

        status.textContent = "JARVIS ONLINE // SYSTEM READY";
        status.style.color = "#ff0000";

        commandBtn.textContent = "SYSTEM ONLINE";

        document.body.style.boxShadow =
            "inset 0 0 100px rgba(255, 0, 0, 0.08)";

        speak(
            "Welcome back, sir. All systems are operational."
        );

    } else {

        systemActive = false;

        status.textContent = "SYSTEM STANDBY";
        status.style.color = "#555";

        commandBtn.textContent = "START SYSTEM";

        document.body.style.boxShadow = "none";

        speak(
            "System going into standby mode."
        );
    }
}


// ===============================
// MAIN JARVIS BUTTON
// ===============================

if (jarvisBtn) {

    jarvisBtn.addEventListener("click", function () {

        const jarvisSection =
            document.getElementById("jarvis");

        if (jarvisSection) {

            jarvisSection.scrollIntoView({
                behavior: "smooth"
            });

        }

        setTimeout(function () {
            activateJarvis();
        }, 700);

    });

}


// ===============================
// START SYSTEM BUTTON
// ===============================

if (commandBtn) {

    commandBtn.addEventListener(
        "click",
        activateJarvis
    );

}


// ===============================
// JARVIS VOICE
// ===============================

function speak(text) {

    if (!("speechSynthesis" in window)) {
        return;
    }

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    speech.rate = 0.9;

    speech.pitch = 0.8;

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);
}


// ===============================
// ARMOR SELECTION
// ===============================

const suits =
    document.querySelectorAll(".suit-card");

suits.forEach(function (suit) {

    suit.addEventListener("click", function () {

        suits.forEach(function (item) {

            item.classList.remove("active");

        });

        suit.classList.add("active");

        const title =
            suit.querySelector("h3");

        if (title) {

            speak(
                title.textContent +
                " selected"
            );

        }

    });

});


// ===============================
// ARC REACTOR MOUSE EFFECT
// ===============================

const reactor =
    document.querySelector(".arc-reactor");

if (reactor) {

    document.addEventListener(
        "mousemove",
        function (event) {

            const x =
                (window.innerWidth / 2 -
                event.clientX) / 40;

            const y =
                (window.innerHeight / 2 -
                event.clientY) / 40;

            reactor.style.transform =
                `translate(
                    calc(-50% + ${x}px),
                    calc(-50% + ${y}px)
                )`;

        }
    );

}


// ===============================
// SCROLL EFFECT
// ===============================

const sections =
    document.querySelectorAll("section");

function checkScroll() {

    const scrollPosition =
        window.scrollY;

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >
                sectionTop - 500 &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            section.style.opacity = "1";

        }

    });

}

window.addEventListener(
    "scroll",
    checkScroll
);


// ===============================
// PAGE LOAD
// ===============================

window.addEventListener(
    "load",
    function () {

        console.log(
            "JARVIS SYSTEM INITIALIZED"
        );

        console.log(
            "All systems operational."
        );

    }
);
