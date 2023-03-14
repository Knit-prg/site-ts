const table = document.getElementById("main");
let authors = [];
let whole_data = [];
let d = document;
function data_processer() {
	let w = whole_data;
	const a = authors;
	const request = new XMLHttpRequest();
	request.open("GET", "https://sheets.googleapis.com/v4/spreadsheets/1RhIN7Pb6keFBT9QKm9bjGCrLcXPregUfuIL84izO6pU/values/sbm_sub2_user_database!B2:J?key=AIzaSyCso6tb_OZt75eQ7GrxnLJgMN_EOKdqnbA");
	request.responseType = "json";
	d.getElementById("progress").innerText = "追加データ読込中";
	request.onload = function () {
		let additional_data = request.response.values;
		d.getElementById("user_update_time").innerText = additional_data[0][8]
		let add_i;
		let date_i;
		for (let i = 0; i < additional_data.length; i++) {
			if (additional_data[i][7] != "TRUE") {
				add_i = new Array(11);
				if (additional_data[i][0] != "") {
					date_i = new Date(additional_data[i][0]);
					add_i[0] = date_i.getFullYear();
					add_i[1] = date_i.getMonth() + 1;
					add_i[2] = date_i.getDate();
					add_i[3] = date_i.getHours();
					add_i[4] = date_i.getMinutes();
				}
				add_i[5] = additional_data[i][1];
				add_i[6] = additional_data[i][2];
				switch (additional_data[i][3]) {
					case "通常公開": add_i[7] = "normal"; break;
					case "プレミア公開": add_i[7] = "premiere"; break;
					case "生放送": add_i[7] = "live"; break;
					default: add_i[7] = additional_data[i][3]; break;
				}
				add_i[8] = additional_data[i][4];
				switch (add_i[8]) {
					case "youtube":
						if (/(\d|\w|\-){11}/.test(additional_data[i][5])) { add_i[9] = additional_data[i][5].match(/(\d|\w|\-){11}/)[0]; }
						else { add_i[9] = addiional_data[i][5]; }
						break;
					default: add_i[9] = additional_data[i][5]; break;
				}
				switch (add_i[9]) {
					case "すべあな模倣系": add_i[10] = "imitation"; break;
					case "ネタ系": add_i[10] = "joke"; break;
					case "その他": add_i[10] = "other"; break;
					default: add_i[10] = ""; break;
				}
				add_i[11] = "additional";
				whole_data.push(add_i);
			}
		}
		let this_date;
		let before_date;
		for (let i = 0; i < w.length; i++) {
			if (!a.some(item => item == w[i][6]) && w[i][6] != "反映されていません") {
				authors.push(w[i][6]);
			}
			if (w[i][8] == "youtube" && w[i][9].length != 11) {
			}
		}
		a.sort();
		for (let i = 0; i < a.length; i++) {
			d.getElementById("author_name").insertAdjacentHTML("beforeend", "<option id='author_select_" + a[i] + "'value='" + a[i] + "'>" + a[i] + "</option>");
		}
		if (whole_data[8][11] != -1) {
		}
		display();
	}
	request.send();
}
d.getElementById("release_time_is_now").onclick = function () {
	const is_now = d.getElementById("release_time_is_now");
	const from = d.getElementById("release_time_from");
	if (is_now.checked) { from.disabled = true; }
	else { from.disabled = false; }
}
function make_table(data) {
	for (let i = 0; i < data.length; i++) {
		try { data[i][12] = new Date(data[i][0], data[i][1] - 1, data[i][2].slice(-1) == "?" ? data[i][2].slice(0, -1) : data[i][2], data[i][3].slice(-1) == "?" ? data[i][3].slice(0, -1) : data[i][3], data[i][4].slice(-1) == "?" ? data[i][4].slice(-1) : data[i][4]); }
		catch (e) { data[i][12] = new Date(data[i][0], data[i][1] - 1, data[i][2], data[i][3], data[i][4]); }
	}
	let start = new Date();
	let fragment = document.createDocumentFragment();
	let table = d.createElement("table");
	fragment.appendChild(table);
	let th = table.insertRow(-1);
	let th_y = d.createElement("th");
	th_y.appendChild(d.createTextNode("年"));
	th.appendChild(th_y);
	let th_mo = d.createElement("th");
	th_mo.appendChild(d.createTextNode("月"));
	th.appendChild(th_mo);
	let th_d = d.createElement("th");
	th_d.appendChild(d.createTextNode("日"));
	th.appendChild(th_d);
	let th_h = d.createElement("th");
	th_h.appendChild(d.createTextNode("時"));
	th.appendChild(th_h);
	let th_mi = d.createElement("th");
	th_mi.appendChild(d.createTextNode("分"));
	th.appendChild(th_mi);
	let th_title = d.createElement("th");
	th_title.appendChild(d.createTextNode("表題"));
	th.appendChild(th_title);
	let th_channel = d.createElement("th");
	th_channel.appendChild(d.createTextNode("公開チャンネル"));
	th.appendChild(th_channel);
	let th_type = d.createElement("th");
	th_type.appendChild(d.createTextNode("公開種別"));
	th.appendChild(th_type);
	let th_url = d.createElement("th");
	th_url.appendChild(d.createTextNode("URL"));
	th.appendChild(th_url);
	let row_i
		, y_cell, mo_cell, d_cell, h_cell, mi_cell, title_cell, channel_cell, type_cell, url_cell
		, y_div, mo_div, d_div, h_div, mi_div, title_div, channel_div, type_div, url_div
		, y_span, mo_span, d_span, h_span, mi_span, title_span, channel_span, type_span, url_span
		, y, mo, da, h, mi, channel, type, type_text, url, url_a, url_text
		, time_i, time_next, time_before, time_rowspan
		, channel_rowspan
		, before_row
		, space_row;
	for (let i = 0; i < data.length; i++) {
		row_i = table.insertRow(-1);
		switch (data[i][10]) {
			case "imitation": row_i.classList.add("imitation"); break;
			case "joke": row_i.classList.add("joke"); break;
			case "decoding": row_i.classList.add("decoding"); break;
			case "other": row_i.classList.add("other"); break;
		}
		try {//次の項目と同一時刻でなければ後に空白を挿入
			if (data[i + 1][12] - data[i][12] != 0) {
				space_row = table.insertRow(-1);
				space_row.style.height = Math.log10((time_next - time_i) / 900000) + "em";
			}
		} catch { }
		try {//前の項目と同一時刻でなければ時刻を表示
			if (data[i][12] - data[i - 1][12] != 0) {
				y_cell = row_i.insertCell(-1);
				y_div = d.createElement("div");
				y_span = d.createElement("span");
				y = d.createTextNode(data[i][0]);
				y_cell.appendChild(y_div);
				y_div.appendChild(y_span);
				y_span.appendChild(y);
				y_cell.classList.add("right_none");
				y_div.classList.add("date_div");
				y_div.classList.add("shorten");
				mo_cell = row_i.insertCell(-1);
				mo_div = d.createElement("div");
				mo_span = d.createElement("span");
				mo = d.createTextNode(data[i][1]);
				mo_cell.appendChild(mo_div);
				mo_div.appendChild(mo_span);
				mo_span.appendChild(mo);
				mo_cell.classList.add("left_none");
				mo_cell.classList.add("right_none");
				mo_div.classList.add("date_div");
				mo_div.classList.add("shorten");
				d_cell = row_i.insertCell(-1);
				d_div = d.createElement("div");
				d_span = d.createElement("span");
				da = d.createTextNode(data[i][2]);
				d_cell.appendChild(d_div);
				d_div.appendChild(d_span);
				d_span.appendChild(da);
				d_cell.classList.add("left_none");
				d_cell.classList.add("right_none");
				d_div.classList.add("date_div");
				d_div.classList.add("shorten");
				h_cell = row_i.insertCell(-1);
				h_div = d.createElement("div");
				h_span = d.createElement("span");
				h = d.createTextNode(data[i][3]);
				h_cell.appendChild(h_div);
				h_div.appendChild(h_span);
				h_span.appendChild(h);
				h_cell.classList.add("left_none");
				h_div.classList.add("date_div");
				h_div.classList.add("shorten");
				h_cell.classList.add("right_none");
				mi_cell = row_i.insertCell(-1);
				mi_div = d.createElement("div");
				mi_span = d.createElement("span");
				mi = d.createTextNode(data[i][4]);
				mi_cell.appendChild(mi_div);
				mi_div.appendChild(mi_span);
				mi_span.appendChild(mi);
				mi_cell.classList.add("left_none");
				mi_div.classList.add("date_div");
				mi_div.classList.add("shorten");
			}
		} catch {
			if (i == 0) {
				y_cell = row_i.insertCell(-1);
				y_div = d.createElement("div");
				y_span = d.createElement("span");
				y = d.createTextNode(data[i][0]);
				y_cell.appendChild(y_div);
				y_div.appendChild(y_span);
				y_span.appendChild(y);
				y_cell.classList.add("right_none");
				y_div.classList.add("date_div");
				y_div.classList.add("shorten");
				mo_cell = row_i.insertCell(-1);
				mo_div = d.createElement("div");
				mo_span = d.createElement("span");
				mo = d.createTextNode(data[i][1]);
				mo_cell.appendChild(mo_div);
				mo_div.appendChild(mo_span);
				mo_span.appendChild(mo);
				mo_cell.classList.add("left_none");
				mo_cell.classList.add("right_none");
				mo_div.classList.add("date_div");
				mo_div.classList.add("shorten");
				d_cell = row_i.insertCell(-1);
				d_div = d.createElement("div");
				d_span = d.createElement("span");
				da = d.createTextNode(data[i][2]);
				d_cell.appendChild(d_div);
				d_div.appendChild(d_span);
				d_span.appendChild(da);
				d_cell.classList.add("left_none");
				d_cell.classList.add("right_none");
				d_div.classList.add("date_div");
				d_div.classList.add("shorten");
				h_cell = row_i.insertCell(-1);
				h_div = d.createElement("div");
				h_span = d.createElement("span");
				h = d.createTextNode(data[i][3]);
				h_cell.appendChild(h_div);
				h_div.appendChild(h_span);
				h_span.appendChild(h);
				h_cell.classList.add("left_none");
				h_div.classList.add("date_div");
				h_div.classList.add("shorten");
				h_cell.classList.add("right_none");
				mi_cell = row_i.insertCell(-1);
				mi_div = d.createElement("div");
				mi_span = d.createElement("span");
				mi = d.createTextNode(data[i][4]);
				mi_cell.appendChild(mi_div);
				mi_div.appendChild(mi_span);
				mi_span.appendChild(mi);
				mi_cell.classList.add("left_none");
				mi_div.classList.add("date_div");
				mi_div.classList.add("shorten");
			}
		}
		try {//次の項目と同一時刻ならば続く行と結合
			if (data[i + 1][12] - data[i][12] == 0 && data[i][12] - data[i - 1][12] != 0) {
				time_rowspan = 0;
				let next_time = data[i + 1][12];
				while (data[i + time_rowspan][12] - data[i][12] == 0) {
					if (i + time_rowspan == data.length - 1) { break; }
					time_rowspan++;
				}
				y_cell.rowSpan = time_rowspan;
				y_cell.classList.add("bold");
				mo_cell.rowSpan = time_rowspan;
				mo_cell.classList.add("bold");
				d_cell.rowSpan = time_rowspan;
				d_cell.classList.add("bold");
				h_cell.rowSpan = time_rowspan;
				h_cell.classList.add("bold");
				mi_cell.rowSpan = time_rowspan;
				mi_cell.classList.add("bold");
			}
		} catch {
			try {
				if (data[i + 1][12] - data[i][12] == 0 && i == 0) {
					time_rowspan = 0;
					while (data[i + time_rowspan][12] - data[i][12] == 0) {
						if (i + time_rowspan == data.length - 1) { break; }
						time_rowspan++;
					}
					y_cell.rowSpan = time_rowspan;
					y_cell.classList.add("bold");
					mo_cell.rowSpan = time_rowspan;
					mo_cell.classList.add("bold");
					d_cell.rowSpan = time_rowspan;
					d_cell.classList.add("bold");
					h_cell.rowSpan = time_rowspan;
					h_cell.classList.add("bold");
					mi_cell.rowSpan = time_rowspan;
					mi_cell.classList.add("bold");
				}
			} catch { }
		}
		title_cell = row_i.insertCell(-1);
		title_div = d.createElement("div");
		title_span = d.createElement("span");
		title_span.innerHTML = data[i][5];
		title_cell.appendChild(title_div);
		title_div.appendChild(title_span);
		title_div.classList.add("title_div");
		title_div.classList.add("shorten");
		try {//前の項目と同一チャンネルでなければチャンネルを表示
			if (data[i][6] != data[i - 1][6]) {
				channel_cell = row_i.insertCell(-1);
				channel_div = d.createElement("div");
				channel_span = d.createElement("span");
				channel = d.createTextNode(data[i][6]);
				channel_cell.appendChild(channel_div);
				channel_div.appendChild(channel_span);
				channel_span.appendChild(channel);
				channel_div.classList.add("channel_div");
				channel_div.classList.add("shorten");
			}
		} catch {
			if (i == 0) {
				channel_cell = row_i.insertCell(-1);
				channel_div = d.createElement("div");
				channel_span = d.createElement("span");
				channel = d.createTextNode(data[i][6]);
				channel_cell.appendChild(channel_div);
				channel_div.appendChild(channel_span);
				channel_span.appendChild(channel);
				channel_div.classList.add("channel_div");
				channel_div.classList.add("shorten");
			}
		}
		try {//次の項目と同一チャンネルならば続く行と結合
			if (data[i][6] == data[i + 1][6] && data[i][6] != data[i - 1][6]) {
				channel_rowspan = 0;
				before_row = 0;
				while (data[i][6] == data[i + channel_rowspan][6]) {
					if (i + channel_rowspan == data.length - 1) {
						if (data[i][6] == data[i + channel_rowspan][6]) { channel_rowspan++; }
						break;
					}
					if (data[i][12] - data[i + channel_rowspan][12] != 0) {
						before_row++;
					}
					channel_rowspan++;
				}
				channel_cell.rowSpan = channel_rowspan + before_row;
				channel_cell.classList.add("bold");
			}
		} catch {
			try {
				if (data[i][6] == data[i + 1][6] && i == 0) {
					channel_rowspan = 0;
					before_row = 0;
					while (data[i][6] == data[i + channel_rowspan][6]) {
						if (i + channel_rowspan == data.length - 1) {
							if (data[i][6] == data[i + channel_rowspan][6]) { channel_rowspan++; }
							break;
						}
						if (data[i][12] - data[i + channel_rowspan][12] != 0) {
							before_row++;
						}
						channel_rowspan++;
					}
					channel_cell.rowSpan = channel_rowspan + before_row + 2;
					channel_cell.classList.add("bold");
				}
			} catch { }
		}
		switch (data[i][7]) {
			case "normal":
				type_text = "通常公開";
				break;
			case "premiere":
				type_text = "プレミア公開";
				break;
			case "live":
				type_text = "生放送";
				break;
			default:
				type_text = "不明";
				break;
		}
		type_cell = row_i.insertCell(-1);
		type_div = d.createElement("div");
		type_span = d.createElement("span");
		type = d.createTextNode(type_text);
		type_cell.appendChild(type_div);
		type_div.appendChild(type_span);
		type_span.appendChild(type);
		type_div.classList.add("type_div");
		type_div.classList.add("shorten");
		switch (data[i][8]) {
			case "youtube":
				url = "https://youtu.be/" + data[i][9];
				break;
			default:
				url = "";
				break;
		}
		url_cell = row_i.insertCell(-1);
		url_div = d.createElement("div");
		url_span = d.createElement("span");
		url_a = d.createElement("a");
		url_cell.appendChild(url_div);
		url_div.appendChild(url_span);
		url_span.appendChild(url_a);
		url_div.classList.add("url_div");
		url_div.classList.add("shorten");
		url_a.href = url;
		url_a.appendChild(d.createTextNode(url));
	}
	return fragment;
}
function display() {
	const display_start = new Date();
	const condition_raw = location.search.substr(1).split("&");
	let condition = {
		release_time_from: 0
		, release_time_to: 0
		, author_names: []
		, release_types: []
		, genres: []
	};
	let split_temp = "";
	let key = "";
	let value = "";
	let temp = "";
	let date = [];
	let time = [];
	let raw_l = condition_raw.length;
	for (let i = 0; i < raw_l; i++) {
		split_temp = condition_raw[i].split("=");
		key = split_temp[0];
		value = split_temp[1];
		switch (key) {
			case "release_time_from":
				if (value == "") { break; }
				else if (value == "now") {
					let time_regulation = ((-540) - (new Date().getTimezoneOffset())) * 60 * 1000;
					condition.release_time_from = new Date(new Date() - time_regulation);
					d.getElementById("release_time_is_now").checked = true;
					d.getElementById("release_time_from").disabled = true;
				}
				else {
					temp = value.split("T");
					date = temp[0].split("-");
					time = temp[1].split("%3A");
					for (let j = 0; j < date.length; j++) { date[j] = Number(date[j]); }
					for (let j = 0; j < time.length; j++) { time[j] = Number(time[j]); }
					condition.release_time_from = new Date(date[0], date[1] - 1, date[2], time[0], time[1]);
					d.getElementById("release_time_from").value = value.replace("%3A", ":");
				}
				break;
			case "release_time_to":
				if (value == "") { break; }
				temp = value.split("T");
				date = temp[0].split("-");
				time = temp[1].split("%3A");
				for (let j = 0; j < date.length; j++) { date[j] = Number(date[j]); }
				for (let j = 0; j < time.length; j++) { time[j] = Number(time[j]); }
				condition.release_time_to = new Date(date[0], date[1] - 1, date[2], time[0], time[1]);
				d.getElementById("release_time_to").value = value.replace("%3A", ":");
				break;
			case "author_name":
				condition.author_names.push(decodeURI(value).replaceAll("+", " ").replace("%2F", "/"));
				d.getElementById("author_select_" + decodeURI(value).replaceAll("+", " ").replaceAll("%2F", "/")).selected = true;
				break;
			case "release_type":
				condition.release_types.push(value);
				d.getElementById("release_type_" + value).checked = true;
				break;
			case "genre":
				condition.genres.push(value);
				d.getElementById("genre_" + value).checked = true;
				break;
		}
	}
	if (condition.release_time_from != 0 && condition.release_time_to != 0 && condition.release_time_from > condition.release_time_to) {
		condition.release_time_from = 0;
		condition.release_time_to = 0;
	}
	let data = whole_data.concat();
	if (condition.release_time_from != 0) {
		let data_i;
		for (let i = 0; i < data.length; i++) {
			data_i = data[i];
			if (condition.release_time_from.getTime() > new Date(data_i[0], data_i[1] - 1, data_i[2], data_i[3], data_i[4]).getTime()) {
				data.splice(i, 1);
				i--;
			}
			else if (new Date(data_i[0], data_i[1] - 1, data_i[2], data_i[3], data_i[4]).toString() == "Invalid Date") {
				data.splice(i, 1);
				i--;
			}
		}
	}
	if (condition.release_time_to != 0) {
		let data_i;
		for (let i = 0; i < data.length; i++) {
			data_i = data[i];
			if (condition.release_time_to.getTime() < new Date(data_i[0], data_i[1] - 1, data_i[2], data_i[3], data_i[4]).getTime()) {
				data.splice(i, 1);
				i--;
			}
			else if (new Date(data_i[0], data_i[1] - 1, data_i[2], data_i[3], data_i[4]).toString() == "Invalid Date") {
				data.splice(i, 1);
				i--;
			}
		}
	}
	let data_1 = [];
	if (condition.author_names.length != 0) {
		let data_i;
		for (let i = 0; i < data.length; i++) {
			data_i = data[i];
			for (let j = 0; j < condition.author_names.length; j++) {
				if (data_i[6] == condition.author_names[j]) {
					data_1.push(data_i);
					break;
				}
			}
		}
	}
	else { data_1 = data; }
	let data_2 = [];
	if (condition.release_types.length != 0) {
		for (let i = 0; i < data_1.length; i++) {
			for (let j = 0; j < condition.release_types.length; j++) {
				if (data_1[i][7] == condition.release_types[j]) {
					data_2.push(data_1[i]);
					break;
				}
			}
		}
	}
	else { data_2 = data_1; }
	let data_3 = [];
	let i_genre = "";
	if (condition.genres.length != 0) {
		for (let i = 0; i < data_2.length; i++) {
			if (data_2[i][10] == undefined) { data_2[i][10] = "other" }
			else {
				switch (data_2[i][10]) {
					case "other": i_genre = "other"; break;
					case "imitation": i_genre = "imitation"; break;
					case "decoding": i_genre = "decoding"; break;
					case "joke": i_genre = "joke"; break;
					default: i_genre = "other"; break;
				}
			}
			for (let j = 0; j < condition.genres.length; j++) {
				if (i_genre == condition.genres[j]) {
					data_3.push(data_2[i]);
					break;
				}
			}
		}
	}
	else { data_3 = data_2; }
	d.getElementById("number").innerText = data_3.length;
	d.getElementById("table_display").appendChild(make_table(data_3));
	if (location.search == "?release_time_from=&release_time_to=" || location.search == "?release_time_to=") { history.replaceState("", "", location.pathname); }
	else if (location.search == "?release_time_from=now&release_time_to=") { history.replaceState("", "", location.pathname + "?release_time_from=now"); }
	d.getElementById("display_time").innerText = (new Date() - display_start) / 1000;
	shorten();
}
function shorten() {
	const shorten_start = new Date();
	d.getElementById("progress").innerText = "表示調整中";
	let html = d.getElementById("table_display").children[0].cloneNode(true);
	let list = html.getElementsByClassName("shorten");
	let list_ = d.getElementById("table_display").children[0].getElementsByClassName("shorten");
	let div, span, result
	let style = "";
	for (let i = 0; i < list.length; i++) {
		list[i].removeAttribute("style");
		div = list_[i].offsetWidth;
		span = list_[i].children[0].offsetWidth;
		result = div / span;
		if (result < 1) {
			list[i].style.transform = "scaleX(" + result + ")";
		}
	}
	d.getElementById("table_display").removeChild(d.getElementById("table_display").firstElementChild)
	d.getElementById("table_display").appendChild(html);
	d.getElementById("progress").innerText = "完了";
	d.getElementById("shorten_time").innerText = (new Date() - shorten_start) / 1000;
}
