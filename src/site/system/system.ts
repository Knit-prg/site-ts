import { _Knit_ } from "/site/js/knit_base.js";
import { knitSystemCommands } from "./commands.js";
export const knitSystem = {
	interpreter: function (command) {
		let one_command = command.split(/(?<!\\);/);
		let result = "";
		for (let i = 0; i < one_command.length; i++) {
			if (one_command[i] != "") {
				try {
					let command_name = one_command[i].split(/(?<!\\):/)[0];
					command_name = knitSystem.number_to_name(command_name);
					one_command[i] = one_command[i].replace(/(?<!\\)(!before!)/, knitSystem.latest_result);
					knitSystem.latest_result = knitSystemCommands[command_name].run(one_command[i]);
					result += knitSystem.latest_result;
				} catch (e) {
					console.error(e);
					let l = knitSystem.lang;
					knitSystem.latest_result = `$red${l.error_undefined_command}:$bld${one_command[i].split(/(?<!\\):/)[0]}$nel`;
					result += knitSystem.latest_result;
				}
			}
		}
		return result;
	}
	, print: function (text, type, place) {
		switch (type) {
			case "html":
				let splited = text.split(/(?<!\\)(\$...)/);
				let final = "";
				let command_count = 0;
				for (let i = 0; i < splited.length; i++) {
					if (/(?<!\\)(\$...)/.test(splited[i])) {
						if (splited[i] == "$clr") {
							for (let i = 0; i < command_count; i++) { final += "</span>"; }
							command_count = 0;
						}
						else if (splited[i] == "$nel") {
							for (let i = 0; i < command_count; i++) { final += "</span>"; }
							command_count = 0;
							final += "<br>";
						}
						else {
							try {
								final += knitSystem.print_commands_html[splited[i]];
								command_count++;
							} catch (e) { }
						}
					}
					else {
						splited[i] = splited[i].replace(/\\\$/, "$");
						final += splited[i].replaceAll("<", "&lt;");
					}
				}
				for (let i = 0; i < command_count; i++) { final += "</span>"; }
				final = final.replace(/(https?:\/\/[\w!?=/+\-_~;.,*&@#$%()'[\]]+)/, "<a href='$1'>$1</a>");
				document.getElementById(place).insertAdjacentHTML("beforeend", final);
				window.scrollTo(0, document.body.scrollHeight)
				break;
			default:
				let e = new Error(`"${type}" is illigal argument for "type"`);
				console.error(e);
				break;
		}
	}
	, clear: function () {
		document.getElementById("output").innerHTML = "";
	}
	, exit: function () {
		location.href = "/site/";
	}
	, run: function (user, command) {
		knitSystem.print(`$bld${user}$clr>${command}$nel$bldDEFAULT_OUTPUT$clr>$nel`, "html", "output");
		knitSystem.print(knitSystem.interpreter(command), "html", "output");
	}
	, user: "USER_INPUT"
	, print_commands_html: {}
	, lang: {}
	, extension_lang: {}
	, now_lang: "ja_jp"
	, latest_result: ""
	, version: {}
	, command_number_table: {
		0: "version"
		, 1: "lang"
		, 2: "help"
		, 3: "extension"
		, 4: "clear"
		, 5: "exit"
	}
	, loaded: 0
	, load_extension: function (obj) {
		try {
			knitSystem.loaded_extensions[obj.name] = {
				remove: obj.remove
				, lang_url: obj.lang_url
			};
			knitSystemCommands = { ...knitSystemCommands, ...obj.commands };
			knitSystem.command_number_table = { ...knitSystem.command_number_table, ...obj.command_number_table };
			_Knit_.get(obj.lang_url.replace("*", knitSystem.now_lang), "json", {
				on_load: function (e) {
					if (e.srcElement.status == 200) {
						knitSystem.extension_lang[e.srcElement.response.extension_name] = e.srcElement.response;
					}
					else {
						knitSystem.print(`$bldSystem.load_extension$clr>${knitSystem.lang.error_failed2road_extension_lang}:${e.srcElement.responseURL}`, "html", "output");
					}
				}
			});
		} catch (e) {
			console.error(e);
			knitSystem.print(`$bldSYSTEM.load_extension$clr>${knitSystem.lang.error_run_extension_error}:${obj.name}`, "html", "output");
		}
	}
	, remove_extensions: function (name) {
		knitSystem.loaded_extensions[name].remove();
		delete knitSystem.loaded_extensions[name];
	}
	, loaded_extensions: {}
	, init_portion: function (url, variable) {
		_Knit_.get(url, "json", {
			on_load: function (e) {
				knitSystem[variable] = e.srcElement.response;
				knitSystem.loaded++;
				if (knitSystem.loaded == 3) {
					let run = function (e) {
						if (e.key == "Enter") {
							knitSystem.run(knitSystem.user, e.target.value);
							e.target.value = "";
						}
					}
					document.getElementById("input").addEventListener("keydown", run);
					knitSystem.run("SYSTEM", "version;");
				}
			}
		})
	}
	, init: function () {
		knitSystem.init_portion("data/system/print_commands_html.json", "print_commands_html");
		knitSystem.init_portion("data/lang/ja_jp.json", "lang");
		knitSystem.init_portion("data/system/version.json", "version");
	}
	, is_number: function (com_name) {
		let name = typeof knitSystemCommands[com_name] !== "undefined";
		let number = typeof knitSystem.command_number_table[com_name] !== "undefined";
		if ((name && !number) || (!name && !number) || (name && number)) { return false; }
		else { return true; }
	}
	, name_to_number: function (name) {
		let numbers = Object.keys(knitSystem.command_number_table);
		for (let i = 0; i < numbers.length; i++) {
			if (knitSystem.command_number_table[numbers[i]] === name) { return numbers[i]; }
		}
		return name;
	}
	, number_to_name: function (num) {
		if (typeof knitSystem.command_number_table[num] !== "undefined") { return knitSystem.command_number_table[num]; }
		else { return num; }
	}
};
