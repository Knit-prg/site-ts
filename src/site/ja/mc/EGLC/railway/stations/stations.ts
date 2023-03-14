import { _Knit_ } from "/site/js/knit_base.js";

/**
 * 一駅を表す
 * 
 * @author Knit prg.
 * @since 2.0.0
 */
class Station {
	name = "";
	kana = "";
	en = "";
	id = "";
	before: [number, number] | null = null;
	next: [number, number] | null = null;
	constructor(name: string, kana: string, en: string, id: string, before: [number, number] | null, next: [number, number] | null) {
		this.name = name;
		this.kana = kana;
		this.en = en;
		this.id = id;
		this.before = before;
		this.next = next;
	}
}

/**
 * 路線データ
 * 
 * @author Knit prg.
 * @since 2.0.0
 */
export class StationsData {

	/**
	 * 駅一覧
	 * 
	 * @since 2.0.0
	*/
	private stations: Map<[number, number], Station> = new Map();

	/**
	 * 空の駅を表す
	 * 
	 * @since 2.0.0
	 */
	public EMPTY_STATION = new Station("", "", "", "", null, null);

	/**
	 * データを構築します。
	 * 
	 * @since 2.0.0
	 */
	constructor() {
		this.stations.set([1, 0], new Station("謎町中央前&#xe0101;", "なぞまちちゅうおうまえ", "Nazo-machi central entrance<br>(Nazo-machi chūō mae", "", null, [1, 1]));
		this.stations.set([1, 1], new Station("第一自由區北", "だいいちじゆうくきた", "The 1st free construction area north<br>(Dai-ichi jiyū-ku kita)", "ENR-1-1", [1, 0], [1, 2]));
		this.stations.set([1, 2], new Station("第一自由區南", "だいいちじゆうくみなみ", "The 1st free construction area south<br>(Dai-ichi-jiyū-ku minami)", "ENR1-2", [1, 1], null));
		this.stations.set([2, 3], new Station("南都南", "みなみつみなみ", "Minamitsu-Minami", "ENR-2-3", null, [2, 4]));
		this.stations.set([2, 4], new Station("南都中央", "みなみつちゅうおう", "Minamitsu-Chūō", "ENR-2-4", [2, 3], [2, 5]));
		this.stations.set([2, 5], new Station("南都北", "みなみつきた", "Minamitsu-Kita", "ENR-2-5", [2, 4], [2, 6]));
		this.stations.set([2, 6], new Station("中都谷", "なかつや", "Nakatsuya", "ENR-2-6", [2, 5], [2, 7]));
		this.stations.set([2, 7], new Station("中都川", "なかつがわ", "Nakatsugawa", "ENR-2-7", [2, 6], [2, 8]));
		this.stations.set([2, 8], new Station("第二大書見臺前&#xe0101;", "だいにだいしょけんだい", "The Greatest Lectern Ⅱ ent.", "ENR-2-8", [2, 7], [2, 9]));
		this.stations.set([2, 9], new Station("北都東", "きたつひがし", "Kitatsu-Higashi", "ENR-2-9", [2, 8], null));
		this.stations.set([3, 0], new Station("中都川", "なかつがわ", "Nakatsugawa", "ENR-3-0", null, [3, 1]));
		this.stations.set([3, 1], new Station("第二大書見臺前󠄁&#xe0101;", "だいにだいしょけんだいまえ", "The Greateset Lectern Ⅱ ent.", "ENR-3-1", [3, 0], [3, 1]));
		this.stations.set([3, 2], new Station("第二大書見臺", "だいにだいしょけんだい", "The Greatest Lectern Ⅱ", "ENR-3-2", [3, 1], [3, 3]));
		this.stations.set([3, 3], new Station("三目池", "みつめいけ", "Mitsumeike", "ENR-3-3", [3, 2], null));
		this.stations.set([4, 1], new Station("三目池", "みつめいけ", "Mitsumeike", "ENR-4-1", null, [4, 2]));
		this.stations.set([4, 2], new Station("旦ヶ丘", "あしたがおか", "Ashitagaoka", "ENR-4-2", [4, 1], null));
		this.stations.set([5, 1], new Station("三目池", "みつめいけ", "Mitsumeike", "ENR-5-1", null, [5, 2]));
		this.stations.set([5, 2], new Station("樽旗國", "たるはたこく", "Taruhatakoku", "ENR-5-2", [5, 1], null));
	}

