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

const gallery = document.querySelector("#gallery");
const imageWidth = gallery.querySelector("img").getBoundingClientRect().width;

gallery.addEventListener("wheel", (e) => {
	e.preventDefault();
	direction = Number(e.deltaY) < 0 ? -1 : 1;
	gallery.scrollTo(gallery.scrollLeft + direction*imageWidth, 0);
});

document.querySelectorAll(".scroll").forEach((i) => {
	i.addEventListener("click", (e) => {
		let direction = (e.target.getAttribute("direction") == "left") ? -1 : 1
		gallery.scrollTo((gallery.scrollLeft + direction*imageWidth), 0);
	})
});