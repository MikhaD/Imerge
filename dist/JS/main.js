// import Settings from "./classes/Settings";
// import Gallery from "./classes/Settings";
// import Imerge from "./classes/Settings";

const root = document.querySelector(":root");
const image = root.querySelector("#image");
const firstCircle = image.querySelector("circle");
// todo: Use ajax to load the first 8 images
const gallery = document.querySelector("#gallery");
gallery.imageWidth = gallery.querySelector("img").getBoundingClientRect().width;
gallery.size = 9;

root.style.setProperty("--total-options", gallery.size);

// ########################################## Resizing the image box #########################################
function resizeImage() {
	let { width, height } = image.parentElement.getBoundingClientRect();
	root.style.setProperty("--imerge-size", Math.min(width, height) + "px");
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

firstCircle.addEventListener("animationend", function () {
	this.removeAttribute("animating");
});

// add eventhandler in html rather
firstCircle.addEventListener("mouseenter", split);

// ############################################## Image Gallery ##############################################
// scroll image gallery horizontally on mousewheel when hovered
gallery.addEventListener("wheel", (e) => {
	e.preventDefault();
	let direction = Number(e.deltaY) < 0 ? -1 : 1;
	gallery.scrollTo(gallery.scrollLeft + direction * gallery.imageWidth, 0);
});
// scroll image gallery on arrow press
document.querySelectorAll(".scroll").forEach((i) => {
	i.addEventListener("click", (e) => {
		let direction = (e.target.getAttribute("direction") == "left") ? -1 : 1
		gallery.scrollTo((gallery.scrollLeft + direction * gallery.imageWidth), 0);
	})
});

// ############################################### Upload Image ##############################################
(() => {
	const upload = document.querySelector("#upload-label");
	const processing = upload.querySelector(".processing");
	const failed = upload.querySelector(".failed");
	const succeeded = upload.querySelector(".succeeded");
	const progress = document.querySelector("#progress");
	const pad = gallery.querySelector(".pad");

	upload.addEventListener("dragover", (e) => {
		// prevent file from being opened in the browser
		e.preventDefault();
		e.target.classList.add("drag-over");
	});
	// Stop hilighting drag area if user is not hovering over it
	upload.addEventListener("dragleave", (e) => {
		e.target.classList.remove("drag-over");
	});
	// Prevent uploading while processing & remove success or 
	upload.addEventListener("click", (e) => {
		if (processing.classList.contains("visible") || failed.classList.contains("visible") || succeeded.classList.contains("visible")) {
			e.preventDefault();
		}
		failed.classList.remove("visible");
		succeeded.classList.remove("visible");
	});
	// process files if the user drags and drops to upload images
	upload.addEventListener("drop", (e) => {
		// prevent file from being opened in the browser
		e.preventDefault();
		if (e.dataTransfer.items) {
			processFiles(e.dataTransfer.files);
		}
	});
	// process files if the user clicks to upload images
	document.querySelector("#upload").addEventListener("change", (e) => {
		if (e.target.files) {
			processFiles(e.target.files)
		}
	});

	function processFiles(files) {
		upload.classList.remove("drag-over");
		progress.setAttribute("value", 0);
		progress.increment = 100 / files.length;
		processing.querySelector("h2").textContent = "Processing Image" + ((files.length > 1) ? "s" : "");
		processing.classList.add("visible");
		for (let img of files) {
			if (["image/png", "image/jpeg"].indexOf(img.type) < 0) {
				failed.classList.add("visible");
				processing.classList.remove("visible");
				setTimeout(() => failed.classList.remove("visible"), 3000);
				break;
			} else {
				createImage(img, true, progress);
			}
		}
	}

	/**
	 * Create image in gallery from uploaded image
	 * @param {File} file - The file object of the image
	 * @param {boolean} fromUser - Whether the image was uploaded by the user or not
	* @param {HTMLElement} progress - The progress bar to increase
	 */
	function createImage(file, fromUser, progress) {
		const reader = new FileReader();
		const fig = (() => {
			let result = document.createElement("figure");
			let temp = document.createElement("img");
			result.setAttribute("tabindex", 0);
			result.appendChild(temp);
			if (fromUser) {
				// Store reference to file on figure
				result.originalFile = file;
				result.classList = "from-user";
				temp = document.createElement("div");
				temp.addEventListener("click", (e) => {
					root.style.setProperty("--total-options", --gallery.size);
					e.target.parentElement.remove();
				});
				temp.textContent = "×";
				result.appendChild(temp);
			}
			return result;
		})();
		reader.addEventListener("load", () => {
			fig.firstElementChild.src = reader.result;
			root.style.setProperty("--total-options", ++gallery.size);
			gallery.insertBefore(fig, pad);
			gallery.scrollTo(gallery.scrollWidth, 0);
			progress.setAttribute("value", Number(progress.getAttribute("value")) + progress.increment / 2);
			// If this was the last image loaded
			if (progress.getAttribute("value") >= 100) {
				processing.classList.remove("visible");
				succeeded.classList.add("visible");
				setTimeout(() => succeeded.classList.remove("visible"), 3000);
			}
		}, false);
		progress.setAttribute("value", Number(progress.getAttribute("value")) + progress.increment / 2);
		reader.readAsDataURL(file);
	}















})();