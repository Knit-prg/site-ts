import { KnitMapper } from "./knit_mapper.js";
abstract class KnitMapperLayer {
	public abstract add(value: any): void
	public abstract addAll(value: any[]): void
	public abstract draw(mapper: KnitMapper): Map<number, string>
	public abstract getData(data: DOMStringMap): string
	public abstract getName(): string
}

export class KnitMapperData {
	private static layers: Map<string, KnitMapperLayer> = new Map();
	public static getAllLayersName(): string[] {
		let all: string[] = [];
		let keys = this.layers.keys()
		for (let i = 0; i < this.layers.size; i++) {
			all.push(keys.next().value);
		}
		return all;
	}
	public static getLayer(layerName: string | undefined): KnitMapperLayer | null {
		if (layerName == undefined) { return null; }
		return this.layers.get(layerName) ?? null;
	}
	public static registerLayer(layerName: string, layer: KnitMapperLayer): void {
		this.layers.set(layerName, layer);
	}
}

class KnitMapperCity {
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
	private data: KnitMapperCity[] = [];
	public override add(value: any): void {
		const casted = new KnitMapperCity();
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
	public override addAll(value: any[]): void {
		for (let i = 0; i < value.length; i++) {
			this.add(value[i]);
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
			<tr><td>読み</td><td>${data["kana"]}</td></tr>
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
	public override getName(): string {
		return "自治体";
	}
}

class KnitMapperRoad {
	name: string = "無名道路";
	width: number = 3;
	path: [number, number][] = [];
	layer: number = 0;
	pathText: string = "[]";
}

export class KnitMapperRoadsLayer extends KnitMapperLayer {
	private data: KnitMapperRoad[] = [];
	public override add(value: any): void {
		const casted = new KnitMapperRoad();
		const name = value.name;
		if (typeof name == "string") { casted.name = name; }
		const width = value.width;
		if (typeof width == "number") { casted.width = width; }
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
		casted.pathText = "[" + casted.path.join("],[") + "]";
		this.data.push(casted);
	}
	public override addAll(value: any[]): void {
		for (let i = 0; i < value.length; i++) {
			this.add(value[i]);
		}
	}
	public override draw(): Map<number, string> {
		let result: Map<number, string> = new Map();
		for (let i = 0; i < this.data.length; i++) {
			if (KnitMapper.util.isPathVisible(this.data[i].path)) {
				let path = "";
				for (let j = 0; j < this.data[i].path.length; j++) {
					if (j == 0) { path += "M "; }
					else { path += "L "; }
					path += `${KnitMapper.util.getRelativePositionX(this.data[i].path[j][0]).toFixed(0)} ${KnitMapper.util.getRelativePositionZ(this.data[i].path[j][1]).toFixed(0)}`;
				}
				let strokeWidth = this.data[i].width * KnitMapper.parameter.getZoomLevel();
				if (KnitMapper.parameter.getZoomLevel() <= 1) { strokeWidth = this.data[i].width; }
				result.set(this.data[i].layer, (result.get(this.data[i].layer) ?? "") + `<path
					d="${path}"
					stroke="yellow"
					stroke-width="${strokeWidth}px"
					fill="none"
					class="roads"
					data-layer="roads"
					data-name="${this.data[i].name}"
					data-width="${this.data[i].width}"
					data-path="${this.data[i].pathText}"
				></path>`);
			}
		}
		return result;
	}
	public override getData(data: DOMStringMap): string {
		return `
		<table border>
			<tr><td>名称</td><td>${data["name"]}</td></tr>
			<tr><td>幅</td><td>${data["width"]}</td></tr>
			<tr><td>経路</td><td>${data["path"]}</td></tr>
		</table>
		`;
	}
	public override getName(): string {
		return "道路";
	}
}

class KnitMapperBuilding {
	name: string = "";
	use: "farm" | "gov_office" | "house" | "others" | "park" | "station" | "square" = "others"
	floor: number | string = 0;
	type: "path" | "rect" = "path";
	textAppearance: [number, number] = [2, Infinity];
	textVertical: boolean = false;
	layer: number = 0;
	path: [number, number][] = [];
	width: number = 0;
	height: number = 0;
	area: number = 0;
	center: [number, number] = [0, 0];
	pathText: string = "[]";
	address: string = "";
}

export class KnitMapperBuildingsLayer extends KnitMapperLayer {
	private data: KnitMapperBuilding[] = [];
	private readonly USES: Map<string, [string, string]> = new Map([
		["farm", ["green", "農地/牧地"]],
		["gov_office", ["cadetblue", "官公庁"]],
		["house", ["crimson", "住居"]],
		["others", ["white", "その他"]],
		["park", ["chartreuse", "公園"]],
		["station", ["teal", "駅"]],
		["square", ["olive", "広場"]],
	]);
	public override add(value: any): void {
		const casted = new KnitMapperBuilding();
		const name = value.name;
		if (typeof name == "string") { casted.name = name; }
		const use = value.use;
		if (typeof use == "string" && (
			use == "farm" ||
			use == "gov_office" ||
			use == "house" ||
			use == "others" ||
			use == "park" ||
			use == "station" ||
			use == "square"
		)) { casted.use = use; }
		const floor = value.floor;
		if (typeof floor == "number" || typeof floor == "string") { casted.floor = floor; }
		const type = value.type;
		if (typeof type == "string" && (type == "path" || type == "rect")) { casted.type = type; }
		const textAppearance = value.textAppearance ?? value.text_appearance;
		if (Array.isArray(textAppearance)) {
			if (textAppearance.length == 2 && typeof textAppearance[0] == "number" && typeof textAppearance[1] == "number") {
				casted.textAppearance = [textAppearance[0], textAppearance[1]];
			}
		}
		const textVertical = value.textVertical ?? value.text_vertical;
		if (typeof textVertical == "boolean") { casted.textVertical = textVertical; }
		const layer = value.layer;
		if (typeof layer == "number") { casted.layer = layer; }
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
		if (path.length < 2) { return; }
		switch (casted.type) {
			case "rect": {
				casted.width = casted.path[1][0] - casted.path[0][0];
				casted.height = casted.path[1][1] - casted.path[0][1];
				casted.area = casted.width * casted.height;
				casted.center = [casted.path[0][0] + casted.width / 2, casted.path[0][1] + casted.height / 2];
				break;
			}
			case "path": {
				casted.center = [KnitMapper.util.calcCenterX(casted.path), KnitMapper.util.calcCenterZ(casted.path)];
				casted.width = KnitMapper.util.getPathRight(casted.path) - KnitMapper.util.getPathLeft(casted.path);
				casted.height = KnitMapper.util.getPathBottom(casted.path) - KnitMapper.util.getPathTop(casted.path);
				casted.area = KnitMapper.util.calcPathArea(casted.path);
			}
		}
		casted.pathText = "[" + casted.path.join("],[") + "]";
		const address = value.address;
		if (typeof address == "string") { casted.address = address; }
		this.data.push(casted);
	}
	public override addAll(value: any[]): void {
		for (let i = 0; i < value.length; i++) {
			this.add(value[i]);
		}
	}
	public override draw(mapper: KnitMapper): Map<number, string> {
		let result: Map<number, string> = new Map();
		for (let i = 0; i < this.data.length; i++) {
			let fill = this.USES.get(this.data[i].use)?.[0] ?? "white";
			let use = this.USES.get(this.data[i].use)?.[1] ?? "その他";
			let stroke = "black";
			if (KnitMapper.parameter.getZoomLevel() < 3) { stroke = "none"; }
			switch (this.data[i].type) {
				case "rect": {
					let mapbox = KnitMapper.mapbox;
					let left = this.data[i].path[0][0];
					let right = this.data[i].path[1][0];
					let top = this.data[i].path[0][1];
					let bottom = this.data[i].path[1][1];
					let mapboxLeft = mapbox.nw[0];
					let mapboxRight = mapbox.ne[0];
					let mapboxTop = mapbox.nw[1];
					let mapboxBottom = mapbox.sw[1];
					let leftVisible = left - mapboxLeft > 0 && left - mapboxRight < 0;
					let rightVisible = right - mapboxLeft > 0 && right - mapboxRight < 0;
					let rawWidth = right - left;
					let screenWidth = mapboxRight - mapboxLeft;
					let horizontalVisible = (leftVisible || rightVisible) || rawWidth > screenWidth;
					let topVisible = top - mapboxTop > 0 && top - mapboxBottom < 0;
					let bottomVisible = bottom - mapboxTop > 0 && bottom - mapboxBottom < 0;
					let rawHeight = bottom - top;
					let screenHeight = mapboxBottom - mapboxTop;
					let verticalVisible = (topVisible || bottomVisible) || rawHeight > screenHeight;
					let visible = horizontalVisible && verticalVisible;
					if (visible) {
						let zoomLevel = KnitMapper.parameter.getZoomLevel();
						let x = KnitMapper.util.getRelativePositionX(left);
						let y = KnitMapper.util.getRelativePositionZ(top);
						let width = this.data[i].width * zoomLevel;
						let height = this.data[i].height * zoomLevel;
						result.set(this.data[i].layer, (result.get(this.data[i].layer) ?? "") + `<rect
							x="${x.toFixed(0)}"
							y="${y.toFixed(0)}"
							width="${width.toFixed(0)}"
							height="${height.toFixed(0)}"
							fill="${fill}"
							stroke="${stroke}"
							stroke-width="2.5px"
							class="buildings"
							data-layer="buildings"
							data-name="${this.data[i].name}"
							data-use="${use}"
							data-floor="${this.data[i].floor}"
							data-width="${this.data[i].width}"
							data-height="${this.data[i].height}"
							data-area="${this.data[i].area}"
							data-center_x="${this.data[i].center[0]}"
							data-center_z="${this.data[i].center[1]}"
							data-path="${this.data[i].pathText}"
							data-address="${this.data[i].address}"
						></rect>`);
						if (zoomLevel >= this.data[i].textAppearance[0] && zoomLevel <= this.data[i].textAppearance[1]) {
							result.set(10000, (result.get(10000) ?? "") + `<text
								x="${KnitMapper.util.getRelativePositionX(this.data[i].center[0])}"
								y="${KnitMapper.util.getRelativePositionZ(this.data[i].center[1])}"
								fill="black"
								stroke="white"
								stroke-width="5px"
								text-anchor="middle"
								${this.data[i].textVertical ? "writing-mode='tb'" : ""}
								class="buildings_text"
							>${this.data[i].name}</text>`);
						}
					}
					break;
				}
				case "path": {
					if (KnitMapper.util.isPathVisible(this.data[i].path)) {
						let mapbox = KnitMapper.mapbox;
						let path = "";
						for (let j = 0; j < this.data[i].path.length; j++) {
							if (j == 0) { path += "M "; }
							else { path += "L "; }
							path += `${KnitMapper.util.getRelativePositionX(this.data[i].path[j][0]).toFixed(0)} ${KnitMapper.util.getRelativePositionZ(this.data[i].path[j][1]).toFixed(0)}`;
						}
						path += "Z";
						result.set(this.data[i].layer, (result.get(this.data[i].layer) ?? "") + `<path
							d="${path}"
							fill="${fill}"
							stroke="${stroke}"
							stroke-width="2.5px"
							class="buildings"
							data-layer="buildings"
							data-name="${this.data[i].name}"
							data-use="${use}"
							data-floor="${this.data[i].floor}"
							data-width="${this.data[i].width}"
							data-height="${this.data[i].height}"
							data-area="${this.data[i].area}"
							data-center_x="${this.data[i].center[0]}"
							data-center_z="${this.data[i].center[1]}"
							data-path="${this.data[i].pathText}"
						></path>`);
						if (KnitMapper.parameter.getZoomLevel() >= this.data[i].textAppearance[0] && KnitMapper.parameter.getZoomLevel() <= this.data[i].textAppearance[1]) {
							result.set(10000, (result.get(10000) ?? "") + `<text
								x="${KnitMapper.util.getRelativePositionX(this.data[i].center[0]).toFixed(0)}"
								y="${KnitMapper.util.getRelativePositionZ(this.data[i].center[1]).toFixed(0)}"
								fill="black"
								stroke="white"
								stroke-width="5px"
								text-anchor="middle"
								${this.data[i].textVertical ? "writing-mode='tb'" : ""}
								class="buildings_text
							>${this.data[i].name}</text>`);
						}
					}
					break;
				}
			}
		}
		return result;
	}
	public override getData(data: DOMStringMap): string {
		let floor;
		if (isNaN(Number.parseInt(data["floor"] ?? ""))) {
			floor = data["floor"];
		} else {
			floor = data["floor"] + "階建て";
		}
		return `
			<table border>
				<tr><td>名称</td><td>${data["name"]}</td></tr>
				<tr><td>使用用途</td><td>${data["use"]}</td></tr>
				<tr><td>階数</td><td>${floor}</td></tr>
				<tr><td>東西幅</td><td>${data["width"]}</td></tr>
				<tr><td>南北幅</td><td>${data["height"]}</td></tr>
				<tr><td>面積</td><td>${data["area"]}</td></tr>
				<tr><td>中心</td><td>${data["center_x"]},${data["center_z"]}</td></tr>
				<tr><td>外形</td><td><details><summary>クリックで展開/収納</summary>${data["path"]}</details></td><?tr>
			</table>
		`;
	}
	public override getName(): string {
		return "建物";
	}
}
class KnitMapperRailway {
	name: string = "";
	path: [number, number][] = [];
	pathText: string = "[]";
}

export class KnitMapperRailwaysLayer extends KnitMapperLayer {
	private data: KnitMapperRailway[] = [];
	public override add(value: any): void {
		const casted = new KnitMapperRailway();
		const name = value.name;
		if (typeof name == "string") { casted.name = name; }
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
		casted.pathText = "[" + casted.path.join("],[") + "]";
		this.data.push(casted);
	}
	public override addAll(value: any[]): void {
		for (let i = 0; i < value.length; i++) {
			this.add(value[i]);
		}
	}
	public override draw(mapper: KnitMapper): Map<number, string> {
		let result: Map<number, string> = new Map();
		for (let i = 0; i < this.data.length; i++) {
			if (KnitMapper.util.isPathVisible(this.data[i].path)) {
				let path = "";
				for (let j = 0; j < this.data[i].path.length; j++) {
					if (j == 0) { path += "M "; }
					else { path += "L "; }
					path += `${KnitMapper.util.getRelativePositionX(this.data[i].path[j][0])} ${KnitMapper.util.getRelativePositionZ(this.data[i].path[j][1])}`;
				}
				result.set(210, (result.get(210) ?? "") + `<path
					d="${path}"
					stroke="maroon"
					stroke-width="${KnitMapper.parameter.getZoomLevel() < 1 ? 2 : KnitMapper.parameter.getZoomLevel()}px"
					fill="none"
					id="railway_path_${i}"
					class="railway"
					data-layer="railway"
					data-name="${this.data[i].name}"
					data-path="${this.data[i].pathText}"
				></path>`);
			}
		}
		return result;
	}
	public override getData(data: DOMStringMap): string {
		return `
			<table border>
				<tr><td>名称</td><td>${data["name"]}</td></tr>
				<tr><td>経路</td><td><details><summary>クリックで展開/収納</summary>${data["path"]}</details></td></tr>
			</table>
		`;
	}
	public override getName(): string {
		return "鉄道";
	}
}