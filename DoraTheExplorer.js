var baseUrl = "http://10.3.117.4:8080/";
var url = baseUrl;


function setup() {
	loadDirectory(url, parsePage);
}


function parsePage() {
	var table = document.getElementById("tb");
	if (table) {
		parseLinksTable(table);
		createFatherDirectoryLink(table);
	}
	else {
		createFatherDirectoryLinkForFilePage();
	}
}


function loadDirectory(dirctoryUrl, functionAfterResponse) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			document.getElementById("content").innerHTML = xhttp.responseText;
			if (functionAfterResponse !== "") {
				functionAfterResponse();
			}
		}
	};
	xhttp.open("GET", dirctoryUrl, true);
	xhttp.send();
}


function changeUrl(row) {
	var text = row.getElementsByTagName('a')[0].text;
	var link_cell = row.cells[0];
	link_cell.removeChild(link_cell.children[0]);
	var link = document.createElement("p");
	link.className = "links";
	link.textContent = text;
	link.onclick = function() {loadNewDirectory(url + this.textContent)}
	link_cell.appendChild(link);
}


function addFavoriteCell(row) {
	var cell = row.insertCell(0);
}


function parseLinksTable(table) {
	for (var i = 0; i < table.rows.length; i++) {
		var row = table.rows[i];
		if (row.getElementsByTagName("a").length !== 0) {
			changeUrl(row);
			addFavoriteCell(row);
		}
	}
}


function loadNewDirectory (dirctoryUrl) {
	url = dirctoryUrl;
	loadDirectory(url, parsePage);
}


function createFatherDirectoryLink(table) {
	var row = table.insertRow(0);
	var link_cell = row.insertCell(0);
	var link = document.createElement("p");
	link.className = "links";
	link.textContent = "father directory";
	var link_text = url;
	if (url !== baseUrl) {
		var index = url.lastIndexOf("/", url.length - 2);
		link_text = url.substr(0, index + 1);
	}
	link.onclick = function() {loadNewDirectory(link_text)}
	link_cell.appendChild(link);
}


function createFatherDirectoryLinkForFilePage() {
	var table = document.createElement("table");
	createFatherDirectoryLink(table);
	var body = document.getElementById("content");
	body.appendChild(table);
}


function addToFavorites(row) {
	var table = document.getElementById("favorites");
	var table_row = table.insertRow(0);
	for (var i = 0; i < row.children.length; i++) {
		table_row.appendChild(row.children[i])
	}
}