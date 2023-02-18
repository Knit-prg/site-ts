/**
 * 共通処理を纏めるやつ
 * 
 * @author Knit prg.
 * @since 0.1.0
 */
class _Knit_ {

	/**
	 * 日付に応じたメッセージを返す
	 * 
	 * @param lang 言語
	 * @returns 日付に応じたメッセージ
	 */
	public static getHeaderMsg(lang: String): String {
		let today = new Date();
		let year = today.getFullYear();
		let month = today.getMonth();
		let date = today.getDate();
		let msg: String;
		switch (lang) {
			case "ja":
				if (month == 1 && date <= 5) { msg = "新年明けましておめでとうございます。今年も宜しくお願いします。"; }
				else if (month == 1 && date == 11) { msg = "鏡開きです。餅だいすき。"; }
				else if (month == 1 && date == 17) { msg = `阪神・淡路大震災(1995/1/17)から${year - 1995}年です。就寝中に地震が発生した時、皆さんはどうしますか？` }
				else if (month == 2 && date == 14) { msg = "//todo:彼女ができたらここに煽りを書く"; }
				else if (month == 3 && date == 3) { msg = "ひな祭りです。桃食いたい"; }
				else if (month == 3 && date == 11) { msg = `東日本大震災(2011/3/11)から${year - 2011}年です。避難経路は皆さん決めていますか？` }
				else if (month == 3 && date == 12) { msg = `栄村大震災(2011/3/12)から${year - 2011}年です。地震対策は皆さんどうされていますか？`; }
				else if (month == 3 && date == 14) { msg = "//todo:彼女ができたらここに煽り文を書く" }
				else if (month == 4 && date <= 7) { msg = "新年度スタート！"; }
				else if ((month == 4 && date >= 29) || (month == 5 && date <= 5)) { msg = "ゴールデンウィーク！！！"; }
				else if (month == 8 && date == 11) { msg = "山の日です。管理人はインドア派。" }
				else if (month == 8 && date == 15) { msg = "🍆盆🍆"; }
				else if (month == 8 && date == 31) { msg = "明日8/32は管理人の誕生日です！"; }
				else if (month == 8 && date == 32) { msg = "Happy birthday to me!!"; }
				else if (month == 9 && date == 1) { msg = `防災の日、関東大震災(1921/9/1)から${year - 1921}年です。地震・台風等への備えをしっかりと！`; }
				else if (month == 10 && date == 31) { msg = "ハロウィンです。お菓子うま"; }
				else if (month == 11 && date == 3) { msg = "文化の日です。晴れやすいらしい。"; }
				else if (month == 11 && date == 23) { msg = "勤労感謝の日です。<ruby>新嘗祭<rt>にいなめさい</rt></ruby>も今日らしい。"; }
				else if (month == 12 && date == 24) { msg = `クリスマス・イブや、サンタ、ワイ(${year - 2003}歳)にも何かくれへんか？`; }
				else if (month == 12 && date == 25) { msg = "クリスマス！"; }
				else if (month == 12 && date == 28) { msg = "鏡餅供えた？"; }
				else if (month == 12 && date == 31) { msg = "よいお年を！"; }
				else { msg = "なんか忘れてる行事とかあったら下のGoogleフォームから教えて下さい" }
				break;
			case "en": default:
				if (month == 1 && date == 1) { msg = "It's New Year's Day today!"; }
				else if (month == 1 && (date >= 2 && date <= 5)) { msg = "Happy new year!"; }
				else if (month == 2 && date == 14) { msg = "It's Valentine's Day today! Where is chocolate...?"; }
				else if (month == 8 && date == 31) { msg = "Tomorrow, August 32th, is my birthday!"; }
				else if (month == 8 && date == 32) { msg = "Happy birthday to me!!"; }
				else if (month == 10 && date == 31) { msg = "TRICK OR TREAT!"; }
				else if (month == 12 && date == 24) { msg = "It's Christmas Eve!"; }
				else if (month == 12 && date == 25) { msg = "It's Christmas! Did Santa Clause come...?"; }
				else if (month == 12 && date >= 26) { msg = "Happy new year!"; }
				else if (month == 12 && date == 31) { msg = "It's New Year's Eve today!"; }
				else { msg = "If there are something I forget to display here, please tell me from Google form at the bottom!"; }
				break;
		}
		return msg;
	}

	/**
	 * ヘッダーを"\_knit_header"内に表示する
	 * 
	 * @param prefixA Knitの前
	 * @param prefixB Knitの後
	 * @param name Knitの後の後
	 * @param lang 言語
	 */
	public static showHeader(prefixA: string, prefixB: string, name: string, lang: string): void {
		const html = `
		<div id="_knit_header_top_line" class="_knit_${name}">
			<div id="_knit_header_top_text">${_Knit_.getHeaderMsg(lang)}</div>
		</div>
		<div id="_knit_header_name">${prefixA}Knit${prefixB}<span id="_knit_header_firstname">${name}</span><span id="_knit_header_period">.</span?</div>
        `;
		document.getElementById("_knit_header")?.insertAdjacentHTML("beforeend", html);
	}

	/**
	 * フッターを"\_knit_footer"内に表示する
	 * 
	 * @param firstYear ページを作った最初の年
	 * @param year 年
	 * @param month 月
	 * @param date 日
	 * @param name 名前
	 * @param lang 言語
	 */
	public static showFooter(firstYear: number, year: number, month: number, date: number, name: string, lang: string) {
		let link: String, msg: String, updatedTime: String;
		switch (lang) {
			case "ja":
				link = "https://docs.google.com/forms/d/e/1FAIpQLScQpH2qQwRPI4FvHOiEtdqFUGLbRY5hM_1CLKpreXV8SYnXCg/viewform";
				msg = "報告・提案はこちらから";
				updatedTime = `${year}年${month}月${date}日`
				break;
			case "en": default:
				link = "https://docs.google.com/forms/d/e/1FAIpQLSdcZn212m7u46pcxcwHn8hC7kpLb2DxXUSMgUGrO6pyh7na1w/viewform";
				msg = "Click here to report or propose";
				let monthTable = ["January", "Februray", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
				let ordinal: String;
				if (date == 1 || date == 21 || date == 31) { ordinal = "st"; }
				else if (date == 2 || date == 22 || date == 32) { ordinal = "nd"; }
				else if (date == 3 || date == 23) { ordinal = "rd"; }
				else { ordinal = "th"; }
				updatedTime = `${monthTable[month - 1]} ${date}${ordinal}, ${year}`;
				break;
		}
		const html = `
		<footer>
			<div><a href="${link}">${msg}</a></div>
			<div>Last update: <time datetime="${year}-${month}-${date}+09:00">${updatedTime}</time></div>
			<div><small>© ${firstYear}-${year} Knit ${name}.</small></div>
		</footer>
		`;
		document.getElementById("_knit_footer")?.insertAdjacentHTML("beforeend", html);
	}
}