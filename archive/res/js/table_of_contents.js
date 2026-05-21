let main_headings = Array.from(document.getElementsByTagName("h2"));
//let sub_headings = document.getElementsByTagName("h3");

function scrollToHeading(event, id) {
    event.preventDefault();
    document.getElementById(id).scrollIntoView();
}

let table_html_id = "table_of_contents";
let toc = document.getElementById(table_html_id);
if(toc == null) {
    console.warn(`WARNING: No element with id '${table_html_id}' found.`);
} else {

    let title = document.createElement("span");
    title.classList.add("toc_title");
    title.innerHTML = "Table of Contents";
    toc.appendChild(title);

    let list = document.createElement("ul");
    main_headings.forEach((heading, i) => {

        let heading_id = heading.textContent.toLowerCase().replaceAll(" ", "_") + "_toc";
        heading.setAttribute("id", heading_id);

        let item = `<li><a href="" onclick="scrollToHeading(event, '${heading_id}')">${i+1}. ${heading.textContent}</a></li>`;
        list.insertAdjacentHTML("beforeend", item);

        //let item = document.createElement("li");
        //item.innerHTML = heading.innerHTML;
        //list.appendChild(item);
    });

    toc.appendChild(list);

}


