/* =========================================================
   MENNA & AMR — WEDDING FILM
   JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const begin =
    document.getElementById("begin");

const opening =
    document.getElementById("opening");

const cinema =
    document.getElementById("cinema");

const leftCurtain =
    document.getElementById("leftCurtain");

const rightCurtain =
    document.getElementById("rightCurtain");

const music =
    document.getElementById("music");

const scenes =
    document.querySelectorAll(".scene");


/* =========================================================
   SETTINGS
========================================================= */

let currentScene = 0;

let playing = false;

let sceneTimer = null;

let wheelLocked = false;


/* =========================================================
   START THE WEDDING FILM
========================================================= */

begin.addEventListener("click", () => {

    if (playing) return;

    playing = true;


    /* -----------------------------------------
       START MUSIC
    ----------------------------------------- */

    music.volume = 0.45;

    music.play().catch(() => {
        console.log("Music waiting for user interaction.");
    });


    /* -----------------------------------------
       TURN ON CINEMA
    ----------------------------------------- */

    cinema.classList.add("active");


    /* -----------------------------------------
       OPEN THE CURTAINS
    ----------------------------------------- */

    setTimeout(() => {

        leftCurtain.classList.add("open");

        rightCurtain.classList.add("open");

    }, 300);


    /* -----------------------------------------
       HIDE OPENING SCREEN
    ----------------------------------------- */

    setTimeout(() => {

        opening.classList.add("hide");

    }, 700);


    /* -----------------------------------------
       START FILM
    ----------------------------------------- */

    setTimeout(() => {

        startFilm();

    }, 1800);

});


/* =========================================================
   START FILM
========================================================= */

function startFilm() {

    currentScene = 0;

    scenes.forEach(scene => {

        scene.classList.remove("active");
        scene.classList.remove("exit");

    });


    scenes[0].classList.add("active");


    startAutomaticScenes();

}


/* =========================================================
   AUTOMATIC SCENE TIMER
========================================================= */

function startAutomaticScenes() {

    clearInterval(sceneTimer);


    sceneTimer = setInterval(() => {

        if (currentScene >= scenes.length - 1) {

            clearInterval(sceneTimer);

            return;

        }


        goToScene(currentScene + 1);

    }, 6500);

}


/* =========================================================
   GO TO NEXT / PREVIOUS SCENE
========================================================= */

function goToScene(nextScene) {

    if (nextScene < 0) return;

    if (nextScene >= scenes.length) return;

    if (nextScene === currentScene) return;


    const oldScene =
        scenes[currentScene];

    const newScene =
        scenes[nextScene];


    /* -----------------------------------------
       OLD SCENE OUT
    ----------------------------------------- */

    oldScene.classList.remove("active");

    oldScene.classList.add("exit");


    /* -----------------------------------------
       NEW SCENE IN
    ----------------------------------------- */

    newScene.classList.remove("exit");

    newScene.classList.add("active");


    /* -----------------------------------------
       UPDATE CURRENT SCENE
    ----------------------------------------- */

    currentScene = nextScene;


    /* -----------------------------------------
       CLEAN OLD SCENE
    ----------------------------------------- */

    setTimeout(() => {

        oldScene.classList.remove("exit");

    }, 1500);

}


/* =========================================================
   RESET AUTOMATIC TIMER
========================================================= */

function resetTimer() {

    if (!playing) return;

    clearInterval(sceneTimer);

    startAutomaticScenes();

}


/* =========================================================
   MOUSE WHEEL
========================================================= */

window.addEventListener("wheel", (event) => {

    if (!playing) return;

    if (wheelLocked) return;


    wheelLocked = true;


    if (event.deltaY > 0) {

        /* NEXT */

        if (currentScene < scenes.length - 1) {

            goToScene(currentScene + 1);

        }

    } else {

        /* PREVIOUS */

        if (currentScene > 0) {

            goToScene(currentScene - 1);

        }

    }


    resetTimer();


    setTimeout(() => {

        wheelLocked = false;

    }, 1300);

}, { passive: true });


/* =========================================================
   TOUCH / SWIPE
========================================================= */

let touchStartY = 0;

let touchEndY = 0;


