// Loads all game images

assetsLoaded = 0;
assetsToLoad = 1;

loadImages = function() {
    // ADD ANY IMAGES TO LOAD HERE.
    // CAN DEFINE IMAGE VAR IN YOUR FILE JUST REFERENCE IT HERE
    // AN BE SURE TO ADD ONTO THE CONSTANT AT THE TOP WHEN YOU ADD ONE

    pupsPic = new Image();
    pupsPic.onload = function() {imageLoaded();};
    pupsPic.src = ('img/DogR.png');

};

imageLoaded = function() {
    assetsLoaded++;

    // check if all assets are loaded
    if (assetsLoaded == assetsToLoad) {
        fullyLoaded = true;
    }
};
