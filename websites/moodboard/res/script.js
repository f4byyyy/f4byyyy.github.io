let menuOpen = true;
let creatingNewBoard = false;

let activeBoardNavItem = null;
let activeBoard = null; //timecode of the active board

let dialogOpen = false;

//localStorage.clear();


//dialog backdrop:
let dialog_backdrop = document.getElementById("backdrop");
dialog_backdrop.addEventListener("click", () => {
    closeDialog();
});


// close dialog when pressing Esc:
document.addEventListener('keyup', function (event) {
    if (event.key === "Escape") {
        closeDialog();
    }
});

function openDialog(id) {

    if(dialogOpen) {
        closeDialog();
    }
    dialogOpen = true;

    dialog_backdrop.style.display = "block";
    let dialog = document.getElementById(id);
    dialog.style.display = "flex";
    dialog.classList.add("open_dialog");
    dialog_backdrop.classList.add("open_backdrop");
    let focus_element = dialog.querySelector(".dialog_focus");
    if(focus_element != null) {
        focus_element.focus();
    }

    return dialog;
}

function closeDialog() {
    dialogOpen = false;

    dialog = document.getElementsByClassName("open_dialog")[0];
    if(dialog != null) {
        dialog.style.display = "none";
        dialog.classList.remove("open_dialog");
        dialog_backdrop.classList.remove("open_backdrop");
        dialog_backdrop.style.display = "none";
    }
}


function toggleMenu() {

    if(menuOpen) {

        navigation = document.getElementById("navigation");
        navigation.style.width = "48px";
        navigation.style.padding = "16px 8px";
        
        document.querySelectorAll(".moodboard_name").forEach(elem => {
            elem.style.display = "none";
        });

        document.querySelector("nav b").style.display = "none";
        document.querySelector(".nav_title").style.justifyContent = "center";
        document.querySelector(".nav_footer").style.display = "none";

        setTimeout(function() {
            document.querySelector(".nav_title a").style.marginLeft = "0";
            document.querySelector(".add_moodboard span").innerHTML = "";
            document.querySelector(".add_moodboard svg").style.marginRight = "0";
        }, 200);

        document.querySelectorAll(".moodboard").forEach(elem => {
            elem.classList.add("show_tooltip");
        });
        document.querySelector(".add_moodboard").classList.add("show_tooltip");
        
    } else {

        navigation = document.getElementById("navigation");
        navigation.style.width = "";
        navigation.style.padding = "16px";
        
        document.querySelectorAll(".moodboard_name").forEach(elem => {
            elem.style.display = "initial";
        });

        document.querySelector("nav b").style.display = "initial";
        document.querySelector(".nav_title").style.justifyContent = "space-between";
        document.querySelector(".nav_footer").style.display = "initial";

        document.querySelector(".nav_title a").style.marginLeft = "auto";
        document.querySelector(".add_moodboard span").innerHTML = "Add board";
        document.querySelector(".add_moodboard svg").style.marginRight = "5px";

        document.querySelectorAll(".moodboard").forEach(elem => {
            elem.classList.remove("show_tooltip");
        });
        document.querySelector(".add_moodboard").classList.remove("show_tooltip");

    }

    menuOpen = !menuOpen;
}

function openMoodboard(elem, board) {

    let moodboard_content = document.getElementById("moodboard_content_inner_wrapper");
    moodboard_content.innerHTML = "";

    if(activeBoardNavItem != null) {
        activeBoardNavItem.classList.remove("active_board");
    }

    activeBoardNavItem = elem;
    activeBoard = board;

    board_meta_data = getActiveBoardMetaData();
    elem.classList.add("active_board");

    document.querySelector("#board_header #board_name_input").value = board_meta_data.title;
    document.querySelector("#board_header .icon").innerHTML = board_meta_data.icon;

    document.querySelector("#board_header").style.display = "flex";

    //load images:
    let data = localStorage.getItem(activeBoard + "-data");
    if(data != "") {
        data = JSON.parse(data);

        let columns = [];
        for(let i = 0; i < 3; i++) {
            let col = document.createElement("div");
            col.classList.add("moodboard_column");
            moodboard_content.appendChild(col);
            columns.push(col);
        }

        for(let i = 0; i < data.length; i++) {

            let url = data[data.length - 1 - i];
            let col = i % columns.length;

            let div = document.createElement("div");
            div.innerHTML = '<img src="' + url + '" onclick="showImage(this)">';

            let deleteBtn = document.createElement("button");
            deleteBtn.classList.add("img_delete_btn");
            deleteBtn.title = "Delete";
            deleteBtn.setAttribute("onclick", "openDeleteImageDialog(" + (data.length - 1 - i) + ")");
            deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>';
            div.appendChild(deleteBtn);

            columns[col].appendChild(div);

        }
    } else {
        moodboard_content.innerHTML = '<div class="empty_board_info"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-dashed-icon lucide-square-dashed"><path d="M5 3a2 2 0 0 0-2 2"/><path d="M19 3a2 2 0 0 1 2 2"/><path d="M21 19a2 2 0 0 1-2 2"/><path d="M5 21a2 2 0 0 1-2-2"/><path d="M9 3h1"/><path d="M9 21h1"/><path d="M14 3h1"/><path d="M14 21h1"/><path d="M3 9v1"/><path d="M21 9v1"/><path d="M3 14v1"/><path d="M21 14v1"/></svg>'
        + '<span>Nothing here</span></div>';
    }

    //save the last opened board
    localStorage.setItem("open_board", board);

}

