//川
//{name:undefined,width:5,path:[[-146,-50.5],[-59,-50.5]]}
//水域
//{name:undefined,text_appearance:[Infinity,Infinity],text_vertical:false,layer:0.path:[[-146,-53],[-93,-53],[-93,-48],[-146,-48]]}
//{name:undefined,text_appearance:[Infinity,Infinity],text_vertical:false,layer:0.path:[[-61,-87],[-58,-85],[-59,-77],[-61,-75],[-64,-75],[-67,-79],[-67,-82],[-63,-87]]}
//{name:undefined,text_appearance:[Infinity,Infinity],text_vertical:false,layer:0.path:[[-159,129],[-154,126],[-150,126],[-150,141],[-159,141]]}
//{name:undefined,text_appearance:[Infinity,Infinity],text_vertical:false,layer:0.path:[[-38,99],[-31,99],[-31,109],[-32,109],[-32,113],[-37,113],[-37,103],[-38,103]]}
//{name:undefined,text_appearance:[Infinity,Infinity],text_vertical:false,layer:0.path:[[-35,123],[-32,123],[-31,124],[-31,127],[-32,128],[-35,128],[-36,127],[-36,124]]}
export const buildings = [
	//霧島
	{ name: "霧島駅", use: "station", floor: 2, type: "rect", text_appearance: [3, Infinity], text_vertical: false, layer: 0, path: [[365, -20], [426, -11]] }
	//奏沢1丁目
	, { name: "奏沢駅", use: "station", floor: 2, type: "path", text_appearance: [3, Infinity], text_vertical: false, layer: 1, path: [[26, -27], [31, -27], [31, -19], [42, -19], [42, -21], [43, -21], [43, -31], [84, -31], [84, -15], [75, -15], [75, -22], [51, -22], [51, -11], [24, -11], [24, -19], [26, -19]] }
	//希望ヶ丘1丁目
	, { name: "希望ヶ丘駅", use: "station", floor: 2, type: "path", text_appearance: [3, Infinity], text_vertical: true, layer: 0, path: [[-257, -34], [-247, -34], [-247, 13], [-230, 13], [-230, 30], [-226, 30], [-226, 41], [-247, 41], [-247, 45], [-256, 45]] }
	, { name: "Knit邸", use: "house", floor: 3, type: "path", text_appearance: [6, Infinity], text_vertical: false, layer: 0, path: [[-166, 72], [-158, 72], [-158, 74], [-149, 74], [-149, 91], [-166, 91]] }
	, { name: "すべきぼ邸", use: "house", floor: 2, type: "rect", text_appearance: [6, Infinity], text_vertical: false, layer: 0, path: [[-146, 72], [-125, 91]] }
	, { name: undefined, use: "house", floor: 2, type: "path", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-120, 72], [-117, 72], [-117, 71], [-107, 71], [-107, 72], [-101, 72], [-101, 85], [-106, 85], [-106, 91], [-120, 91]] }
	, { name: undefined, use: "house", floor: 2, type: "path", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-146, 96], [-138, 96], [-138, 101], [-131, 101], [-131, 96], [-125, 96], [-125, 109], [-146, 109]] }
	, { name: undefined, use: "house", floor: 2, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-120, 94], [-101, 125]] }
	, { name: undefined, use: "house", floor: 2, type: "path", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-173, 149], [-156, 149], [-156, 160], [-169, 160], [-169, 159], [-169, 158], [-173, 158]] }
	, { name: undefined, use: "house", floor: 2, type: "path", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-146, 112], [-138, 112], [-138, 113], [-137, 113], [-137, 116], [-134, 116], [-134, 122], [-136, 122], [-136, 125], [-146, 125]] }
	, { name: undefined, use: "house", floor: 2, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-146, 135], [-125, 147]] }
	, { name: undefined, use: "house", floor: 2, type: "path", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-117, 133], [-105, 133], [-105, 145], [-115, 145], [-115, 142], [-117, 142]] }
	, { name: undefined, use: "house", floor: 5, type: "path", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-166, 17], [-157, 17], [-157, 53], [-166, 53], [-166, 42], [-170, 42], [-170, 37], [-166, 37], [-166, 33], [-170, 33], [-170, 28], [-166, 28]] }
	, { name: "希望ヶ丘団地", use: "house", floor: 5, type: "path", text_appearance: [6, Infinity], text_vertical: false, layer: 0, path: [[-134, 17], [-125, 17], [-125, 53], [-134, 53], [-134, 42], [-138, 42], [-138, 37], [-134, 37], [-134, 33], [-138, 33], [-138, 28], [-134, 28]] }
	, { name: undefined, use: "house", floor: 5, type: "path", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-103, 17], [-94, 17], [-94, 53], [-103, 53], [-103, 42], [-107, 42], [-107, 37], [-103, 37], [-103, 33], [-107, 33], [-107, 28], [-103, 28]] }
	, { name: "駐車場", use: "others", floor: 0, type: "path", text_appearance: [6, Infinity], text_vertical: false, layer: 0, path: [[-125, -31], [-115, -31], [-115, -13], [-112, -13], [-112, -31], [-94, -31], [-94, -13], [-77, -13], [-77, 7], [-125, 7]] }
	, { name: undefined, use: "others", floor: 1, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-85, -34], [-81, -29]] }
	, { name: undefined, use: "others", floor: 2, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-82, -25], [-64, -16]] }
	, { name: "交番", use: "others", floor: 1, type: "path", text_appearance: [6, Infinity], text_vertical: false, layer: 0, path: [[-77, -6], [-64, -6], [-64, 3], [-68, 7], [-77, 7]] }
	, { name: undefined, use: "others", floor: 2, type: "path", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-77, 10], [-65, 10], [-65, 12], [-64, 12], [-64, 21], [-70, 21], [-70, 24], [-77, 24]] }
	, { name: undefined, use: "others", floor: 1, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-75, 27], [-64, 46]] }
	, { name: undefined, use: "others", floor: 3, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-82, 54], [-70, 69]] }
	, { name: undefined, use: "others", floor: 10, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-86, 77], [-65, 106]] }
	, { name: undefined, use: "others", floor: 10, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-86, 125], [-65, 161]] }
	//希望ヶ丘2丁目
	, { name: undefined, use: "others", floor: 2, type: "path", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-40, -27], [-27, -27], [-27, -8], [-42, -8], [-42, -25]] }
	, { name: undefined, use: "others", floor: 1, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-43, -2], [-27, 16]] }
	, { name: undefined, use: "others", floor: 0, type: "path", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-43, 19], [-42, 19], [-42, 20], [-41, 20], [-41, 24], [-43, 24]] }
	, { name: undefined, use: "others", floor: 2, type: "path", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-43, 24], [-31, 24], [-31, 33], [-35, 33], [-35, 44], [-43, 44]] }
	, { name: undefined, use: "others", floor: 2, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-43, 48], [-31, 61]] }
	, { name: undefined, use: "others", floor: 1, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-29, 64], [-17, 90]] }
	, { name: undefined, use: "others", floor: 2, type: "path", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-31, 99], [-16, 99], [-16, 129], [-29, 129], [-29, 115], [-31, 115]] }
	, { name: undefined, use: "others", floor: 21, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-43, 138], [-25, 152]] }
	, { name: "駐車場", use: "others", floor: 0, type: "path", text_appearance: [6, Infinity], text_vertical: false, layer: 0, path: [[2, -16], [8, -16], [8, -14], [16, -14], [16, 23], [2, 23]] }
	, { name: undefined, use: "park", floor: 0, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[24, -13], [40, 1]] }
	, { name: undefined, use: "others", floor: 1, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[21, -3], [24, 1]] }
	, { name: "公衆トイレ", use: "others", floor: 1, type: "rect", text_appearance: [6, Infinity], text_vertical: true, layer: 0, path: [[40, -6], [44, 1]] }
	, { name: undefined, use: "others", floor: 3, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[30, 5], [42, 20]] }
	, { name: "カフェ-Life", use: "others", floor: 1, type: "rect", text_appearance: [6, Infinity], text_vertical: false, layer: 0, path: [[32, 27], [45, 43]] }
	//希望ヶ丘3丁目
	, { name: "鳥居", use: "others", floor: 0, type: "path", text_appearance: [12, Infinity], text_vertical: false, layer: 0, path: [[-83, -63], [-76, -54], [-77, -53], [-84, -62]] }
	, { name: undefined, use: "others", floor: 0, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-51, -65], [-42, -60]] }
	, { name: "本殿", use: "others", floor: 1, type: "path", text_appearance: [12, Infinity], text_vertical: false, layer: 0, path: [[-58, -105], [-35, -105], [-35, -91], [-44, -91], [-44, -89], [-49, -89], [-49, -91], [-58, -91]] }
	, { name: undefined, use: "others", floor: 0, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-63, -72], [-61, -64]] }
	, { name: undefined, use: "others", floor: 0, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-59, -72], [-57, -64]] }
	, { name: undefined, use: "others", floor: 0, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-57, -87], [-56, -80]] }
	, { name: undefined, use: "others", floor: 0, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-55, -87], [-54, -80]] }
	, { name: undefined, use: "others", floor: 0, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-53, -87], [-52, -80]] }
	, { name: undefined, use: "others", floor: 0, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[-51, -87], [-50, -80]] }
	, { name: undefined, use: "others", floor: 4, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[23, -44], [40, -27]] }
	, { name: "クロダ製鉄所", use: "others", floor: 1, type: "rect", text_appearance: [6, Infinity], text_vertical: false, layer: 0, path: [[-7, 27], [27, 44]] }
	, { name: undefined, use: "others", floor: 1, type: "path", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[3, 47], [33, 47], [33, 57], [37, 57], [37, 66], [3, 66], [3, 63], [0, 63], [0, 73], [30, 73], [30, 86], [-4, 86], [-4, 73], [-3, 73], [-3, 53], [3, 53]] }
	, { name: "奏沢東交番", use: "others", floor: 2, type: "path", text_appearance: [6, Infinity], text_vertical: false, layer: 0, path: [[36, 76], [43, 76], [45, 78], [45, 85], [43, 87], [36, 87], [34, 85], [34, 78]] }
	, { name: undefined, use: "others", floor: 1, type: "rect", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[30, 119], [45, 135]] }
	, { name: undefined, use: "others", floor: 2, type: "path", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[30, 138], [39, 138], [39, 137], [44, 137], [46, 139], [46, 165], [47, 165], [47, 173], [21, 173], [21, 146]] }
	, { name: undefined, use: "others", floor: 2, type: "path", text_appearance: [Infinity, Infinity], text_vertical: false, layer: 0, path: [[24, 176], [45, 176], [45, 199], [39, 205], [24, 205]] }
];
export const cities = [
	{ name: "希望ヶ丘１丁目", pronunciation: "きぼうがおかいっちょうめ", type: "path", text_vertical: true, path: [[-186.5, -38], [-57, -38], [-57, 166], [-93.5, 179], [-180, 207.5], [-186.5, 207.5]] }
	, { name: "希望ヶ丘２丁目", pronunciation: "きぼうがおかにちょうめ", type: "path", text_vertical: true, path: [[-51, -37.5], [-16, -37.5], [0.5, -31.5], [4.5, -18.5], [51, -18.5], [54.5, -18.5], [54.5, 252], [-51, 252]] }
	, { name: "希望ヶ丘３丁目", pronunciation: "きぼうがおかさんちょうめ", type: "path", text_vertical: false, path: [[-186.5, -116], [54.5, -116], [54.5, -18.5], [51, -18.5], [4.5, -18.5], [0.5, -31.5], [-16, -37.5], [-186.5, -37.5]] }
	, { name: "奏沢１丁目", pronunciation: "かなでさわいっちょうめ", type: "path", text_vertical: false, path: [[62.5, -71.5], [230, -71.5], [230, 69], [62.5, 69]] }
];
export const railways = [
	{ name: undefined, path: [[14.5, -48], [14.5, -15.5], [17, -10], [23, -7.5], [431, -7.5]] }
	, { name: undefined, path: [[-259.5, -35], [-259.5, 92]] }
];
export const roads = [
	{ name: undefined, width: 5, path: [[-186.5, -116], [-186.5, 352]] }
	, { name: undefined, width: 5, path: [[-192.5, -116], [-192.5, 352]] }
	, { name: undefined, width: 5, path: [[-198.5, -116], [-198.5, 352]] }
	, { name: undefined, width: 5, path: [[-204.5, -116], [-204.5, 352]] }
	, { name: undefined, width: 5, path: [[-184, 64.5], [-100.5, 64.5], [-96, 67], [-93.5, 71], [-93.5, 179]] }
	, { name: undefined, width: 5, path: [[-184, 207.5], [-180, 207.5], [-58, 166.5]] }
	, { name: undefined, width: 5, path: [[-184, -37.5], [-16, -37.5], [0.5, -31.5], [4.5, -18.5], [51, -18.5]] }
	, { name: undefined, width: 5, path: [[-56.5, -36], [-56.5, 901]] }
	, { name: undefined, width: 5, path: [[-50.5, -36], [-50.5, 901]] }
	, { name: undefined, width: 7, path: [[54.5, -182], [54.5, 252]] }
	, { name: undefined, width: 7, path: [[62.5, -182], [62.5, 252]] }
	, { name: undefined, width: 5, path: [[66, -132.5], [79, -132.5]] }
	, { name: undefined, width: 7, path: [[66, -79.5], [316, -79.5]] }
	, { name: undefined, width: 7, path: [[66, -71.5], [316, -71.5]] }
	, { name: undefined, width: 5, path: [[230.5, -68], [230.5, 67]] }
	, { name: undefined, width: 5, path: [[66, 69.5], [237, 69.5], [243, 73], [246.5, 80], [246.5, 87]] }
	, { name: undefined, width: 5, path: [[137.5, 67], [137.5, 62]] }
	, { name: undefined, width: 5, path: [[207.5, 67], [207.5, 62]] }
	, { name: undefined, width: 5, path: [[66, 31.5], [84, 31.5]] }
	, { name: undefined, width: 5, path: [[51, 11.5], [46, 11.5]] }
	, { name: undefined, width: 5, path: [[51, 69.5], [35, 69.5]] }
	, { name: undefined, width: 5, path: [[41, 67], [41, 56]] }
	, { name: undefined, width: 5, path: [[51, 96.5], [42, 96.5]] }
	, { name: undefined, width: 5, path: [[66, 109.5], [70, 109.5]] }
	, { name: undefined, width: 4, path: [[-14, -35], [-14, -2]] }
	, { name: undefined, width: 5, path: [[-48, 40.5], [-43, 40.5]] }
	, { name: undefined, width: 7, path: [[-59, 60.5], [-64, 60.5]] }
	, { name: undefined, width: 13, path: [[-59, 113.5], [-65, 113.5]] }
	, { name: undefined, width: 5, path: [[-88.5, -35], [-88.5, -13]] }
	, { name: undefined, width: 5, path: [[-88.5, -40], [-88.5, -54]] }
];