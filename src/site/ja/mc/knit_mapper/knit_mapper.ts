import { KnitMapperData } from "/site/ja/mc/knit_mapper/knit_mapper_data.js"

class KnitMapperLayers {
	public static reload(e: unknown): void {
		let checkboxs = document.getElementById("layers_selector")!.children;
		let checkedList: string[] = [];
		for (let i = 0; i < checkboxs.length; i++) {
			if ((checkboxs[i].children[0] as HTMLInputElement).checked) {
				checkedList.push((checkboxs[i].children[0] as HTMLInputElement).name)
			}
		}
		KnitMapper.parameter.setLayers(checkedList, true);
		KnitMapper.draw();
	}
	public static set(newLayer: string[]): void {
		for (let i = 0; i < newLayer.length; i++) {
			try {
				(document.getElementsByName(newLayer[i])[0] as HTMLInputElement)!.checked = true;
			} catch (e) {
				console.warn(e);
			}
			KnitMapper.parameter.setLayers(newLayer, true);
		}
	}
}

class KnitMapperMapbox {
	public static ne: [number, number] = [0, 0];
	public static nw: [number, number] = [0, 0];
	public static se: [number, number] = [0, 0];
	public static sw: [number, number] = [0, 0];
	public static update(): void {
		let rect = document.getElementById("map")!.getClientRects()[0];
		let x = KnitMapper.parameter.getX();
		let z = KnitMapper.parameter.getZ();
		let top = z - rect.height / (KnitMapper.parameter.getZoomLevel() * 2);
		let bottom = z + rect.height / (KnitMapper.parameter.getZoomLevel() * 2);
		let left = x - rect.width / (KnitMapper.parameter.getZoomLevel() * 2);
		let right = x - rect.width / (KnitMapper.parameter.getZoomLevel() * 2);
		KnitMapper.mapbox.ne = [right, top];
		KnitMapper.mapbox.nw = [left, top];
		KnitMapper.mapbox.se = [right, bottom];
		KnitMapper.mapbox.sw = [left, bottom];
		document.getElementById("map_svg")!.setAttribute("width", rect.width.toString());
		document.getElementById("map_svg")!.setAttribute("height", rect.height.toString());
		document.getElementById("map_svg")!.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
		document.getElementById("table_ne")!.innerText = right.toFixed(2) + "," + top.toFixed(2);
		document.getElementById("table_nw")!.innerText = left.toFixed(2) + "," + top.toFixed(2);
		document.getElementById("table_se")!.innerText = right.toFixed(2) + "," + bottom.toFixed(2);
		document.getElementById("table_sw")!.innerText = left.toFixed(2) + "," + bottom.toFixed(2);
	}
}

class KnitMapperMenu {
	public static hide(): void {
		document.getElementById("menu")!.style.setProperty("display", "none");
		document.getElementById("menu")!.style.setProperty("width", "0%");
		document.getElementById("map")!.style.setProperty("width", "100%");
		document.getElementById("menu_button")!.innerText = "メニューを表示";
		KnitMapper.parameter.setMenuShown(false, true);
	}
	public static show(): void {
		document.getElementById("menu")!.style.setProperty("display", "block");
		document.getElementById("menu")!.style.setProperty("width", "30%");
		document.getElementById("map")!.style.setProperty("width", "70%");
		document.getElementById("menu_button")!.innerText = "メニューを畳む";
		KnitMapper.parameter.setMenuShown(true, true);
	}
	public static toggle(): void {
		if (KnitMapper.parameter.getMenuShown()) {
			KnitMapper.menu.hide();
		} else {
			KnitMapper.menu.show();
		}
	}
}

