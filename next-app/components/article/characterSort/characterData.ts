export interface CharacterProfile {
  profileId: string;
  type: "SWEET" | "COOL" | "POP" | "---";
  grade: "1年" | "2年" | "3年" | "---";
  school:
    | "聖櫻学園"
    | "昇星高校"
    | "嵯峨椿高校"
    | "玉宮高校"
    | "鳳歌院高校"
    | "コラボ"
    | "幼少期"
    | "家族"
    | "マスコット";
}

//*********************************************************
//
// キャラクターリスト
//
// この部分を変更して下さい。名前の削除・追加も可能です。
// 名前を引用符(")で括り、コンマ(,)で区切って下さい。
//
//*********************************************************
export const CHARACTER_DATA: {[K in string]: CharacterProfile} = {
  "日野奏恵" : { profileId : "1", type : "SWEET", grade : "3年", school : "聖櫻学園" },
  "伊勢崎郁歩" : { profileId : "2", type : "SWEET", grade : "2年", school : "聖櫻学園" },
  "林田たまき" : { profileId : "3", type : "SWEET", grade : "3年", school : "聖櫻学園" },
  "島田泉" : { profileId : "4", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "鍋島ちより" : { profileId : "5", type : "SWEET", grade : "3年", school : "聖櫻学園" },
  "小倉愛" : { profileId : "6", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "岩本樹" : { profileId : "7", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "前田彩賀" : { profileId : "8", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "皆藤蜜子" : { profileId : "9", type : "COOL", grade : "3年", school : "聖櫻学園" },
  "遠山未涼" : { profileId : "10", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "伊勢谷里都" : { profileId : "11", type : "COOL", grade : "3年", school : "聖櫻学園" },
  "水野楓夏" : { profileId : "12", type : "COOL", grade : "---", school : "聖櫻学園" },
  "岸田稚慧" : { profileId : "13", type : "POP", grade : "2年", school : "聖櫻学園" },
  "小泉由佳" : { profileId : "14", type : "POP", grade : "1年", school : "聖櫻学園" },
  "緒川唯" : { profileId : "15", type : "POP", grade : "3年", school : "聖櫻学園" },
  "江藤くるみ" : { profileId : "16", type : "POP", grade : "1年", school : "聖櫻学園" },
  "東野梓" : { profileId : "17", type : "POP", grade : "2年", school : "聖櫻学園" },
  "早見英子" : { profileId : "18", type : "POP", grade : "2年", school : "聖櫻学園" },
  "桐山優月" : { profileId : "19", type : "POP", grade : "2年", school : "聖櫻学園" },
  "柊真琴" : { profileId : "20", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "神崎ミコト" : { profileId : "21", type : "COOL", grade : "---", school : "聖櫻学園" },
  "円城寺小菊" : { profileId : "22", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "西野彩音" : { profileId : "23", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "長谷川美卯" : { profileId : "24", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "川上瀬莉" : { profileId : "25", type : "SWEET", grade : "2年", school : "聖櫻学園" },
  "成瀬まなみ" : { profileId : "26", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "一色愛瑠" : { profileId : "27", type : "SWEET", grade : "3年", school : "聖櫻学園" },
  "五代律" : { profileId : "28", type : "COOL", grade : "3年", school : "聖櫻学園" },
  "竜ヶ崎珠里椏" : { profileId : "29", type : "COOL", grade : "1年", school : "聖櫻学園" },
  "上条るい" : { profileId : "30", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "南條クミコ" : { profileId : "31", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "赤瀬川摩姫" : { profileId : "32", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "雪風真弥" : { profileId : "33", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "李春燕" : { profileId : "34", type : "POP", grade : "2年", school : "聖櫻学園" },
  "羽鳥晶" : { profileId : "35", type : "POP", grade : "2年", school : "聖櫻学園" },
  "林田希羅" : { profileId : "36", type : "POP", grade : "1年", school : "聖櫻学園" },
  "綾小路美麗" : { profileId : "37", type : "POP", grade : "1年", school : "聖櫻学園" },
  "皆口英里" : { profileId : "38", type : "POP", grade : "2年", school : "聖櫻学園" },
  "山田はな" : { profileId : "39", type : "POP", grade : "2年", school : "聖櫻学園" },
  "高崎瑠依" : { profileId : "40", type : "POP", grade : "2年", school : "聖櫻学園" },
  "新垣雛菜" : { profileId : "41", type : "SWEET", grade : "2年", school : "聖櫻学園" },
  "八束由紀恵" : { profileId : "42", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "櫻井明音" : { profileId : "43", type : "POP", grade : "2年", school : "聖櫻学園" },
  "山野こだま" : { profileId : "44", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "白鳥詩織" : { profileId : "45", type : "SWEET", grade : "2年", school : "聖櫻学園" },
  "ユーリヤ・ヴャルコワ" : { profileId : "46", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "新田萌果" : { profileId : "47", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "南田七星" : { profileId : "48", type : "SWEET", grade : "2年", school : "聖櫻学園" },
  "正岡真衣" : { profileId : "49", type : "COOL", grade : "3年", school : "聖櫻学園" },
  "重藤秋穂" : { profileId : "50", type : "COOL", grade : "3年", school : "聖櫻学園" },
  "見吉奈央" : { profileId : "51", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "黒川凪子" : { profileId : "52", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "小野寺千鶴" : { profileId : "53", type : "POP", grade : "3年", school : "聖櫻学園" },
  "熊田一葉" : { profileId : "54", type : "POP", grade : "2年", school : "聖櫻学園" },
  "掛井園美" : { profileId : "55", type : "POP", grade : "2年", school : "聖櫻学園" },
  "大山真由里" : { profileId : "56", type : "POP", grade : "1年", school : "聖櫻学園" },
  "玉井麗巳" : { profileId : "57", type : "POP", grade : "3年", school : "聖櫻学園" },
  "優木苗" : { profileId : "58", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "東雲レイ" : { profileId : "59", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "湯川基世" : { profileId : "60", type : "POP", grade : "2年", school : "聖櫻学園" },
  "小日向いちご" : { profileId : "61", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "ミス・モノクローム" : { profileId : "62", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "姫島木乃子" : { profileId : "63", type : "POP", grade : "2年", school : "聖櫻学園" },
  "クロエ・ルメール" : { profileId : "64", type : "SWEET", grade : "3年", school : "聖櫻学園" },
  "椎名心実" : { profileId : "65", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "月白陽子" : { profileId : "66", type : "COOL", grade : "---", school : "聖櫻学園" },
  "村上文緒" : { profileId : "67", type : "COOL", grade : "3年", school : "聖櫻学園" },
  "霧生典子" : { profileId : "68", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "古谷朱里" : { profileId : "69", type : "POP", grade : "2年", school : "聖櫻学園" },
  "戸村美知留" : { profileId : "70", type : "POP", grade : "2年", school : "聖櫻学園" },
  "佐伯鞠香" : { profileId : "71", type : "SWEET", grade : "2年", school : "聖櫻学園" },
  "夢前春瑚" : { profileId : "72", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "飛原鋭子" : { profileId : "73", type : "COOL", grade : "3年", school : "聖櫻学園" },
  "不知火五十鈴" : { profileId : "74", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "望月エレナ" : { profileId : "75", type : "SWEET", grade : "3年", school : "聖櫻学園" },
  "鈴河凜乃" : { profileId : "76", type : "POP", grade : "2年", school : "聖櫻学園" },
  "笹原野々花" : { profileId : "77", type : "SWEET", grade : "3年", school : "聖櫻学園" },
  "神楽坂砂夜" : { profileId : "78", type : "COOL", grade : "3年", school : "聖櫻学園" },
  "春宮つぐみ" : { profileId : "79", type : "POP", grade : "2年", school : "聖櫻学園" },
  "螺子川来夢" : { profileId : "80", type : "POP", grade : "2年", school : "聖櫻学園" },
  "宮内希" : { profileId : "81", type : "POP", grade : "1年", school : "聖櫻学園" },
  "久保田友季" : { profileId : "82", type : "---", grade : "---", school : "聖櫻学園" },
  "荒井薫" : { profileId : "83", type : "---", grade : "---", school : "聖櫻学園" },
  "音羽ユリ" : { profileId : "84", type : "COOL", grade : "1年", school : "聖櫻学園" },
  "浅見景" : { profileId : "85", type : "SWEET", grade : "3年", school : "聖櫻学園" },
  "芹那" : { profileId : "86", type : "SWEET", grade : "1年", school : "コラボ" },
  "吉川繭子" : { profileId : "87", type : "POP", grade : "2年", school : "聖櫻学園" },
  "三科果歩" : { profileId : "88", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "橘響子" : { profileId : "92", type : "SWEET", grade : "---", school : "聖櫻学園" },
  "弓削楓" : { profileId : "93", type : "POP", grade : "3年", school : "聖櫻学園" },
  "鴫野睦" : { profileId : "97", type : "COOL", grade : "1年", school : "聖櫻学園" },
  "森園芽以" : { profileId : "98", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "葉月柚子" : { profileId : "99", type : "POP", grade : "1年", school : "聖櫻学園" },
  "九重忍" : { profileId : "100", type : "POP", grade : "3年", school : "聖櫻学園" },
  "朝比奈桃子" : { profileId : "101", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "畑山政子" : { profileId : "102", type : "---", grade : "---", school : "聖櫻学園" },
  "加賀美茉莉" : { profileId : "103", type : "SWEET", grade : "2年", school : "聖櫻学園" },
  "甘利燈" : { profileId : "104", type : "POP", grade : "1年", school : "聖櫻学園" },
  "石田いすき" : { profileId : "109", type : "POP", grade : "2年", school : "聖櫻学園" },
  "夏目真尋" : { profileId : "110", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "天都かなた" : { profileId : "111", type : "SWEET", grade : "3年", school : "聖櫻学園" },
  "有栖川小枝子" : { profileId : "112", type : "SWEET", grade : "3年", school : "聖櫻学園" },
  "君嶋里琉" : { profileId : "113", type : "COOL", grade : "1年", school : "聖櫻学園" },
  "時谷小瑠璃" : { profileId : "115", type : "POP", grade : "3年", school : "聖櫻学園" },
  "三嶋ゆらら" : { profileId : "116", type : "SWEET", grade : "3年", school : "聖櫻学園" },
  "押井知" : { profileId : "117", type : "POP", grade : "2年", school : "聖櫻学園" },
  "白瀬つづり" : { profileId : "119", type : "SWEET", grade : "2年", school : "聖櫻学園" },
  "風町陽歌" : { profileId : "120", type : "SWEET", grade : "2年", school : "聖櫻学園" },
  "相楽エミ" : { profileId : "121", type : "POP", grade : "2年", school : "聖櫻学園" },
  "千代浦あやめ" : { profileId : "122", type : "COOL", grade : "3年", school : "聖櫻学園" },
  "栢嶋乙女" : { profileId : "123", type : "POP", grade : "3年", school : "聖櫻学園" },
  "川淵一美" : { profileId : "124", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "芙来田伊吹" : { profileId : "125", type : "POP", grade : "1年", school : "聖櫻学園" },
  "橋本環奈" : { profileId : "137", type : "SWEET", grade : "1年", school : "コラボ" },
  "武内未美" : { profileId : "138", type : "POP", grade : "2年", school : "聖櫻学園" },
  "蓬田菫" : { profileId : "148", type : "POP", grade : "2年", school : "聖櫻学園" },
  "篠宮りさ" : { profileId : "156", type : "POP", grade : "2年", school : "聖櫻学園" },
  "七海四季" : { profileId : "164", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "織部千華" : { profileId : "166", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "吉永和花那" : { profileId : "168", type : "POP", grade : "3年", school : "聖櫻学園" },
  "祐天寺弥生" : { profileId : "172", type : "POP", grade : "---", school : "聖櫻学園" },
  "深見絵真" : { profileId : "176", type : "SWEET", grade : "---", school : "聖櫻学園" },
  "花房優輝" : { profileId : "179", type : "POP", grade : "2年", school : "聖櫻学園" },
  "鳴海調" : { profileId : "180", type : "SWEET", grade : "---", school : "聖櫻学園" },
  "反町牡丹" : { profileId : "183", type : "POP", grade : "3年", school : "昇星高校" },
  "浮橋明日香" : { profileId : "184", type : "SWEET", grade : "2年", school : "昇星高校" },
  "直江悠" : { profileId : "185", type : "COOL", grade : "3年", school : "昇星高校" },
  "朝門春日" : { profileId : "194", type : "SWEET", grade : "3年", school : "鳳歌院高校" },
  "牧瀬昴" : { profileId : "195", type : "POP", grade : "2年", school : "鳳歌院高校" },
  "久仁城雅" : { profileId : "196", type : "COOL", grade : "3年", school : "鳳歌院高校" },
  "藤堂静子" : { profileId : "199", type : "COOL", grade : "---", school : "聖櫻学園" },
  "真白透子" : { profileId : "200", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "豊永日々喜" : { profileId : "202", type : "POP", grade : "3年", school : "嵯峨椿高校" },
  "アネット・オルガ・唐澤" : { profileId : "203", type : "SWEET", grade : "3年", school : "嵯峨椿高校" },
  "三条八重" : { profileId : "204", type : "COOL", grade : "3年", school : "嵯峨椿高校" },
  "高良美空" : { profileId : "208", type : "POP", grade : "2年", school : "玉宮高校" },
  "高良美海" : { profileId : "209", type : "POP", grade : "2年", school : "玉宮高校" },
  "白水六花" : { profileId : "235", type : "SWEET", grade : "2年", school : "聖櫻学園" },
  "酒井田夏海" : { profileId : "236", type : "POP", grade : "3年", school : "聖櫻学園" },
  "奈木野さくら" : { profileId : "237", type : "SWEET", grade : "1年", school : "聖櫻学園" },
  "月隈林子" : { profileId : "238", type : "COOL", grade : "1年", school : "聖櫻学園" },
  "一ノ瀬友恵" : { profileId : "260", type : "COOL", grade : "2年", school : "聖櫻学園" },
  "若林璃子" : { profileId : "999", type : "---", grade : "3年", school : "聖櫻学園" },

  "ここのえしのぶ": { profileId: "c100", type : "POP", grade : "---", school : "幼少期" },
  "ささはらののか": { profileId: "c77", type : "SWEET", grade : "---", school : "幼少期" },
  "むらかみふみお": { profileId: "c67", type : "COOL", grade : "---", school : "幼少期" },
  "しらとりしおり": { profileId: "c45", type : "SWEET", grade : "---", school : "幼少期" },
  "かみじょうるい": { profileId: "c30", type : "COOL", grade : "---", school : "幼少期" },
  "とむらみちる": { profileId: "c70", type : "POP", grade : "---", school : "幼少期" },
  "あさみけい": { profileId: "c85", type : "SWEET", grade : "---", school : "幼少期" },
  "うきはしあすか": { profileId: "c184", type : "SWEET", grade : "---", school : "幼少期" },
  "ひいらぎまこと": { profileId: "c20", type : "SWEET", grade : "---", school : "幼少期" },
  "しいなここみ": { profileId: "c65", type : "COOL", grade : "---", school : "幼少期" },
  "たちばなきょうこ": { profileId: "c92", type : "SWEET", grade : "---", school : "幼少期" },
  "りゅうがさきじゅりあ": { profileId: "c29", type : "COOL", grade : "---", school : "幼少期" },
  "みしなかほ": { profileId: "c88", type : "SWEET", grade : "---", school : "幼少期" },

  "村上文乃": { profileId: "f67-1", type : "---", grade : "---", school : "家族" },
  "上条凛": { profileId: "f30-1", type : "---", grade : "---", school : "家族" },
  "葉月柑夏": { profileId: "f99-1", type : "---", grade : "---", school : "家族" },
  "見吉のどか": { profileId: "f51-1", type : "---", grade : "---", school : "家族" },
  "葉月哲也": { profileId: "f99-2", type : "---", grade : "---", school : "家族" },
  "朝比奈桜": { profileId: "f101-1", type : "---", grade : "---", school : "家族" },
  "朝比奈ひろし": { profileId: "f102-2", type : "---", grade : "---", school : "家族" },
  "コレット・ルメール": { profileId: "f64-3", type : "---", grade : "---", school : "家族" },
  "酒井田雪乃": { profileId: "f236-3", type : "---", grade : "---", school : "家族" },
  "不知火一寿": { profileId: "f74-1", type : "---", grade : "---", school : "家族" },

  "大将": { profileId: "m2", type : "---", grade : "---", school : "マスコット" },
} as const;

/**
 * キャラクター画像の全身版が存在するかどうかをbooleanで返答する。
 */
export function checkHasFullBodyImage(profileId: string): boolean {

  // サブキャラクターはfalse
  if (/^[a-z]/.test(profileId)) return false

  // 若林璃子はfalse
  if (profileId === "999") return false

  return true
}
