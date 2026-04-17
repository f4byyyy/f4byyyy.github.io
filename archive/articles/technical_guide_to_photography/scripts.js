

function toggleMagnification(elem, magnification) {

    let images = document.getElementsByClassName("fig_img_comparision")[0].getElementsByTagName("img");
    images[0].style.scale = magnification;
    images[1].style.scale = magnification;

    let zoom_buttons = document.getElementsByClassName("zoom_settings")[0].getElementsByTagName("div");
    Array.from(zoom_buttons).forEach(btn => {
        btn.style.backgroundColor = "transparent";
    });

    elem.style.backgroundColor = "#363680";
}