class KnitMapperMove {
	public static latestHovered: Element | null = null;
	public static latestTouched: [number, number] = [0, 0]
	public static mouse(e: PointerEvent): void {
		e.preventDefault();
		let mapboxRect = document.getElementById("map")!.getClientRects()[0];
		let relativeX = e.pageX - mapboxRect.x;
		let relativeZ = e.pageY - mapboxRect.y;
		let movementX = KnitMapper.move.latestTouched[0] - relativeX;
		let movementY = KnitMapper.move.latestTouched[1] - relativeZ;
		document.getElementById("mouse_center_x")!.innerText = (KnitMapper.mapbox.nw[0] + (relativeX / KnitMapper.parameter.getZoomLevel())).toFixed(2);
		document.getElementById("mouse_center_z")!.innerText = (KnitMapper.mapbox.nw[1] + (relativeZ / KnitMapper.parameter.getZoomLevel())).toFixed(2);
		if ((e.pointerType == "mouse" && e.buttons == 1) || e.pointerType == "touch") {
			KnitMapper.move.set(KnitMapper.parameter.getX() + movementX / KnitMapper.parameter.getZoomLevel(), KnitMapper.parameter.getZ() + movementY / KnitMapper.parameter.getZoomLevel());
		}
		if (((e.target as SVGElement)?.nodeName == "rect") || ((e.target as SVGElement)?.nodeName == "path")) {
			let data = (e.target as SVGElement)?.dataset;
			document.getElementById("menu_inner")!.innerHTML = KnitMapperData.getLayer(data["layer"])?.getData(data) ?? "";
		}
		KnitMapper.move.latestTouched = [relativeX, relativeZ];
	}
	public static set(newX: number, newZ: number): void {
		KnitMapper.parameter.setX(newX, false);
		KnitMapper.parameter.setZ(newZ, false);
		KnitMapper.mapbox.update();
		document.getElementById("mouse_center_x")!.innerText = KnitMapper.parameter.getX().toString();
		document.getElementById("mouse_center_z")!.innerText = KnitMapper.parameter.getZ().toString();
		KnitMapper.draw();
	}
}

class KnitMapperParameter {
	private static isMenuShown = true;
	private static layers: string[] = [];
	private static x = 0;
	private static z = 0;
	private static zoomLevel = 1;
	public static getMenuShown(): boolean {
		return KnitMapper.parameter.isMenuShown;
	}
	public static getLayers(): string[] {
		return KnitMapper.parameter.layers;
	}
	public static getX(): number {
		return KnitMapper.parameter.x;
	}
	public static getZ(): number {
		return KnitMapper.parameter.z;
	}
	public static getZoomLevel(): number {
		return KnitMapper.parameter.zoomLevel;
	}
	public static reload() {
		if (KnitMapper.parameter.isMenuShown) {
			KnitMapper.menu.show();
		} else {
			KnitMapper.menu.hide();
		}
		KnitMapper.move.set(KnitMapper.parameter.x, KnitMapper.parameter.z);
		document.getElementById("center_x")!.innerText = KnitMapper.parameter.x.toString();
		document.getElementById("center_z")!.innerText = KnitMapper.parameter.z.toString();
		KnitMapper.zoom.set(KnitMapper.parameter.zoomLevel);
		(document.getElementById("zoom_level") as HTMLInputElement)!.value = KnitMapper.parameter.zoomLevel.toString();
		KnitMapper.layers.set(KnitMapper.parameter.layers);
	}
	public static setMenuShown(value: boolean, doReplace: boolean): void {
		KnitMapper.parameter.isMenuShown = value;
		if (doReplace) {
			KnitMapper.parameter.updateSearch();
		}
	}
	public static setLayers(value: string[], doReplace: boolean): void {
		KnitMapper.parameter.layers = value;
		if (doReplace) {
			KnitMapper.parameter.updateSearch();
		}
	}
	public static setX(value: number, doReplace: boolean): void {
		KnitMapper.parameter.x = value;
		if (doReplace) {
			KnitMapper.parameter.updateSearch();
		}
	}
	public static setZ(value: number, doReplace: boolean): void {
		KnitMapper.parameter.z = value;
		if (doReplace) {
			KnitMapper.parameter.updateSearch();
		}
	}
	public static setZoomLevel(value: number, doReplace: boolean): void {
		KnitMapper.parameter.zoomLevel = value;
		if (doReplace) {
			KnitMapper.parameter.updateSearch();
		}
	}
	public static updateSearch(): void {
		let newSearch = `?is_menu_shown=${KnitMapper.parameter.isMenuShown}&layers=${KnitMapper.parameter.layers}&x=${KnitMapper.parameter.x}&z=${KnitMapper.parameter.z}&zoom_level=${KnitMapper.parameter.zoomLevel}`;
		history.replaceState(null, "", newSearch);
	}
}