function showImage(img_elem) {

    openDialog("show_image_dialog");

    document.querySelector("#show_image_dialog img").setAttribute("src", img_elem.getAttribute("src"));

}

function deleteImage(index) {

    let data = localStorage.getItem(activeBoard + "-data");
    if(data != "") {
        data = JSON.parse(data);

        data.splice(index, 1);
    }

    if(data.length > 0) {
        localStorage.setItem(activeBoard + "-data", JSON.stringify(data));
    } else {
        localStorage.setItem(activeBoard + "-data", "");
    }

    openMoodboard(activeBoardNavItem, activeBoard);

    closeDialog();

}

function openDeleteImageDialog(index) {

    let dialog = openDialog("delete_image_confirm_dialog");

    dialog.querySelector(".confirm").setAttribute("onclick", "deleteImage(" + index + ")");
    //document.getElementsByClassName("board_name_placeholder")[0].innerHTML = getActiveBoardMetaData().title; //TODO: show a thumbnail of the image
}

function getActiveBoardMetaData() {
    return JSON.parse(localStorage.getItem(activeBoard + "-meta"));
}


// load moodboards:

let all_entries = Object.entries(localStorage);
//console.log(all_entries);
let moodboards = localStorage.getItem("boards");
if(moodboards != null) {
    moodboards = moodboards.split(";");
    moodboards.splice(-1); //last item is always an empty item
} else {
    moodboards = [];
}
//console.log(moodboards);

let nav_moodboards = document.querySelector(".moodboards");
let add_moodboard = document.querySelector(".add_moodboard");

moodboards.forEach(board_timecode => { addMoodboardToNavBar(board_timecode); });

let open_board = localStorage.getItem("open_board");
if(open_board != "") {
    let open_board_nav_item = document.querySelector("[data-id='" + open_board + "']");
    if(open_board_nav_item != null) {
        openMoodboard(open_board_nav_item, open_board);
    }
}

function addMoodboardToNavBar(board_timecode) {

    board = localStorage.getItem(board_timecode + "-meta");

    if(board != null) {
        board = JSON.parse(board);

        nav_item = document.createElement("a");
        nav_item.href = "#";
        nav_item.classList.add("moodboard");
        nav_item.setAttribute("onclick", "openMoodboard(this, " + board_timecode + ")");

        icon = document.createElement("div");
        icon.classList.add("moodboard_icon");
        icon.innerHTML = board.icon;
        nav_item.appendChild(icon);

        tooltip_text = document.createElement("div");
        tooltip_text.classList.add("tooltip");
        tooltip_text.innerHTML = board.title;
        nav_item.appendChild(tooltip_text);

        board_name = document.createElement("div");
        board_name.classList.add("moodboard_name");
        board_name.innerHTML = board.title;
        board_name.title = board.title;
        nav_item.appendChild(board_name);

        nav_item.setAttribute("data-id", board_timecode);
    }

    nav_moodboards.insertBefore(nav_item, add_moodboard);

}

function addBoard() {

    document.querySelector("#board_header").style.display = "flex";
    document.getElementById("moodboard_content_inner_wrapper").innerHTML = "";
    creatingNewBoard = true;
    beginEditCurrentBoard();

    if(activeBoardNavItem != null) {
        activeBoardNavItem.classList.remove("active_board");
    }

}

function beginEditCurrentBoard() {
        
    document.querySelector("#board_header .add_image").style.display = "none";
    document.querySelector("#board_header .edit_board").style.display = "none";
    document.querySelector("#board_header .delete_board").style.display = "none";

    document.querySelector("#board_header .save_edit").style.display = "flex";
    document.querySelector("#board_header .cancel_edit").style.display = "flex";

    input = document.querySelector("#board_header #board_name_input");
    let endPos = input.value.length;
    input.setSelectionRange(endPos, endPos); //set the cursor to the end
    input.removeAttribute("disabled");
    input.removeAttribute("readonly");

    if(creatingNewBoard) {
        input.value = "";
        document.querySelector("#board_header .icon").innerHTML = "X";
    }

    input.focus();

}

