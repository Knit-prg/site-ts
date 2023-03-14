import { _Knit_ } from "/site/js/knit_base.js";
let imitations_database = {
	data_list: {
		"SBAN": "全てあなたの所為です。"
	}
	, loaded: 0
}
let load = function () {
	let type = _Knit_.getPageOption("type");
	switch (type) {
		case "browse": {
			let result = "<h2>データベース化済すべあな模倣一覧</h2><ul>";
			let ids = Object.keys(imitations_database.data_list);
			for (let i = 0; i < ids.length; i++) {
				result += `<li><a href="?type=imitation&id=${ids[i]}">${imitations_database.data_list[ids[i]]}</a></li>`;
			}
			result += "</ul>"
			document.getElementById("_knit_content_wrapper")!.innerHTML = result;
		}
			break;
		case "imitation": {
			document.getElementById("_knit_content_wrapper")!.innerHTML = "<h3><a href='?type=browse'>戻る</a></h3>"
			_Knit_.get("data/" + _Knit_.getPageOption("id") + ".json", "json", {
				on_load: function (e: any) {
					if (e.srcElement.status == 200) {
						let result = "";
						let index = `
						読み込み完了(${e.total}バイト)
						<div>
							<ul class="_knit_table_of_contents">
								<div>目次</div>
								<li><a href="#name">名前</a></li>
								<li><a href="#author">作者</a></li>
								<li><a href="#songs">楽曲</a></li>
						`;
						let data = e.srcElement.response;
						let type = [];
						for (let i = 0; i < data.type.length; i++) {
							switch (data.type[i]) {
								case "original": type[i] = "オリジナル"; break;
								case "regular": type[i] = "定形模倣"; break;
								case "irregular": type[i] = "不定形模倣"; break;
								default: type[i] = data.type[i]; break;
							}
						}
						let url = [];
						for (let i = 0; i < data.url.length; i++) {
							url[i] = `<a href="${data.url[i]}">${data.url[i]}</a>`;
						}
						result += `
						<table border>
							<caption><a id="name">名前</a></caption>
							<tr><td>名称</td><td>${data.name.name.join("<br>")}</td></tr>
							<tr><td>URL</td><td>${url.join("<br>")}</td></tr>
							<tr><td colspan="2" class="center">以下の情報は非公式</td></tr>
							<tr><td>模倣ID</td><td>${_Knit_.getPageOption("id")}</td></tr>
							<tr><td>読み</td><td>${data.name.reading.join("<br>")}</td></tr>
							<tr><td>ローマ字</td><td>${data.name.reading_en.join("<br>")}</td></tr>
							<tr><td>直訳</td><td>${data.name.en.join("<br>")}</td></tr>
							<tr><td>略称</td><td>${data.name.abbreviation.join("<br>")}</td></tr>
							<tr><td>類型</td><td>${type.join("<br>")}</td></tr>
						</table>
						<table border>
							<caption><a id="author">作者</a></caption>
							<tr><td>名称</td><td>${data.author.name.join("<br>")}</td></tr>
							<tr><td colspan="2" class="center">以下の情報は非公式</td></tr>
							<tr><td>読み</td><td>${data.author.reading.join("<br>")}</td></tr>
							<tr><td>ローマ字</td><td>${data.author.reading_en.join("<br>")}</td></tr>
						</table>
						<h2><a id="songs">楽曲</a></h2>
						`;
						let songs_ids = Object.keys(data.songs);
						for (let i = 0; i < songs_ids.length; i++) {
							let song = data.songs[songs_ids[i]];
							let song_type = [];
							for (let j = 0; j < song.type.length; j++) {
								switch (song.type[j]) {
									case "dsc": song_type[j] = "DSC"; break;
									case "1": song_type[j] = "."; break;
									case "2": song_type[j] = ".."; break;
									case "kyoiku": song_type[j] = "教育"; break;
									case "abjet": song_type[j] = "アブジェ"; break;
									case "3": song_type[j] = "..."; break;
									case "omote": song_type[j] = "表"; break;
									case "ura": song_type[j] = "裏"; break;
									case "nanonai": song_type[j] = "名の無い"; break;
									case "n": song_type[j] = "エヌ"; break;
									case "short": song_type[j] = "short"; break;
									case "reversed": song_type[j] = "逆再生"; break;
									case "cxxxii": song_type[j] = "CXXXII"; break;
									case "irregular": song_type[j] = "特殊"; break;
									default: song_type[j] = song.type[j]; break;
								}
							}
							let song_released = [];
							for (let j = 0; j < song.released.length; j++) {
								let song_released_y = song.released[j].split("T")[0].split("-")[0];
								let song_released_mo = song.released[j].split("T")[0].split("-")[1];
								let song_released_d = song.released[j].split("T")[0].split("-")[2];
								let song_released_h = song.released[j].split("T")[1].split(":")[0]
								let song_released_mi = song.released[j].split("T")[1].split(":")[1];
								song_released[j] = `${song_released_y}年${song_released_mo}月${song_released_d}日${song_released_h}時${song_released_mi}分`;
							}
							let song_length = [];
							for (let j = 0; j < song.length.length; j++) {
								song_length[j] = (song.length[j] / 60).toFixed(0) + "分" + (song.length[j] % 60) + "秒";
							}
							let song_url = [];
							for (let j = 0; j < song.url.length; j++) {
								song_url[j] = `<a href="${song.url[j]}">${song.url[j]}</a>`;
							}
							result += `
							<h3><a id="songs_${songs_ids[i]}">${song.name.name.join(" , ")}</a></h3>
							<table border>
								<caption>${song.name.name.join(" , ")}</caption>
								<tr><td>名称</td><td>${song.name.name.join("<br>")}</td></tr>
								<tr><td>作曲者</td><td>${song.composer.join("<br>")}</td></tr>
								<tr><td>作詞者</td><td>${song.lyricist.join("<br>")}</td></tr>
								<tr><td>URL</td><td>${song_url.join("<br>")}</td></tr>
								<tr><td colspan="2" class="center">以下の情報は非公式計算</td></tr>
								<tr><td>公開日時</td><td>${song_released.join("<br>")}</td></tr>
								<tr><td>BPM</td><td>${song.bpm.join("<br>")}</td></tr>
								<tr><td>長さ</td><td>${song_length.join("<br>")}</td></tr>
								<tr><td>小節数</td><td>${song.bar_num.join("<br>")}</td></tr>
								<tr><td>調</td><td>${song.key.join("<br>")}</td></tr>
								<tr><td>short</td><td>${song.short.join("<br>")}</td></tr>
								<tr><td>long</td><td>${song.long.join("<br>")}</td></tr>
								<tr><td>別バージョン</td><td>${song.others.join("<br>")}</td></tr>
								<tr><td colspan="2" class="center">以下の情報は非公式</td></tr>
								<tr><td>楽曲ID</td><td>${songs_ids[i]}</td></tr>
								<tr><td>読み</td><td>${song.name.reading.join("<br>")}</td></tr>
								<tr><td>ローマ字</td><td>${song.name.reading_en.join("<br>")}</td></tr>
								<tr><td>直訳</td><td>${song.name.en.join("<br>")}</td></tr>
								<tr><td>略称</td><td>${song.name.abbreviation.join("<br>")}</td></tr>
								<tr><td>類型</td><td>${song_type.join("<br>")}</td></tr>
							</table>
							<h4>暗号</h4>
							`;
							if (song.cryptograph.length == 0) { result += "データ無し"; }
							for (let j = 0; j < song.cryptograph.length; j++) {
								let crypto_type = [];
								for (let k = 0; k < song.cryptograph[j].type.length; k++) {
									switch (song.cryptograph[j].type[k]) {
										case "qr-dsc": crypto_type[k] = "QRコード(DSC)"; break;
										case "reversedvoice-dsc": crypto_type[k] = "逆再生(DSC)"; break;
										case "notification-reversed": crypto_type[k] = "通知(◘)"; break;
										case "notificationsound-reversed": crypto_type[k] = "通知音(◘)"; break;
										case "lyric-reversed": crypto_type[k] = "歌詞(◘)"; break;
										case "morse-1": crypto_type[k] = "モールス(.)"; break;
										case "vertical-2": crypto_type[k] = "縦読み(..)"; break;
										case "morse-2": crypto_type[k] = "モールス(..)"; break;
										case "spectrogram-2": crypto_type[k] = "スペクトログラム(..)"; break;
										case "keyboard-kyoiku": crypto_type[k] = "鍵盤(教育)"; break;
										case "binary-abjet": crypto_type[k] = "二進数(アブジェ)"; break;
										case "trailer-abjet": crypto_type[k] = "予告(アブジェ)"; break;
										case "braille-3": crypto_type[k] = "点字(...)"; break;
										case "quaternary-3": crypto_type[k] = "四進数(...)"; break;
										case "maxheadroom-3": crypto_type[k] = "マックス・ヘッドルーム(...)"; break;
										case "grid-omote": crypto_type[k] = "格子(表)"; break;
										case "grid-ura": crypto_type[k] = "格子(裏)"; break;
										case "litmus-omote": crypto_type[k] = "リトマス(表)"; break;
										case "litmus-ura": crypto_type[k] = "リトマス(裏)"; break;
										case "dtmf-omote": crypto_type[k] = "DTMF(表)"; break;
										case "dtmf-ura": crypto_type[k] = "DTMF(裏)"; break;
										case "doubuelyric-nanonai": crypto_type[k] = "裏歌詞(名の無い)"; break;
										case "other": crypto_type[k] = "その他"; break;
										default: crypto_type[k] = song.cryptograph[j].type[k]; break;
									}
								}
								let decode_url = [];
								for (let k = 0; k < song.cryptograph[j].url.length; k++) {
									song_url[k] = `<a href="${song.cryptograph[j].url[k]}">${song.cryptograph[j].url[k]}</a>`;
								}
								result += `
								<table border>
									<tr><td>類型</td><td>${crypto_type.join(",")}</td></tr>
									<tr><td>第一解読者</td><td>${song.cryptograph[j].first_decoder.join("<br>")}</td></tr>
									<tr><td>解読動画</td><td>${decode_url.join("<br>")}</td></tr>
								</table>
								<div>暗号文:${song.cryptograph[j].ciphertext.text.join("<br>")}</div>
								<div class="small">${song.cryptograph[j].ciphertext.note.join("<br>")}</div>
								<div class="bold">解読方法</div>
								<div>${song.cryptograph[j].decode.join("<br>")}</div>
								<div>平文:${song.cryptograph[j].plaintext.join("<br>")}</div>
								`;
							}
							index += `<li><a class="indent" href="#songs_${songs_ids[i]}">${data.songs[songs_ids[i]].name.name.join(" , ")}</a></li>`;
						}
						document.getElementById("_knit_content_wrapper")!.innerHTML += index + "</ul></div>" + result;
					}
					else {
						document.getElementById("_knit_content_wrapper")!.innerHTML += `<h2>存在しない模倣ID(${_Knit_.getPageOption("id")})が入力されました。</h2>`;
					}
				}
			});
		}
			break;
		case "": default: location.search = "type=browse"; break;
	}
}
addEventListener("load", load);