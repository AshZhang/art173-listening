const TONE_PATH = "sounds/phone/";
const VM_PATH = "sounds/voicemails/";
const NUM_TONES = 10;
const NUM_VMS = 8;
const tones = [];
const voicemails = [];
const buttons = [];
const container = document.body.querySelector(".keypad");
const number = document.body.querySelector(".number").querySelector("p");
const photo = document.body.querySelector(".stock-photo");
const photos = [
    "https://c8.alamy.com/comp/DPH7BX/happy-call-centre-agent-looking-at-camera-giving-thumbs-up-DPH7BX.jpg",
    "https://thumbs.dreamstime.com/z/businessman-making-phone-call-showing-thumb-up-19947588.jpg",
    "https://mh-2-stockagency.panthermedia.net/media/previews/0006000000/06929000/06929807_high.jpg",
    "https://thumbs.dreamstime.com/b/businessman-boring-phone-call-20401311.jpg",
    "https://previews.123rf.com/images/auremar/auremar1212/auremar121201309/16808075-businessman-taking-a-bad-phone-call.jpg",
    "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX3438687.jpg"
]
<<<<<<< HEAD
let lastPhotoId = -1;
let lastVmId = -1;
=======
>>>>>>> 85e211259bcc2464eb1ba9b040560b7d9fd39083
// const ringSound = new Howl({ src: `${TONE_PATH}dial.mp3` });
let curSound = undefined;
let dialNumber = ""
let dialEnabled = true;
let numRings = 0;

function setup() {
    loadSounds();
    makeButtons();
}

function loadSounds() {
    for (let i = 0; i < NUM_TONES; i++) {
        tones.push(new Howl({ src: `${TONE_PATH}${i}.m4a`, preload: true }));
    }
    for (let i = 0; i < NUM_VMS; i++) {
        voicemails.push(new Howl({
            src: `${VM_PATH}${i}.m4a`, onend: () => {
                dialEnabled = true;
            }
        }));
    }
}

function makeButtons() {
    for (let i = 1; i < 10; i++) {
        makeButton(i);
    }
    makeButton(0);
}

function makeButton(i) {
    let button = document.createElement("div");
    button.classList.add("button");
    button.addEventListener("mousedown", () => { dial(i) });
    let buttonText = document.createElement("p");
    buttonText.innerHTML = i;
    buttonText.classList.add("button-text");
    button.appendChild(buttonText);
    container.appendChild(button);
    buttons.push(button);
}

function playSound(sound) {
    sound.play();
}

function hangUp() {
    curSound.stop();
    numRings = 0;
    dialEnabled = true;
}

function dial(i) {
    if (dialEnabled) {
        playSound(tones[i]);
        dialNumber += `${i}`;
        updateNumber();
        if (dialNumber.length >= 10) {
            dialEnabled = false;
            call();
        }
    }
}

function updateNumber() {
    number.innerHTML = dialNumber;
}

function playRingTone(i) {
    const ringSound = new Howl({
        src: `${TONE_PATH}dial.mp3`,
        preload: true,
        onend: function () {
            if (i > 0) {
                playRingTone(i - 1);
            } else {
                playVoicemail();
            }
        }
    });
    curSound = ringSound;
    ringSound.play();
}

function call() {
    numRings = Math.floor(Math.random() * 3);
    console.log(numRings);
    playRingTone(numRings);
    dialNumber = "";
}

function playVoicemail() {
    let id = -1;
    do{
        id = Math.floor(Math.random() * voicemails.length);
    }while(id == lastVmId);
    let photoId = -1;
    do{
        photoId = Math.floor(Math.random() * photos.length)
    }while(photoId == lastPhotoId);
    photo.src = photos[photoId];
    curSound = voicemails[id];
    voicemails[id].play();
}