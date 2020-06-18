const root = document.querySelector(":root");
const image = root.querySelector("#image");
const firstCircle = image.querySelector("circle");

// ########################################## Resizing the image box #########################################
function resizeImage() {
	let {width, height} = image.parentElement.getBoundingClientRect();
	root.style.setProperty("--image-size", Math.min(width, height) + "px");
}

resizeImage();
window.addEventListener("resize", resizeImage);

// ########################################## Split a circle into 4 ##########################################
function split(e) {
	// if it isn't still animating
	if (e.target.getAttribute("animating") == null) {
		e.target.style.fill = "red";

		let c = document.createElement("circle");
		c.addEventListener("mouseenter", split);
	}
}

function finishAnimating(e) {
	e.target.removeAttribute("animating")
}

firstCircle.addEventListener("animationend", function() {
	this.removeAttribute("animating");
});

firstCircle.addEventListener("mouseenter", split);

// ########################################### Scroll Image Gallery ##########################################

// const galleryContainer = document.querySelector("#gallery-container");
// const gallery = galleryContainer.querySelector("#gallery");

// galleryContainer.addEventListener("click", (e) => {
// 	console.log(e);
// });