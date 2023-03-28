
const validate = (newGame) => {
    let objErrors = {};
    if (!newGame.name) {objErrors.name="Name is mandatory"}
    if (newGame.name.length>25||newGame.name.length<3) {objErrors.name="Name must contain between 3 and 25 characters"}
    if (!newGame.image) {objErrors.image="Image url is mandatory"}
    if (newGame.image.length>250) {objErrors.image="Image url is over 255 characters"}
    if(newGame.description.length < 10||newGame.description.length>250) {objErrors.description = "Description must contain between 10 and 140 characters"};
    if(newGame.genre.length < 1) {objErrors.genre = "The game must have at least one genre"}
    if(newGame.platforms.length < 1) {objErrors.platforms = "the game must have at least one platform"}
    if (!newGame.released) {objErrors.released="release date is mandatory"}
    return objErrors
};

export default validate;
