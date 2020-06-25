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

// add eventhandler in html rather
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

// ############################################### Upload Image ##############################################
(() => {
const upload = document.querySelector("#upload-label");
const processing = upload.querySelector(".processing");
const failed = upload.querySelector(".failed");
const uploaded = upload.querySelector(".uploaded");

upload.addEventListener("drop", (e) => {
	// prevent file from being opened in the browser
	e.preventDefault();
	e.target.classList.remove("drag-over");
	processing.classList.add("visible");
	// If there are any items
	if (e.dataTransfer.items) {
		for (let img of e.dataTransfer.files) {
			if (["image/png", "image/jpeg"].indexOf(img.type) < 0) {
				failed.classList.add("visible");
				processing.classList.remove("visible");
				setTimeout(() => failed.classList.remove("visible"), 3000);
				break;
			}
		
		}
	}
});

upload.addEventListener("dragover", (e) => {
	// prevent file from being opened in the browser
	e.preventDefault();
	e.target.classList.add("drag-over");
});

upload.addEventListener("dragleave", (e) => {
	e.target.classList.remove("drag-over");
});

upload.addEventListener("click", (e) => {
	if (processing.classList.contains("visible") || failed.classList.contains("visible") || uploaded.classList.contains("visible")) {
		e.preventDefault();
	}
	failed.classList.remove("visible");
	uploaded.classList.remove("visible");
});

})();