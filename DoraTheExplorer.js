var url = "http://10.3.117.4:8080/"


function setup() {
	loadDirectory(url, changeUrls);
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


function changeUrls() {
	var table = document.getElementById("tb");
	for (var i = 0; i < table.rows.length; i++) {
		var row = table.rows[i];
		if (row.getElementsByTagName("a").length !== 0) {
			var text = row.getElementsByTagName('a')[0].text;
			var link_cell = row.cells[0];
			link_cell.removeChild(link_cell.children[0]);
			var link = document.createElement("p");
			link.className = "links";
			link.textContent = text;
			link.onclick = function() {loadNewDirectory(this.textContent)}
			link_cell.appendChild(link);
		}
	}
}


function loadNewDirectory (dirctoryUrl) {
	url += dirctoryUrl;
	loadDirectory(url, changeUrls);
}