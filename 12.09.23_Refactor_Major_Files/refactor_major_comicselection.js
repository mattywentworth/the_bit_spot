const containerChooseAComic = document.getElementById('choose-a-comic-container');
const choiceComic = document.getElementsByClassName('comic-choice'); /* May need to come back to this and change to getQuerySelectorAll?? */
const startShow = document.getElementById('start-show');
const containerOfComics = document.getElementById('comic-container');

const createArrayOfComics = () => {
    const elementsOfComics = containerOfComics.children; //Seeing if this works here instead of line 48
    const comicArray = [];
    for (let i = 0; i < elementsOfComics.length; i++) {
        comicArray.push(elementsOfComics[i].id);
    }
    return comicArray;
};

const identifySelectedComic = (e) => {
    const clickedComic = e.currentTarget.id;
    return clickedComic;
    //code testing that the function works: document.getElementById('logo').innerHTML = clickedComic;
};

const createUnclickedComicArray = (e) => {
    const comicClicked = identifySelectedComic(e);
    const arrayComics = createArrayOfComics();
    const filteredComicArray = arrayComics.filter(comic => comicClicked !== comic);
    return filteredComicArray;
    //document.getElementById('logo').innerHTML = filteredComicArray;
};

const darkenComics = (e) => {
    const selectedComic = identifySelectedComic(e);
    //Updating session storage with comic name to persist to the next page
    sessionStorage.setItem('comic-name', selectedComic);
    //End session storage section
    const unclickedComicArray = createUnclickedComicArray(e);
    //document.getElementById('logo').innerHTML = unclickedComicArray;
    for (i = 0; i < unclickedComicArray.length; i++) {
        //document.getElementById('logo').innerHTML = i;
        document.getElementById(unclickedComicArray[i]).style.color = 'rgb(57, 57, 57)';
        document.getElementById(unclickedComicArray[i]).style.border = '1px solid transparent';
    };
    document.getElementById(selectedComic).style.color = 'gold';
    document.getElementById(selectedComic).style.border = '1px solid gold';
    startShow.style.display = 'block';
    completeSet.setAttribute('data-comic', selectedComic);
};

//choiceComic.addEventListener('click', darkenComics(e));

for (let i = 0; i < choiceComic.length; i ++) {
    choiceComic[i].addEventListener('click', darkenComics);
};
