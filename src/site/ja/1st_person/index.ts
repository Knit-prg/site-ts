/**
 * 一人称データを表す
 * 
 * @author Knit prg.
 * @since 2.0.0
 */
class FirstPerson {
	hiragana = "";
	katakana = "";
	kanji = "";
	romanized = "";
	whenTweet = "";
	constructor(hiragana: string, katakana: string, kanji: string, romanized: string, whenTweet: string) {
		this.hiragana = hiragana;
		this.katakana = katakana;
		this.kanji = kanji;
		this.romanized = romanized;
		this.whenTweet = whenTweet;
	}
}

/**
 * ルーレット用の関数等を管理する
 * 
 * @author Knit prg.
 * @since 2.0.0
 */
class FirstPersonRoulette {

	/**
	 * 一人称一覧
	 * 
	 * @since 2.0.0
	 */
	public static firstPersons = FirstPersonRoulette.getFirstPersonsData();

	/**
	 * 時間のパターン一覧
	 * 
	 * @since 2.0.0
	 */
	public static times = [
		"5分",
		"30分",
		"1時間",
		"半日",
		"1日",
		"3日",
		"7日",
		"(30分で来たいいねの数)分",
		"(30分で来たいいねの数+30分で来たRTの数)分",
		"(30分で来たいいねの数)時間",
		"(30分で来たいいねの数+30分で来たRTの数)時間",
		"(3分で来たいいねの数)日",
		"(3分で来たいいねの数+3分で来たRTの数)日"
	];

	/**
	 * ツイートする時間パターン
	 * 
	 * @since 2.0.0
	 */
	public static tweetTime = "";

	/**
	 * ツイートする一人称
	 * 
	 * @since 2.0.0
	 */
	public static tweetValue = "";

	/**
	 * ボタンを押せなくする
	 * 
	 * @since 2.0.0
	 */
	public static disableButton(): void {
		document.getElementById("start")?.classList.add("disabled_button");
		document.getElementById("tweet")?.classList.add("disabled_button");
		const start = document.getElementById("start");
		if (start != null) {
			start.onclick = null;
		}
		const tweet = document.getElementById("tweet");
		if (tweet != null) {
			tweet.onclick = null;
		}
	}

