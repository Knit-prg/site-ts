import { KnitMapper } from "./knit_mapper.js";
abstract class KnitMapperLayer {
	public abstract draw(mapper: KnitMapper): Map<number, string>
	public abstract getData(data: DOMStringMap): string
}

export class KnitMapperData {
	private static layers: Map<string, KnitMapperLayer> = new Map();
	public static getLayer(layerName: string | undefined): KnitMapperLayer | null {
		if (layerName == undefined) { return null; }
		return this.layers.get(layerName) ?? null;
	}
	public static registerLayer(layerName: string, layer: KnitMapperLayer): void {
		this.layers.set(layerName, layer);
	}
}

class KnitMapperCities {
	name: string = "";
	kana: string = "";
	type: "path" | "circle" = "path";
	textVertical: boolean = false;
	entryable: boolean = false;
	textpathSideReverse: boolean = false;
	constructable: boolean | string = false;
	path: [number, number][] = [];
	layer: number = 0;
	width: number = 0;
	height: number = 0;
	area: number = 0;
	center: [number, number] = [0, 0];
	pathText: string = "[]";
}

export class KnitMapperCitiesLayer extends KnitMapperLayer {
	private data: KnitMapperCities[] = [];
	public add(value: any): void {
		const casted = new KnitMapperCities();
		const name = value.name;
		if (typeof name == "string") { casted.name = name; }
		const kana = value.kana ?? value.pronunciation;
		if (typeof kana == "string") { casted.kana = kana; }
		const type = value.type;
		if (typeof type == "string" && (type == "path" || type == "circle")) {
			casted.type = type;
			if (type == "circle") { return; }
		}
		const textVertical = value.text_vertical ?? value.textVertical;
		if (typeof textVertical == "boolean") { casted.textVertical = textVertical; }
		const entryable = value.entryable;
		if (typeof entryable == "boolean") { casted.entryable = entryable; }
		const textpathSideReverse = value.textpath_side_reverse ?? value.textpathSideReverse;
		if (typeof textpathSideReverse == "boolean") { casted.textpathSideReverse = textpathSideReverse; }
		const constructable = value.constructable;
		if (typeof constructable == "boolean" || typeof constructable == "string") { casted.constructable = constructable; }
		const path = value.path;
		if (Array.isArray(path)) {
			for (let i = 0; i < path.length; i++) {
				const pathI = path[i];
				if (!Array.isArray(pathI)) { continue; }
				if (pathI.length != 2) { continue; }
				if (typeof pathI[0] != "number") { continue; }
				if (typeof pathI[1] != "number") { continue; }
				casted.path.push([pathI[0], pathI[1]]);
			}
		}
		const layer = value.layer;
		if (typeof layer == "number") { casted.layer = layer; }
		casted.width = KnitMapper.util.getPathRight(casted.path) - KnitMapper.util.getPathLeft(casted.path);
		casted.height = KnitMapper.util.getPathBottom(casted.path) - KnitMapper.util.getPathTop(casted.path);
		casted.area = KnitMapper.util.calcPathArea(casted.path);
		casted.center = [KnitMapper.util.calcCenterX(casted.path), KnitMapper.util.calcCenterZ(casted.path)];
		casted.pathText = "[" + casted.path.join("],[") + "]";
		this.data.push(casted);
	}
	public addAll(value: any[]): void {
		for (let i = 0; i < value.length; i++) {
			this.add(value[i])
		}
	}
	public override draw(): Map<number, string> {
		let result: Map<number, string> = new Map();
		for (let i = 0; i < this.data.length; i++) {
			switch (this.data[i].type) {
				case "path": {
					if (!KnitMapper.util.isPathVisible(this.data[i].path)) { continue; }
					let path = "";
					for (let j = 0; j < this.data[i].path.length; j++) {
						if (j == 0) { path += "M "; }
						else { path += "L "; }
						path += `${KnitMapper.util.getRelativePositionX(this.data[i].path[j][0]).toFixed(0)} ${KnitMapper.util.getRelativePositionZ(this.data[i].path[j][1]).toFixed(0)}`;
					}
					path += "Z";
					result.set(this.data[i].layer, (result.get(this.data[i].layer) ?? "") + `<path
						d="${path}"
						stroke="red"
						stroke-width="5px"
						fill="none"
						id="cities_path_${this.data[i].name}"
						class="cities"
						data-layer="cities"
						data-name="${this.data[i].name}"
						data-kana="${this.data[i].kana}"
						data-entryable="${this.data[i].entryable}"
						data-constructable="${this.data[i].constructable}"
						data-width="${this.data[i].width}"
						data-height="${this.data[i].height}"
						data-area="${this.data[i].area}"
						data-center_x="${this.data[i].center[0]}"
						data-center_z="${this.data[i].center[1]}"
						data-path="${this.data[i].pathText}"
					></path>`);
					if (KnitMapper.parameter.getZoomLevel() >= 0.8 && KnitMapper.parameter.getZoomLevel() < 2) {
						result.set(10000, (result.get(10000) ?? "") + `<text
							x="${KnitMapper.util.getRelativePositionX(this.data[i].center[0]).toFixed(0)}"
							y="${KnitMapper.util.getRelativePositionZ(this.data[i].center[1]).toFixed(0)}"
							fill="black"
							stroke="white"
							stroke-width="5px"
							text-anchor="${this.data[i].textVertical ? 'end' : 'middle'}"
							${this.data[i].textVertical ? 'writing-mode="tb"' : ''}
							class="cities_text"
						>${this.data[i].name}</text>`)
					} else {
						//拡大時の処理どうする？
					}
					break;
				}
				case "circle": { break; }//円の自治体ってなくなった気がする
			}
		}
		return result;
	}
	public override getData(data: DOMStringMap): string {
		let entryable = "";
		switch (data["entryable"]) {
			case "true": entryable = "可能"; break;
			case "false": entryable = "禁止"; break;
			default: entryable = data["entryable"] ?? ""; break;
		}
		let constructable = "";
		switch (data["constructable"]) {
			case "true": constructable = "可能"; break;
			case "false": constructable = "禁止"; break;
			default: constructable = data["constructable"] ?? ""; break;
		}
		return `
		<table border>
			<tr><td>名称</td><td>${data["name"]}</td></tr>
			<tr><td>読み</td><td>${data["pronunciation"]}</td></tr>
			<tr><td>立入</td><td>${entryable}</td></tr>
			<tr><td>建築</td><td>${constructable}</td></tr>
			<tr><td>東西幅</td><td>${data["width"]}</td></tr>
			<tr><td>南北幅</td><td>${data["height"]}</td></tr>
			<tr><td>面積</td><td>${data["area"]}㎡</td></tr>
			<tr><td>中心</td><td>${data["center_x"]},${data["center_z"]}</td></tr>
			<tr><td>境界線</td><td><details><summary>クリックで展開/収納</summary>${data["path"]}</details></td></tr>
		</table>
		`
	}
}