class KnitMapperUtil {
	public static calcCenterX(path: [number, number][]): number {
		let left = KnitMapper.util.getPathLeft(path);
		let right = KnitMapper.util.getPathRight(path);
		return left + ((right - left) / 2);
	}
	public static calcCenterZ(path: [number, number][]): number {
		let top = KnitMapper.util.getPathTop(path);
		let bottom = KnitMapper.util.getPathBottom(path);
		return top + ((bottom - top) / 2);
	}
	public static calcPathArea(path: [number, number][]): number {
		let area = 0;
		for (let i = 0; i < path.length; i++) {
			if (i == 0) {
				area += (path[i][0] * (path[i + 1][1] - path[path.length - 1][1]));
			} else if (i == path.length - 1) {
				area += (path[i][0] * (path[0][1] - path[i - 1][1]));
			} else {
				area += (path[i][0] * (path[i + 1][1] - path[i - 1][1]));
			}
		}
		return Math.abs(area / 2);
	}
	public static forceBoolean(value: any): boolean {
		switch (typeof value) {
			case "boolean": return value;
			case "string":
				switch (value) {
					case "true": return true;
					case "false": return false;
					default: return false;
				}
			default: return false;
		}
	}
	public static forceNumber(value: any): number {
		switch (typeof value) {
			case "number": return value;
			default:
				if (isNaN(value)) {
					return 0;
				} else {
					return value - 0;
				}
		}
	}
	public static getPathBottom(path: [number, number][]): number {
		let bottom = path[0][1];
		for (let i = 0; i < path.length; i++) {
			if (bottom < path[i][1]) {
				bottom = path[i][1];
			}
		}
		return bottom;
	}
	public static getPathLeft(path: [number, number][]): number {
		let left = path[0][0];
		for (let i = 0; i < path.length; i++) {
			if (left > path[i][0]) {
				left = path[i][0];
			}
		}
		return left;
	}
	public static getPathRight(path: [number, number][]): number {
		let right = path[0][0];
		for (let i = 0; i < path.length; i++) {
			if (right < path[i][0]) {
				right = path[i][0];
			}
		}
		return right;
	}
	public static getPathTop(path: [number, number][]): number {
		let top = path[0][1];
		for (let i = 0; i < Path2D.length; i++) {
			if (top > path[i][1]) {
				top = path[i][1];
			}
		}
		return top;
	}
	public static getRelativePositionX(x: number): number {
		return (x - KnitMapper.mapbox.nw[0]) * KnitMapper.parameter.getZoomLevel();
	}
	public static getRelativePositionZ(z: number): number {
		return (z - KnitMapper.mapbox.nw[1]) * KnitMapper.parameter.getZoomLevel();
	}
	public static isPathVisible(path: [number, number][]): boolean {
		let mapbox = KnitMapper.mapbox;
		let mapboxLeft = mapbox.nw[0];
		let mapboxRight = mapbox.ne[0];
		let mapboxTop = mapbox.nw[1];
		let mapboxBottom = mapbox.sw[1];
		let left = KnitMapper.util.getPathLeft(path);
		let right = KnitMapper.util.getPathRight(path);
		let top = KnitMapper.util.getPathTop(path);
		let bottom = KnitMapper.util.getPathBottom(path);
		let leftVisible = left - mapboxLeft > 0 && right - mapboxRight < 0;
		let rightVisible = right - mapboxLeft > 0 && right - mapboxRight < 0;
		let topVisible = top - mapboxTop > 0 && top - mapboxBottom < 0;
		let bottomVisible = bottom - mapboxTop > 0 && bottom - mapboxBottom < 0;
		let width = right - left;
		let screenWidth = mapboxRight - mapboxLeft;
		let horizontalVisible = (leftVisible || rightVisible) || width > screenWidth;
		let height = bottom - top;
		let screenHeight = mapboxBottom - mapboxTop;
		let verticalVisible = (topVisible || bottomVisible) || height > screenHeight;
		return horizontalVisible && verticalVisible;
	}
}