	/**
	 * ルーレットをする
	 * 
	 * @param left 残り回数
	 * @since 2.0.0
	 */
	public static doRoulette(left: number): void {
		let text1 = document.getElementById("text1");
		let text2 = document.getElementById("text2");
		let text3 = document.getElementById("text3");
		let text4 = document.getElementById("text4");
		if (text1 == null || text2 == null || text3 == null || text4 == null) { return; }
		let time = FirstPersonRoulette.times[_Knit_.getRandomInteger(0, FirstPersonRoulette.times.length - 1)];
		FirstPersonRoulette.tweetTime = time;
		let items = Array.from(FirstPersonRoulette.firstPersons.keys());
		let item = FirstPersonRoulette.firstPersons.get(items[_Knit_.getRandomInteger(0, items.length - 1)]);
		if (item == null) { return; }
		let has = [item?.hiragana != "" ? 1 : 0, item?.katakana != "" ? 1 : 0, item?.kanji != "" ? 1 : 0, item?.romanized != "" ? 1 : 0];
		if (_Knit_.isSameArray(has, [0, 0, 0, 0])) { //データなし
			text1.innerText = "　";
			text2.innerText = "ERROR!";
			text3.innerText = "　";
			FirstPersonRoulette.tweetValue = "ERROR!";
		} else if (_Knit_.isSameArray(has, [0, 0, 0, 1])) { //ローマ字のみ
			text1.innerText = "　";
			text2.innerText = item.romanized;
			text3.innerText = "　";
		} else if (_Knit_.isSameArray(has, [0, 0, 1, 0])) { //漢字のみ
			text1.innerText = "　";
			text2.innerText = item.kanji;
			text3.innerText = "　";
		} else if (_Knit_.isSameArray(has, [0, 0, 1, 1])) { //漢字とローマ字
			text1.innerText = "　";
			text2.innerText = item.kanji;
			text3.innerText = "　";
		} else if (_Knit_.isSameArray(has, [0, 1, 0, 0])) { //片仮名のみ
			text1.innerText = "　";
			text2.innerText = item.kanji;
			text3.innerText = item.romanized;
		} else if (_Knit_.isSameArray(has, [0, 1, 0, 1])) { //片仮名とローマ字
			text1.innerText = "　";
			text2.innerText = item.katakana;
			text3.innerText = "　";
		} else if (_Knit_.isSameArray(has, [0, 1, 1, 0])) { //片仮名と漢字
			text1.innerText = item.katakana;
			text2.innerText = item.kanji;
			text3.innerText = "　";
		} else if (_Knit_.isSameArray(has, [0, 1, 1, 1])) { //片仮名、漢字、ローマ字
			text1.innerText = item.katakana;
			text2.innerText = item.kanji;
			text3.innerText = item.romanized;
		} else if (_Knit_.isSameArray(has, [1, 0, 0, 0])) { //平仮名のみ
			text1.innerText = "　";
			text2.innerText = item.hiragana;
			text3.innerText = "　";
		} else if (_Knit_.isSameArray(has, [1, 0, 0, 1])) { //平仮名とローマ字
			text1.innerText = "　";
			text2.innerText = item.hiragana;
			text3.innerText = item.romanized;
		} else if (_Knit_.isSameArray(has, [1, 0, 1, 0])) { //平仮名と漢字
			text1.innerText = item.hiragana;
			text2.innerText = item.kanji;
			text3.innerText = "　";
		} else if (_Knit_.isSameArray(has, [1, 0, 1, 1])) { //平仮名、漢字、ローマ字
			text1.innerText = item.hiragana;
			text2.innerText = item.kanji;
			text3.innerText = item.romanized;
		} else if (_Knit_.isSameArray(has, [1, 1, 0, 0])) { //平仮名と片仮名
			text1.innerText = "　";
			text2.innerText = `${item.hiragana}/${item.katakana}`;
			text3.innerText = "　";
		} else if (_Knit_.isSameArray(has, [1, 1, 0, 1])) { //平仮名、片仮名、ローマ字
			text1.innerText = "　";
			text2.innerText = `${item.hiragana}/${item.katakana}`;
			text3.innerText = item.romanized;
		} else if (_Knit_.isSameArray(has, [1, 1, 1, 0])) { //平仮名、片仮名、漢字
			text1.innerText = `${item.hiragana}/${item.katakana}`;
			text2.innerText = item.kanji;
			text3.innerText = "　";
		} else if (_Knit_.isSameArray(has, [1, 1, 1, 1])) {
			text1.innerText = `${item.hiragana}/${item.katakana}`;
			text2.innerText = item.kanji;
			text3.innerText = "　";
		}
		text4.innerText = `今から${time}`;
		FirstPersonRoulette.tweetValue = item.whenTweet;
		if (left - 1 != 0) { requestAnimationFrame(function () { FirstPersonRoulette.doRoulette(left - 1) }); }
		else { FirstPersonRoulette.enableButton(true); }
	}

	/**
	 * ツイート画面を開く
	 * 
	 * @since 2.0.0
	 */
	public static doTweet(): void {
		window.open(`https://twitter.com/intent/tweet?text=一人称「${FirstPersonRoulette.tweetValue}」で${FirstPersonRoulette.tweetTime}過ごします！%0A一人称ルーレット%20by%20Knit%20prg.%0A&url=${location.href}`, "ツイートする", "width=500,height=500");
	}

	/**
	 * ボタンを押せるようにする
	 * 
	 * @param canTweet ツイート可能な状態か
	 * @since 2.0.0
	 */
	public static enableButton(canTweet: boolean): void {
		const start = document.getElementById("start");
		if (start != null) {
			start.classList.remove("disabled_button");
			start.onclick = FirstPersonRoulette.startRoulette;
		}
		if (canTweet) {
			const tweet = document.getElementById("tweet") as HTMLAnchorElement;
			if (tweet != null) {
				tweet.onclick = FirstPersonRoulette.doTweet;
				tweet.classList.remove("disabled_button");
				tweet.href = `https://twitter.com/intent/tweet?text=一人称「${FirstPersonRoulette.tweetValue}」で${FirstPersonRoulette.tweetTime}過ごします！%0A一人称ルーレット%20by%20Knit%20prg.%0A&url=${location.href}`;
			}
		}
	}

