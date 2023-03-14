import { _Knit_ } from "/site/js/knit_base.js";
import { knitSystem } from "./system.js";
export const knitSystemCommands = {
	clear: {
		run: function (arg) {
			knitSystem.clear();
			return `${knitSystem.lang.command_clear_cleared}$nel`;
		}
		, help: function (arg) {
			return knitSystem.lang.command_clear_help;
		}
	}
	, exit: {
		run: function (arg) {
			knitSystem.print(knitSystem.lang.command_exit_exiting, "html", "output");
			knitSystem.exit();
			return "";
		}
		, help: function (arg) {
			return knitSystem.lang.command_exit_help;
		}
	}
	, extension: {
		run: function (arg) {
			let splited = arg.split(/(?<!\\):/);
			if (splited.length <= 1) {
				return `$red${knitSystem.lang.command_extension_no_arg}$clr$nel${knitSystem.lang.command_extension_help_long}$nel`;
			}
			switch (splited[1]) {
				case "add": case "0": {
					if (splited.length <= 2) { return `$red${knitSystem.lang.command_extension_add_unset_filename}$nel`; }
					_knit.get(splited[2], "text", {
						on_load: function (e) {
							if (e.srcElement.status == 200) {
								let content = e.srcElement.response;
								content.replace(/document\.write\(.+\);?/, "");
								content.replace("innerText", "");
								content.replace("innerHTML", "");
								content.replace("insertAdjacentHTML", "");
								knitSystem.commands.extension.holding.push({ url: e.srcElement.responseURL, content: content });
								knitSystem.print(`$bldSYSTEM.commands.extension$clr>${knitSystem.lang.command_extension_add_do_run}$nel`, "html", "output");
							}
							else {
								knitSystem.print(`$bldSYSTEM.commands.extension$clr>$red${knitSystem.lang.command_extension_add_no_file}:$bld${splited[2]}$nel`, "html", "output");
							}
						}
					});
					return `${knitSystem.lang.command_extension_add_loading}$nel`;
				}
					break;
				case "remove": case "1": {
					if (splited.length <= 2) { return `$red${knitSystem.lang.command_extension_no_arg}$clr$nel`; }
					try {
						knitSystem.remove_extensions(splited[2]);
						return `${knitSystem.lang.command_extension_removed}$nel`;
					} catch (e) {
						return `$red${knitSystem.lang.command_extension_failed2remove}$clr$nel`;
					}
				}
					break;
				case "holdings": case "2": {
					let listed = `${knitSystem.lang.command_extension_holding_list}$nel`;
					for (let i = 0; i < knitSystem.commands.extension.holding.length; i++) {
						listed += `${knitSystem.commands.extension.holding[i].url}$nel`;
					}
					return listed;
				}
					break;
				case "run": case "3": {
					let result = `${knitSystem.lang.command_extension_run}$nel`;
					for (let i = 0; i < knitSystem.commands.extension.holding.length; i++) {
						new Function(knitSystem.commands.extension.holding[i].content)();
						result += `${knitSystem.commands.extension.holding[i].url}$nel`;
					}
					knitSystem.commands.extension.holding = [];
					return result;
				}
					break;
				case "ignore": case "4": {
					knitSystem.commands.extension.holding = [];
					return `${knitSystem.lang.command_extension_ignored}$nel`;
				}
					break;
				case "list": case "5": {
					let extensions = Object.keys(knitSystem.loaded_extensions);
					let listed = knitSystem.lang.command_extension_list;
					for (let i = 0; i < extensions.length; i++) {
						listed += `$nel${extensions[i]}`;
					}
					return `${listed}$nel`;
				}
				default: return `$red${knitSystem.lang.command_extension_illegal_arg}:${splited[1]}$clr$nel`; break;
			}
		}
		, help: function (arg) {
			switch (arg) {
				case 0: return knitSystem.lang.command_extension_help_short; break;
				case 1: return knitSystem.lang.command_extension_help_long; break;
			}
		}
		, holding: []
	}
	, help: {
		run: function (arg) {
			let splited = arg.split(/(?<!\\):/);
			if (splited.length <= 1) {
				let helps = `$bld${knitSystem.lang.command_help_list}$clr$nel`;
				let commands = Object.keys(knitSystem.commands);
				for (let i = 0; i < commands.length; i++) {
					helps += `${commands[i]}${knitSystem.lang.command_help_or}${knitSystem.name_to_number(commands[i])}:${knitSystem.commands[commands[i]].help(0)}$clr$nel`;
				}
				return helps;
			}
			else {
				try {
					return `$bld${knitSystem.number_to_name(splited[1])}$clr${knitSystem.lang.command_help_command}$nel${knitSystem.commands[knitSystem.number_to_name(splited[1])].help(1)}$clr$nel`;
				} catch (e) {
					return `$red${knitSystem.lang.command_help_undefined_command}:${splited[1]}$clr$nel`;
				}
			}
		}
		, help: function (arg) {
			switch (arg) {
				case 0: return knitSystem.lang.command_help_help_short;
				case 1: return knitSystem.lang.command_help_help_long;
			}
		}
	}
	, lang: {
		run: function (arg) {
			let l = knitSystem.lang;
			let splited = arg.split(/(?<!\\):/);
			if (splited.length <= 1) {
				let now_lang_to_display = knitSystem.now_lang;
				try {
					switch (knitSystem.now_lang) {
						case "ja_jp": now_lang_to_display = l.command_lang_ja_jp; break;
						case "en_us": now_lang_to_display = l.command_lang_en_us; break;
					}
				} catch (e) { }
				if (now_lang_to_display == undefined) { now_lang_to_display = knitSystem.now_lang; }
				return `${l.command_lang_now_lang}:${now_lang_to_display}$nel`;
			}
			else if (splited[1] == "set" || splited[1] == "0") {
				switch (splited[2]) {
					case "0": splited[2] = "ja_jp"; break;
					case "1": splited[2] = "en_us"; break;
				}
				_knit.get(`data/lang/${splited[2]}.json`, "json", {
					on_load: function (e) {
						if (e.srcElement.response == null) {
							knitSystem.print(`$bldSYSTEM.commands.lang$clr>$red${l.command_lang_undefined}:$bld${splited[2]}$nel`, "html", "output");
						}
						else {
							knitSystem.lang = { ...knitSystem.lang, ...e.srcElement.response };
							knitSystem.print(`$bldSYSTEM.commands.lang$clr>${l.command_lang_loaded}:$bld${splited[2]}$clr.json$nel`, "html", "output");
						}
					}
				});
				let extensions = Object.keys(knitSystem.loaded_extensions);
				for (let i = 0; i < extensions.length; i++) {
					_knit.get(knitSystem.loaded_extensions[extensions[i]].lang_url.replace("*", splited[2]), "json", {
						on_load: function (e) {
							if (e.srcElement.response == null) {
								knitSystem.print(`$bldSYSTEM.commands.lang$clr>$red${l.command_lang_undefined}:$bld${e.srcElement.responseURL}$clr$nel`, "html", "output");
							}
							else {
								knitSystem.extension_lang[e.srcElement.response.extension_name] = { ...knitSystem.extension_lang[e.srcElement.response.extension_name], ...e.srcElement.response };
								knitSystem.print(`$bldSYSTEM.commands.lang$clr>${l.command_lang_loaded}:$bld${e.srcElement.responseURL}$clr$nel`, "html", "output");
							}
						}
					});
				}
				return `${l.command_lang_loading}:$bld${splited[2]}$clr.json$nel`;
			}
			return `$red${l.command_lang_error}$nel`;
		}
		, help: function (arg) {
			switch (arg) {
				case 0: return knitSystem.lang.command_lang_help_short;
				case 1: return knitSystem.lang.command_lang_help_long;
			}
		}
	}
	, version: {
		run: function (arg) {
			let l = knitSystem.lang;
			let v = knitSystem.version;
			return `${l.command_version_name}:${v.name}$nel
			${l.command_version_version}:${v.version}$nel
			${l.command_version_author}:${v.author}$nel
			${l.command_version_birthday}:${v.birthday}$nel
			${l.command_version_updated}:${v.updated}$nel`;
		}
		, help: function (arg) {
			return knitSystem.lang.command_version_help;
		}
	}
}
