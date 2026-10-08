```javascript
// ========================================
// JARVIS AI VOICE SYSTEM
// ========================================

const jarvisBtn = document.getElementById("jarvisBtn");
const commandBtn = document.getElementById("commandBtn");
const status = document.getElementById("jarvisStatus");

let jarvisOnline = false;
let isListening = false;


// ========================================
// SPEECH RECOGNITION
// ========================================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition = null;

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    // زبان فارسی
    recognition.lang = "fa-IR";

    // فقط یک جمله را دریافت کن
    recognition.continuous = false;

    // نتیجه نهایی
    recognition.interimResults = false;

} else {

    console.log(
        "Speech Recognition is not supported."
    );

}


// ========================================
// JARVIS SPEAK
// ========================================

function jarvisSpeak(text) {

    if (!window.speechSynthesis) {

        console.log(
            "Speech Synthesis is not supported."
        );

        return;
    }

    // توقف صدای قبلی
    speechSynthesis.cancel();

    const voice =
        new SpeechSynthesisUtterance(text);

    // زبان فارسی
    voice.lang = "fa-IR";

    // سرعت صحبت
    voice.rate = 0.9;

    // زیر و بمی صدا
    voice.pitch = 0.8;

    // حجم صدا
    voice.volume = 1;

    speechSynthesis.speak(voice);
}


// ========================================
// JARVIS RESPONSES
// ========================================

function getJarvisResponse(message) {

    const text =
        message.toLowerCase().trim();


    // --------------------
    // سلام
    // --------------------

    if (
        text.includes("سلام") ||
        text.includes("درود")
    ) {

        return "سلام قربان. جارویس در خدمت شماست.";

    }


    // --------------------
    // اسم
    // --------------------

    if (
        text.includes("اسمت چیه") ||
        text.includes("اسمت") ||
        text.includes("کی هستی")
    ) {

        return "من جارویس هستم، دستیار هوشمند سیستم استارک.";

    }


    // --------------------
    // حالت چطوره
    // --------------------

    if (
        text.includes("خوبی") ||
        text.includes("چطوری")
    ) {

        return "تمام سیستم‌ها در وضعیت پایدار هستند قربان.";

    }


    // --------------------
    // ساعت
    // --------------------

    if (
        text.includes("ساعت") ||
        text.includes("زمان")
    ) {

        const now = new Date();

        const time =
            now.toLocaleTimeString(
                "fa-IR",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

        return "قربان، ساعت اکنون " +
            time +
            " است.";

    }


    // --------------------
    // تاریخ
    // --------------------

    if (
        text.includes("تاریخ") ||
        text.includes("امروز")
    ) {

        const now = new Date();

        const date =
            now.toLocaleDateString(
                "fa-IR"
            );

        return "امروز " +
            date +
            " است قربان.";

    }


    // --------------------
    // آیرون من
    // --------------------

    if (
        text.includes("آیرون من") ||
        text.includes("آیرونمن") ||
        text.includes("زره")
    ) {

        return "سیستم زره آیرون من آماده است قربان.";

    }


    // --------------------
    // فعال کردن سیستم
    // --------------------

    if (
        text.includes("فعال کن") ||
        text.includes("روشن کن") ||
        text.includes("سیستم رو روشن")
    ) {

        return "تمام سیستم‌ها فعال شدند قربان.";

    }


    // --------------------
    // خاموش کردن
    // --------------------

    if (
        text.includes("خاموش شو") ||
        text.includes("خاموش کن") ||
        text.includes("خواب")
    ) {

        return "سیستم وارد حالت آماده‌باش می‌شود قربان.";

    }


    // --------------------
    // تشکر
    // --------------------

    if (
        text.includes("ممنون") ||
        text.includes("مرسی") ||
        text.includes("تشکر")
    ) {

        return "خواهش می‌کنم قربان.";

    }


    // --------------------
    // خداحافظی
    // --------------------

    if (
        text.includes("خداحافظ") ||
        text.includes("فعلا")
    ) {

        return "خدانگهدار قربان.";

    }


    // --------------------
    // جواب پیش‌فرض
    // --------------------

    return "متوجه نشدم قربان. لطفاً دوباره تکرار کنید.";

}


// ========================================
// START JARVIS
// ========================================

function startJarvis() {

    jarvisOnline = true;

    if (status) {

        status.textContent =
            "JARVIS ONLINE // SYSTEM READY";

        status.style.color =
            "#ff0000";
    }

    if (commandBtn) {

        commandBtn.textContent =
            "🎙️ TALK TO JARVIS";

    }

    jarvisSpeak(
        "سلام قربان. جارویس آنلاین است. آماده دریافت فرمان هستم."
    );
}


// ========================================
// LISTEN TO USER
// ========================================

function listenToUser() {

    if (!recognition) {

        jarvisSpeak(
            "قربان، مرورگر شما از تشخیص صدا پشتیبانی نمی‌کند."
        );

        return;
    }


    if (isListening) {

        return;

    }


    isListening = true;


    if (status) {

        status.textContent =
            "🎙️ JARVIS IS LISTENING...";

        status.style.color =
            "#ff0000";

    }


    try {

        recognition.start();

    } catch (error) {

        console.log(error);

        isListening = false;

    }

}


// ========================================
// USER SPEAKS
// ========================================

if (recognition) {

    recognition.onstart =
        function () {

            isListening = true;

            if (status) {

                status.textContent =
                    "🎙️ LISTENING...";

            }

        };


    recognition.onresult =
        function (event) {

            const userText =
                event.results[0][0].transcript;


            console.log(
                "USER:",
                userText
            );


            if (status) {

                status.textContent =
                    "YOU: " + userText;

            }


            // دریافت پاسخ
            const response =
                getJarvisResponse(userText);


            console.log(
                "JARVIS:",
                response
            );


            // کمی تأخیر برای طبیعی‌تر شدن
            setTimeout(
                function () {

                    if (status) {

                        status.textContent =
                            "JARVIS: " + response;

                    }

                    jarvisSpeak(
                        response
                    );

                },
                400
            );

        };


    recognition.onerror =
        function (event) {

            console.log(
                "Voice Error:",
                event.error
            );


            isListening = false;


            if (
                event.error ===
                "not-allowed"
            ) {

                if (status) {

                    status.textContent =
                        "❌ MICROPHONE ACCESS DENIED";

                }

                jarvisSpeak(
                    "قربان، اجازه استفاده از میکروفون داده نشده است."
                );

            } else {

                if (status) {

                    status.textContent =
                        "VOICE SYSTEM ERROR";

                }

            }

        };


    recognition.onend =
        function () {

            isListening = false;


            setTimeout(
                function () {

                    if (jarvisOnline &&
                        status) {

                        status.textContent =
                            "JARVIS READY";

                    }

                },
                2500
            );

        };

}


// ========================================
// MAIN JARVIS BUTTON
// ========================================

if (jarvisBtn) {

    jarvisBtn.addEventListener(
        "click",
        function () {

            const jarvisSection =
                document.getElementById("jarvis");


            if (jarvisSection) {

                jarvisSection.scrollIntoView({
                    behavior: "smooth"
                });

            }


            setTimeout(
                function () {

                    startJarvis();

                },
                700
            );

        }
    );

}


// ========================================
// TALK BUTTON
// ========================================

if (commandBtn) {

    commandBtn.addEventListener(
        "click",
        function () {

            if (!jarvisOnline) {

                startJarvis();

                return;

            }


            listenToUser();

        }
    );

}


// ========================================
// ARMOR SYSTEM
// ========================================

const suits =
    document.querySelectorAll(".suit-card");


suits.forEach(
    function (suit) {

        suit.addEventListener(
            "click",
            function () {

                // حذف انتخاب قبلی
                suits.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                // انتخاب زره
                suit.classList.add(
                    "active"
                );


                const title =
                    suit.querySelector("h3");


                if (title) {

                    const armorName =
                        title.textContent;


                    if (status) {

                        status.textContent =
                            armorName +
                            " SELECTED";

                    }


                    jarvisSpeak(
                        armorName +
                        " انتخاب شد قربان."
                    );

                }

            }
        );

    }
);


// ========================================
// ARC REACTOR MOUSE EFFECT
// ========================================

const reactor =
    document.querySelector(
        ".arc-reactor"
    );


if (reactor) {

    document.addEventListener(
        "mousemove",
        function (event) {

            const x =
                (window.innerWidth / 2 -
                    event.clientX) / 50;


            const y =
                (window.innerHeight / 2 -
                    event.clientY) / 50;


            reactor.style.transform =
                `translate(
                    calc(-50% + ${x}px),
                    calc(-50% + ${y}px)
                )`;

        }
    );

}


// ========================================
// STARTUP
// ========================================

window.addEventListener(
    "load",
    function () {

        console.log(
            "================================"
        );

        console.log(
            "JARVIS SYSTEM INITIALIZED"
        );

        console.log(
            "STARK INDUSTRIES"
        );

        console.log(
            "ALL SYSTEMS READY"
        );

        console.log(
            "================================"
        );

    }
);
```