class KnitMapperZoom {
	public static mousewheel(e: WheelEvent) {
		let step = 0.1;
		if (KnitMapper.parameter.getZoomLevel() >= 6) {
			step = 0.2;
		}
		if (e.deltaY < 0) {
			KnitMapper.zoom.set(KnitMapper.parameter.getZoomLevel() + step);
		} else if (e.deltaY > 0) {
			KnitMapper.zoom.set(KnitMapper.parameter.getZoomLevel() - step);
		}
	}
	public static set(newZoom: number): void {
		if (newZoom <= 0) {
			newZoom = 0.1;
		}
		KnitMapper.parameter.setZoomLevel(KnitMapper.util.forceNumber(newZoom.toFixed(1)), true);
		KnitMapper.mapbox.update();
		(document.getElementById("zoom_level") as HTMLInputElement)!.value = KnitMapper.parameter.getZoomLevel().toString();
		KnitMapper.draw();
	}
}

export class KnitMapper {
	public static layers = KnitMapperLayers;
	public static mapbox = KnitMapperMapbox;
	public static menu = KnitMapperMenu;
	public static move = KnitMapperMove;
	public static parameter = KnitMapperParameter;
	public static util = KnitMapperUtil;
	public static zoom = KnitMapperZoom;
	public static draw(): void {
		document.getElementById("map_svg")!.innerHTML = "";
		let final: Map<number, string> = new Map();
		if (KnitMapper.parameter.getLayers().length == 0) { return; }
		if (KnitMapper.parameter.getLayers()[0] == "") { return; }
		for (let i = 0; i < KnitMapper.parameter.getLayers().length; i++) {
			let drown = KnitMapperData.getLayer(KnitMapper.parameter.getLayers()[i])?.draw(KnitMapper);
			if (drown == undefined || drown == null) {
				continue;
			}
			let keys = drown.keys();
			for (let key of keys) {
				final.set(key, final.get(key) ?? "" + drown.get(key) ?? "");
			}
		}
		let finalKeys = final.keys();
		let finalFinal = "";
		for (let key of finalKeys) {
			finalFinal += final.get(key);
		}
		document.getElementById("map_svg")!.innerHTML = finalFinal;
		document.getElementById("element_number")!.innerHTML = document.getElementById("map_svg")!.children.length.toString();
	}
	public static init(): void {
		if (location.search == "") {
			location.search = "?x=0&z=0&is_menu_shown=true&zoom_level=1&layers=cities,railway,buildings,road";
		}
		let search = location.search.slice(1).split("&");
		for (let i = 0; i < search.length; i++) {
			switch (search[i].split("=")[0]) {
				case "is_menu_shown":
					KnitMapper.parameter.setMenuShown(KnitMapper.util.forceBoolean(search[i].split("=")[1]), false);
					break;
				case "layers":
					KnitMapper.parameter.setLayers(search[i].split("=")[1].split(","), false);
					break;
				case "x":
					KnitMapper.parameter.setX(KnitMapper.util.forceNumber(search[i].split("=")[1]), false);
					break;
				case "z":
					KnitMapper.parameter.setZ(KnitMapper.util.forceNumber(search[i].split("=")[1]), false);
					break;
				case "zoom_level":
					KnitMapper.parameter.setZoomLevel(KnitMapper.util.forceNumber(search[i].split("=")[1]), false);
					break;
			}
		}
		KnitMapper.parameter.reload();
		document.getElementById("map")!.addEventListener("mousewheel", KnitMapper.zoom.mousewheel as EventListenerOrEventListenerObject, { passive: false });
		document.getElementById("map")!.addEventListener("pointermove", KnitMapper.move.mouse, { passive: false });
		document.getElementById("map")!.addEventListener("pointerdown", e => {
			let mapboxRect = document.getElementById("map")!.getClientRects()[0];
			let relativeX = e.pageX - mapboxRect.x;
			let relativeZ = e.pageY - mapboxRect.y;
			document.getElementById("mouse_center_x")!.innerText = (KnitMapper.mapbox.nw[0] + (relativeX / KnitMapper.parameter.getZoomLevel())).toFixed(2);
			document.getElementById("mouse_center_z")!.innerText = (KnitMapper.mapbox.nw[1] + (relativeZ / KnitMapper.parameter.getZoomLevel())).toFixed(2);
			if (e.target instanceof SVGElement && (e.target.nodeName == "rect" || e.target.nodeName == "path")) {
				let data = e.target.dataset;
				document.getElementById("menu_inner")!.innerHTML = KnitMapperData.getLayer(data["layer"])?.getData(data) ?? "";
				KnitMapper.move.latestHovered = e.target;
			}
			KnitMapper.move.latestTouched = [relativeX, relativeZ];
		}, { passive: true });
		document.getElementById("map")!.addEventListener("resize", KnitMapper.mapbox.update);
		document.getElementById("map")!.addEventListener("pointerup", e => {
			KnitMapper.parameter.setX(KnitMapper.parameter.getX(), true);
			KnitMapper.parameter.setZ(KnitMapper.parameter.getZ(), true);
			KnitMapper.parameter.setZoomLevel(KnitMapper.parameter.getZoomLevel(), true);
		});
		document.getElementById("layers_selector")!.addEventListener("change", KnitMapper.layers.reload);
		const mapboxChangeObserver = new ResizeObserver(entries => {
			KnitMapper.mapbox.update();
			KnitMapper.draw();
		});
		let map = document.getElementById("map");
		if (map != null) {
			mapboxChangeObserver.observe(map);
		}
		document.getElementById("zoom_level")!.addEventListener("change", e => {
			KnitMapper.mapbox.update();
			KnitMapper.draw();
		});
		KnitMapper.draw();
		let buttonMover = function (e: string) {
			let n = 10 / KnitMapper.parameter.getZoomLevel();
			let x = KnitMapper.parameter.getX();
			let z = KnitMapper.parameter.getZ();
			switch (e) {
				case "NW": KnitMapper.move.set(x - n, z - n); break;
				case "N": KnitMapper.move.set(x, z - n); break;
				case "NE": KnitMapper.move.set(x + n, z - n); break;
				case "W": KnitMapper.move.set(x - n, z); break;
				case "E": KnitMapper.move.set(x + n, z); break;
				case "SW": KnitMapper.move.set(x - n, z + n); break;
				case "S": KnitMapper.move.set(x, z + n); break;
				case "SE": KnitMapper.move.set(x + n, z + n); break;
			}
		}
		document.getElementById("button_mover_NW")!.addEventListener("click", e => buttonMover("NW"));
		document.getElementById("button_mover_N")!.addEventListener("click", e => buttonMover("N"));
		document.getElementById("button_mover_NE")!.addEventListener("click", e => buttonMover("NE"));
		document.getElementById("button_mover_W")!.addEventListener("click", e => buttonMover("W"));
		document.getElementById("button_mover_E")!.addEventListener("click", e => buttonMover("E"));
		document.getElementById("button_mover_SW")!.addEventListener("click", e => buttonMover("SW"));
		document.getElementById("button_mover_S")!.addEventListener("click", e => buttonMover("S"));
		document.getElementById("button_mover_SE")!.addEventListener("click", e => buttonMover("SE"));
		document.getElementById("zoom_plus")!.addEventListener("click", e => KnitMapper.zoom.set(KnitMapper.parameter.getZoomLevel() + 0.1));
		document.getElementById("zoom_minus")!.addEventListener("click", e => KnitMapper.zoom.set(KnitMapper.parameter.getZoomLevel() - 0.1));
		document.getElementById("menu_button")!.addEventListener("click", e => KnitMapper.menu.toggle());
	}
}