	/**
	 * 一人称データを生成する
	 * 
	 * @returns データ
	 * @since 2.0.0
	 */
	public static getFirstPersonsData(): Map<string, FirstPerson> {
		const map = new Map<string, FirstPerson>();
		map.set("achiki", new FirstPerson("あちき", "", "", "Achiki", "あちき"));
		map.set("atai", new FirstPerson("あたい", "アタイ", "", "Atai", "あたい"));
		map.set("atakushi", new FirstPerson("あたくし", "", "", "Atakushi", "あたくし"));
		map.set("atashi", new FirstPerson("あたし", "アタシ", "", "Atashi", "あたし/アタシ"));
		map.set("boku", new FirstPerson("ぼく", "ボク", "僕", "Boku", "僕(ぼく/ボク)"));
		map.set("bokuchan", new FirstPerson("ぼくちゃん", "", "僕ちゃん", "Boku-chan", "僕ちゃん(ぼくちゃん"));
		map.set("chin", new FirstPerson("ちん", "", "朕", "Chin", "朕"));
		map.set("i", new FirstPerson("", "", "", "I", "I"));
		map.set("jibun", new FirstPerson("じぶん", "", "自分", "Jibun", "自分"));
		map.set("maro", new FirstPerson("まろ", "", "麻呂/麿", "Maro", "麻呂/麿(まろ)"));
		map.set("me", new FirstPerson("", "", "", "me", "me"));
		map.set("oira", new FirstPerson("おいら", "オイラ", "", "Oira", "おいら/オイラ"));
		map.set("ore", new FirstPerson("おれ", "オレ", "俺", "Ore", "俺(オレ)"));
		map.set("oresama", new FirstPerson("おれさま", "", "俺様", "Ore-sama", "俺様(オレ様)"));
		map.set("sessha", new FirstPerson("せっしゃ", "", "拙者", "Sessha", "拙者"));
		map.set("sessou", new FirstPerson("せっそう", "", "拙僧", "Sessō", "拙僧"));
		map.set("shousei", new FirstPerson("しょうせい", "", "小生", "Shōsei", "小生"));
		map.set("touhou", new FirstPerson("とうほう", "", "当方", "Tohō", "当方"));
		map.set("uchi", new FirstPerson("うち", "ウチ", "", "Uchi", "うち/ウチ"));
		map.set("wai", new FirstPerson("", "ワイ", "", "Wai", "ワイ"));
		map.set("warawa", new FirstPerson("わらわ", "", "妾", "Warawa", "妾(わらわ)"));
		map.set("ware", new FirstPerson("われ", "", "我", "Ware", "我"));
		map.set("ware_", new FirstPerson("われ", "", "吾", "Ware", "吾"));
		map.set("washi", new FirstPerson("わし", "ワシ", "儂", "Washi", "儂(わし/ワシ)"));
		map.set("watakushi", new FirstPerson("わたくし", "", "私", "Watakushi", "私(わたくし)"));
		map.set("watashi", new FirstPerson("わたくし", "", "私", "Watashi", "私(わたし)"));
		map.set("yatsugare", new FirstPerson("やつがれ", "", "僕", "Yatsugare", "僕(やつがれ)"));
		map.set("yo", new FirstPerson("よ", "", "余/予", "Yo", "余/予"));
		return map;
	}

	/**
	 * 初期化
	 * 
	 * @since 2.0.0
	 */
	public static onload(): void {
		let firstPersonList = FirstPersonRoulette.firstPersons;
		let fragment = document.createDocumentFragment();

		firstPersonList.forEach(function (value, key, map) {
			let newItem = document.createElement("li");
			newItem.innerHTML = `<code>firstPersons.${key}</code>: ${value.whenTweet}`;
			fragment.appendChild(newItem);
		});
		document.getElementById("first_person_list")?.appendChild(fragment);
		FirstPersonRoulette.enableButton(false);
	}

	/**
	 * ルーレットを開始する
	 * 
	 * @since 2.0.0
	 */
	public static startRoulette(): void {
		FirstPersonRoulette.disableButton();
		FirstPersonRoulette.doRoulette(50);
	}
}