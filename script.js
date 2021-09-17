const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0; 
let photosArray = [];

//unsplash api
const count = 30;
const apiKey = 'gfNJr-n9HxhzFBDA_5WfKvBqUXRrVA0Eau-ASh4vpSc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
//check if all images are loaded 
function imageLoaded () {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready=', ready);
    }
}
//helper function 
function setAttributes(element, attributes) {
for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
}
}

//create elements for links and photos, add to dom

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank');
        //create img for photo
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        //img.setAttribute('src', photo.urls.regular);
        //img.setAttribute('alt', photo.alt_description);
       // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        //event listener, check when each is finished loading 
        img.addEventListener('load', imageLoaded); 

        // put img inside a , then both inside img container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


//get photos from unsplash 
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch (error) {
        //catch error here 
    }
}

//check to see if scrolling near bottom 

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
{   ready = false; 
    getPhotos(); 


}
});

//on load 
getPhotos();