function endEditCurrentBoard(save_changes) {

    document.querySelector("#board_header .add_image").style.display = "flex";
    document.querySelector("#board_header .edit_board").style.display = "flex";
    document.querySelector("#board_header .delete_board").style.display = "flex";

    document.querySelector("#board_header .save_edit").style.display = "none";
    document.querySelector("#board_header .cancel_edit").style.display = "none";

    input = document.querySelector("#board_header #board_name_input");
    input.setSelectionRange(0, 0); //place the cursor at the start
    input.setAttribute("disabled", "");
    input.setAttribute("readonly", "");

    //TODO: maybe refactor/simplify
    if(creatingNewBoard && save_changes) {

        let timecode = Date.now();
        let name = document.querySelector("#board_name_input").value;

        let meta_data = {
            "title": name,
            "color": "",
            "icon": name[0]
        }

        localStorage.setItem(timecode + "-meta", JSON.stringify(meta_data));
        localStorage.setItem(timecode + "-data", "");
        //console.log(localStorage.getItem("boards"));
        
        let boards_content = localStorage.getItem("boards");
        if(boards_content == null) {
            boards_content = "";
        }
        localStorage.setItem("boards", boards_content + timecode + ";");

        addMoodboardToNavBar(timecode);
        document.querySelector("[data-id='" + timecode + "']").classList.add("active_board");
        activeBoardNavItem = document.querySelector("[data-id='" + timecode + "']");
        activeBoard = timecode;

        openMoodboard(activeBoardNavItem, activeBoard);
        

    } else if(save_changes) {

        let timecode = activeBoard;
        let name = document.querySelector("#board_name_input").value;
        let icon = document.querySelector("#board_header .icon").innerHTML;

        let meta_data = {
            "title": name,
            "color": "",
            "icon": icon
        }

        //update web storage:
        localStorage.setItem(timecode + "-meta", JSON.stringify(meta_data));

        //update navBar:
        activeBoardNavItem.getElementsByClassName("moodboard_name")[0].innerHTML = name;
        activeBoardNavItem.getElementsByClassName("moodboard_icon")[0].innerHTML = icon;
        activeBoardNavItem.getElementsByClassName("tooltip")[0].innerHTML = name;


    } else if(creatingNewBoard && !save_changes) {

        if(activeBoardNavItem != null) {
            openMoodboard(activeBoardNavItem, activeBoard);
        } else {
            document.querySelector("#board_header").style.display = "none";
        }

    }

    creatingNewBoard = false;

}

function openDeleteBoardDialog() {

    openDialog("delete_board_confirm_dialog");

    document.getElementsByClassName("board_name_placeholder")[0].innerHTML = getActiveBoardMetaData().title;
}

function deleteCurrentBoard() {

    closeDialog();
    document.querySelector("#board_header").style.display = "none";

    localStorage.removeItem(board + "-meta");
    localStorage.removeItem(board + "-data");

    board_list = localStorage.getItem("boards");
    if(board_list.includes(";" + activeBoard)) {
        localStorage.setItem("boards", board_list.replace(";" + activeBoard, ""));
    } else {
        localStorage.setItem("boards", board_list.replace(activeBoard + ";", ""));
    }

    activeBoard = null;
    activeBoardNavItem.remove();
    activeBoardNavItem = null;

    document.getElementById("moodboard_content_inner_wrapper").innerHTML = "";

    localStorage.setItem("open_board", "");

}


function openAddImageDialog() {

    openDialog("add_image_dialog");

    document.querySelector("#add_image_dialog .error_message").innerHTML = "";
}


function addNewImageToBoard() {

    let url = document.getElementById("img_url_input").value;

    if(URL.canParse(url)) {

        let data = localStorage.getItem(activeBoard + "-data");

        if(data != "") {
            data = JSON.parse(data);
            data.push(url);
        } else {
            data = [url];
        }

        localStorage.setItem(activeBoard + "-data", JSON.stringify(data));

        document.querySelector("#add_image_dialog input").value = "";

        openMoodboard(activeBoardNavItem, activeBoard);

        closeDialog();

    } else {
        
        document.querySelector("#add_image_dialog .error_message").innerHTML = "Not a valid URL.";

    }

}


// tooltips offset when scrolling:
var scroll_element = document.getElementsByClassName("moodboards")[0];
var tooltips = document.querySelectorAll(".tooltip");

scroll_element.addEventListener('scroll', (event) => {
    tooltips.forEach(tooltip => {
        tooltip.style.translate = "0px -" + scroll_element.scrollTop + "px"; 
    });
});