document.addEventListener("touchstart", (event) => {

    if (!playing) return;

    touchStartY =
        event.changedTouches[0].screenY;

}, { passive: true });


document.addEventListener("touchend", (event) => {

    if (!playing) return;


    touchEndY =
        event.changedTouches[0].screenY;


    const distance =
        touchStartY - touchEndY;


    /* Ignore very small movements */

    if (Math.abs(distance) < 50) {
        return;
    }


    /* -----------------------------------------
       SWIPE UP
    ----------------------------------------- */

    if (distance > 0) {

        if (currentScene < scenes.length - 1) {

            goToScene(currentScene + 1);

        }

    }


    /* -----------------------------------------
       SWIPE DOWN
    ----------------------------------------- */

    else {

        if (currentScene > 0) {

            goToScene(currentScene - 1);

        }

    }


    resetTimer();

}, { passive: true });


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener("keydown", (event) => {

    if (!playing) return;


    /* NEXT */

    if (
        event.key === "ArrowDown" ||
        event.key === "ArrowRight" ||
        event.key === " "
    ) {

        event.preventDefault();


        if (currentScene < scenes.length - 1) {

            goToScene(currentScene + 1);

        }

        resetTimer();

    }


    /* PREVIOUS */

    if (
        event.key === "ArrowUp" ||
        event.key === "ArrowLeft"
    ) {

        if (currentScene > 0) {

            goToScene(currentScene - 1);

        }

        resetTimer();

    }

});


/* =========================================================
   GET DIRECTIONS
========================================================= */

const mapButton =
    document.querySelector(".map-btn");


if (mapButton) {

    mapButton.addEventListener("click", () => {

        window.open(
            "https://www.google.com/maps",
            "_blank"
        );

    });

}


/* =========================================================
   RSVP
========================================================= */

const rsvpButton =
    document.querySelector(".rsvp");


if (rsvpButton) {

    rsvpButton.addEventListener("click", () => {

        /*
        ============================================
        IMPORTANT

        حطي رقم الواتساب هنا

        مثال:

        https://wa.me/201XXXXXXXXX

        من غير + ومن غير مسافات
        ============================================
        */


        const phone =
            "201XXXXXXXXX";


        if (
            phone !== "201XXXXXXXXX" &&
            phone.length > 5
        ) {

            window.open(
                "https://wa.me/" + phone,
                "_blank"
            );

        } else {

            alert(
                "Please add the WhatsApp number first."
            );

        }

    });

}


/* =========================================================
   FILM STRIP
   EXTRA MOVEMENT
========================================================= */

const filmTrack =
    document.querySelector(".film-track");


if (filmTrack) {

    filmTrack.addEventListener(
        "mouseenter",
        () => {

            filmTrack.style.animationPlayState =
                "paused";

        }
    );


    filmTrack.addEventListener(
        "mouseleave",
        () => {

            filmTrack.style.animationPlayState =
                "running";

        }
    );

}


/* =========================================================
   CINEMATIC IMAGE ZOOM
========================================================= */

function cinematicZoom() {

    scenes.forEach((scene, index) => {

        const image =
            scene.querySelector(".scene-bg");


        if (!image) return;


        if (index === currentScene) {

            image.style.transform =
                "scale(1.08)";

        } else {

            image.style.transform =
                "scale(1)";

        }

    });

}


/* =========================================================
   WATCH SCENE CHANGES
========================================================= */

setInterval(() => {

    if (!playing) return;

    cinematicZoom();

}, 100);


/* =========================================================
   FINAL SCENE
========================================================= */

function checkFinalScene() {

    if (
        currentScene ===
        scenes.length - 1
    ) {

        clearInterval(sceneTimer);

    }

}


/* =========================================================
   UPDATE FINAL SCENE
========================================================= */

const originalGoToScene =
    goToScene;


/* =========================================================
   PREVENT PAGE SCROLL
========================================================= */

document.addEventListener(
    "touchmove",
    (event) => {

        if (playing) {

            event.preventDefault();

        }

    },
    { passive: false }
);


/* =========================================================
   INITIAL STATE
========================================================= */

window.addEventListener("load", () => {

    scenes.forEach((scene, index) => {

        if (index === 0) {

            scene.classList.add("active");

        } else {

            scene.classList.remove("active");

        }

    });

});