	/**
	 * あの駅を返します。
	 * 
	 * @returns あの駅
	 * @since 2.0.0
	 */
	public getGlitchedStation(): Station {
		const randomStation = this.getRandomStation();
		return new Station(_Knit_.getGlitchedText(randomStation.name), _Knit_.getGlitchedText(randomStation.kana), _Knit_.getGlitchedText(randomStation.en), _Knit_.getGlitchedText(randomStation.id), null, null);
	}

	/**
	 * 路線の色を返します。
	 * 
	 * @param line 路線番号
	 * @returns [文字色,背景色]
	 */
	public getLineColor(line: number): [string, string] {
		switch (line) {
			case 1: return ["white", "navy"];
			case 2: return ["white", "darkred"];
			case 3: return ["white", "orange"];
			case 4: return ["black", "yellow"];
			case 5: return ["white", "mediumblue"];
			default: return ["white", "black"];
		}
	}

	/**
	 * ランダムな駅を返します。
	 * 
	 * @returns ランダムな駅
	 */
	public getRandomStation(): Station {
		const values = Array.from(this.stations)
		const randomIndex = _Knit_.getRandomInteger(0, values.length - 1);
		return values[randomIndex][1];
	}

	/**
	 * 駅を取得します。
	 * 
	 * @param line 路線番号
	 * @param station 駅番号
	 * 
	 * @since 2.0.0
	 */
	public getStation(line: number, station: number): Station {
		const keys = this.stations.keys();
		for (let key of keys) {
			if (key[0] == line && key[1] == station) {
				return this.stations.get(key) ?? this.EMPTY_STATION;
			}
		}
		return this.EMPTY_STATION;
	}
}

/**
 * 駅データ管理
 * 
 * @author Knit prg.
 * @since 2.0.0
 */
export class Stations {

	/**
	 * 駅データ
	 * 
	 * @since 2.0.0
	 */
	public static data = new StationsData();

	/**
	 * 駅看板を生成します
	 * 
	 * @since 2.0.0
	 */
	public static setBanner(line: number, station: number): void {
		let current = Stations.data.getStation(line, station);
		let before = Stations.data.EMPTY_STATION;
		if (current.before != null) {
			before = Stations.data.getStation(current.before[0], current.before[1]);
		}
		let next = Stations.data.EMPTY_STATION;
		if (current.next != null) {
			next = Stations.data.getStation(current.next[0], current.next[1]);
		}
		if (current == Stations.data.EMPTY_STATION) {
			current = Stations.data.getGlitchedStation();
			before = Stations.data.getGlitchedStation();
			next = Stations.data.getGlitchedStation();
		}
		document.getElementById("before_name")?.insertAdjacentHTML("beforeend", before.name);
		document.getElementById("before_en")?.insertAdjacentHTML("beforeend", before.en);
		document.getElementById("before_id")?.insertAdjacentHTML("beforeend", before.id);
		document.getElementById("current_name")?.insertAdjacentHTML("beforeend", current.name);
		document.getElementById("current_name_kana")?.insertAdjacentHTML("beforeend", current.kana);
		document.getElementById("current_en")?.insertAdjacentHTML("beforeend", current.en);
		document.getElementById("current_id")?.insertAdjacentHTML("beforeend", current.id);
		document.getElementById("next_name")?.insertAdjacentHTML("beforeend", next.name);
		document.getElementById("next_en")?.insertAdjacentHTML("beforeend", next.en);
		document.getElementById("next_id")?.insertAdjacentHTML("beforeend", next.id);
		document.getElementById("line3")?.style.setProperty("color", Stations.data.getLineColor(line)[0]);
		document.getElementById("line3")?.style.setProperty("background-color", Stations.data.getLineColor(line)[1]);
		document.title = current.name + "駅 - 大書見台帝国連邦鉄道 - Knit prg."
	}
}