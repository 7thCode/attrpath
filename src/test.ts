const attrpath: any = require("./index");

/*
((0x3040 <= code) && (code <= 0x309F)) || // Hiragana
((0x30A0 <= code) && (code <= 0x30FF)) || // Katakana
((0x2E80 <= code) && (code <= 0x2FDF)) || // CJK部首補助＋康熙部首
((0x3400 <= code) && (code <= 0x4DBF)) || // CJK統合漢字拡張A
((0x4E00 <= code) && (code <= 0x9FFF)) || // CJK統合漢字
((0xF900 <= code) && (code <= 0xFAFF)) || // CJK互換漢字
((0x20000 <= code) && (code <= 0x2FFFF)) || // CJK統合漢字拡張B〜F＋CJK互換漢字
*/

const value = {
    Child: {
        _太郎: [
            {$pet: "pochi."}
        ],
        花子: {y: 1}
    }
};

function Test(v: any, s: string, r: unknown): string {
    let result = ""
    const value = attrpath.traverse(v, s);
    if (value === r) {
        result = "pass :\t" + s + " :\t" + value;
    } else {
        result = "error"
    }
    return result;
}

console.log(Test(value, '.Child._太郎[0].$pet', "pochi."));
console.log(Test(value, '.Child["_太郎"][0].$pet', "pochi."));
console.log(Test(value, '.Child["_太郎"][0]["$pet"]', "pochi."));
console.log(Test(value, '["Child"]["_太郎"][0]["$pet"]', "pochi."));
console.log(Test(value, ".Child['_太郎'][0].$pet", "pochi."));
console.log(Test(value, ".Child['_太郎'][0]['$pet']", "pochi."));
console.log(Test(value, "['Child']['_太郎'][0]['$pet']", "pochi."));
console.log(Test(value, '.Child._太郎[0].$pet', "pochi."));
console.log(Test(value, '["Child"]._太郎[0].$pet', "pochi."));

console.log(Test(value, '.Child1._太郎[0].$pet', undefined));
console.log(Test(value, '.Child1["_太郎"][0].$pet', undefined));
console.log(Test(value, '.Child1["_太郎"][0]["$pet"]', undefined));
console.log(Test(value, '["Child1"]["_太郎"][0]["$pet"]', undefined));
console.log(Test(value, ".Child1['_太郎'][0].$pet", undefined));
console.log(Test(value, ".Child1['_太郎'][0]['$pet']", undefined));
console.log(Test(value, "['Child1']['_太郎'][0]['$pet']", undefined));
console.log(Test(value, '.Child1._太郎[0].$pet', undefined));
console.log(Test(value, '["Child1"]._太郎[0].$pet', undefined));

console.log(Test(value, '.Child._太郎[1].$pet', undefined));
console.log(Test(value, '.Child["_太郎"][1].$pet', undefined));
console.log(Test(value, '.Child["_太郎"][1]["$pet"]', undefined));
console.log(Test(value, '["Child"]["_太郎"][1]["$pet"]', undefined));
console.log(Test(value, ".Child['_太郎'][1].$pet", undefined));
console.log(Test(value, ".Child['_太郎'][1]['$pet']", undefined));
console.log(Test(value, "['Child']['_太郎'][1]['$pet']", undefined));
console.log(Test(value, '.Child._太郎[1].$pet', undefined));
console.log(Test(value, '["Child"]._太郎[1].$pet', undefined));

console.log(Test(value, '.Child.._太郎[1].$pet', undefined));
console.log(Test(value, '.Child._太郎["1"].$pet', undefined));
console.log(Test(value, '.Child["_太郎"][1]["$pet"]', undefined));
console.log(Test(value, '["Child"]["_太郎"][1]["$pet"]', undefined));
console.log(Test(value, ".Child['_太郎'][1].$pet", undefined));
console.log(Test(value, ".Child['_太郎'][1]['$pet']", undefined));
console.log(Test(value, "['Child']['_太郎'][1]['$pet']", undefined));
console.log(Test(value, '.Child._太郎[1].$pet', undefined));
console.log(Test(value, '["Child"]._太郎[1].$pet', undefined));

//function Test2(s: string): boolean {
//    return attrpath.is_valid(s);
//}


// console.log(Test2( '.a.b'));
// console.log(Test2( '.a.b.c'));
// console.log(Test2( '.a..b'));
//
// console.log(Test2( '.Child._太郎[0].$pet'));
// console.log(Test2( '.Child.1太郎[0].$pet'));
//
// console.log(Test2( '.Child.._太郎[0]..$pet'));
// console.log(Test2( 'Child._太郎[0].$pet'));
/*
const large = {
    _id: {$oid: "61ee3509004f8b4447b4d89d"},
    enabled: true,
    name: "22-01-24 02:11:37",
    user_id: {$oid: "61ee215d004f8b4447b4d70a"},
    platform: {
        type: 0,
        _public: false,
        scope: 0,
        description: {
            club: 1,
            score: 66,
            postureScore: 65,
            ballisticScore: 67,
            studio: "studio1",
            sites: "site1",
            message: "",
            like: false
        },
        files: {
            sm: {
                video1: [{filename: "0bd3c6d99ae546d2bed338baeb1e9c93/movie.mp4", description: "side"}],
                video2: [{filename: "0bd3c6d99ae546d2bed338baeb1e9c93/movie2.mp4", description: "back"}],
                image1: [
                    {filename: "0bd3c6d99ae546d2bed338baeb1e9c93/sm-a0.png", description: "address"},
                    {filename: "0bd3c6d99ae546d2bed338baeb1e9c93/sm-a1.png", description: "backswing"},
                    {filename: "0bd3c6d99ae546d2bed338baeb1e9c93/sm-a2.png", description: "top"},
                    {filename: "0bd3c6d99ae546d2bed338baeb1e9c93/sm-a3.png", description: "halfdown"},
                    {filename: "0bd3c6d99ae546d2bed338baeb1e9c93/sm-a4.png", description: "impact"},
                    {filename: "0bd3c6d99ae546d2bed338baeb1e9c93/sm-a5.png", description: "follow"},
                    {filename: "0bd3c6d99ae546d2bed338baeb1e9c93/sm-a6.png", description: "finish"}
                ]
            }
        },
        username: "user1@aig.com",
        content: {
            mails: ["user1@aig.com"],
            nickname: "テストユーザー",
            id: "",
            description: "テストユーザー",
            image: "",
            friends: [],
            gender: null,
            age: 0,
            address: "",
            tel: "",
            language: "",
            religion: "",
            billing: {type: 0, credit: 0},
            height: 180,
            experience: 1,
            score: 1,
            driver: 1,
            seveniron: 1,
            rounds: 1,
            practice: 1,
            handicap: 1,
            stripe_id: "cus_L13KE0O521d71G"
        }
    },
    prizm: {
        ClubType: "DRIVER",
        DataList: [
            {Name: "トータル", "Unit": "Yard", "Value": 189.3},
            {Name: "左右ブレ", "Unit": "Yard", "Value": -2.8},
            {Name: "キャリー", "Unit": "Yard", "Value": 156.8},
            {Name: "キャリーブレ", "Unit": "Yard", "Value": -1.5},
            {Name: "ヘッドスピード", "Unit": "m/s", "Value": 39.5},
            {Name: "ボールスピード", "Unit": "m/s", "Value": 55.9},
            {Name: "ミート率", "Unit": "", "Value": 1.41},
            {Name: "打ち出し角 上下", "Unit": "度", "Value": 5.3},
            {Name: "打ち出し角 左右", "Unit": "度", "Value": 1.3},
            {Name: "バックスピン", "Unit": "rpm", "Value": 2349.7},
            {Name: "サイドスピン", "Unit": "rpm", "Value": -528.1},
            {Name: "ブロー角", "Unit": "度", "Value": 0},
            {Name: "ヘッド軌道", "Unit": "度", "Value": 0},
            {Name: "フェイス角", "Unit": "度", "Value": 0}
        ]
    },
    sm: {
        前傾角度: {
            "address": {"frame": 30, "metrics": 13.212105068983231, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": 17.51369157247251, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": 18.04778427143866, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": 19.716999025855763, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": 16.95333115111089, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": 8.863656627835395, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "°", "criterion": -1, "level": "NotJudged"}
        },
        "背骨の傾き": {
            "address": {"frame": 30, "metrics": 2.5029949929472983, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": 3.7872877621985865, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": 0.7900068496847616, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": -2.9171921811758565, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": -5.222473367962806, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": -5.298741762139579, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "°", "criterion": -1, "level": "NotJudged"}
        },
        "首元の動き": {
            "address": {"frame": 30, "metrics": 0, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": -2.3410424383277224, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": -5.2634214718720305, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": -5.104572517424744, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": -5.1180133609190275, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": -1.8097956067251937, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "cm", "criterion": -1, "level": "NotJudged"}
        },
        "右腰の動き": {
            "address": {"frame": 30, "metrics": 17.579324835859683, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": 14.293901665249944, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": 12.143194902876964, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": 19.08921978018234, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": 21.636302090662536, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": 22.379311480410387, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "°", "criterion": -1, "level": "NotJudged"}
        },
        "左腰の動き": {
            "address": {"frame": 30, "metrics": 12.468825432122957, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": 14.933978483143827, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": 16.418107934700203, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": 10.524557647943803, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": 8.276621607054361, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": 7.196272617565172, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "°", "criterion": -1, "level": "NotJudged"}
        },
        "重心の動き_正面": {
            "address": {"frame": 30, "metrics": 0, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": -2.337403491301125, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": -4.173036800040871, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": 3.121551142713858, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": 4.790971259962314, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": 5.1540483876030345, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "cm", "criterion": -1, "level": "NotJudged"}
        },
        "右膝の角度": {
            "address": {"frame": 30, "metrics": 28.471570430683215, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": 26.089207015904062, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": 27.523541163202264, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": 43.859931586913746, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": 42.27090009055745, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": 40.604215685315836, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "°", "criterion": -1, "level": "NotJudged"}
        },
        "手元の浮き": {
            "address": {"frame": 30, "metrics": 0, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": 11.285686797598913, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": 59.909498663516885, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": 12.045235713452389, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": 4.200984911204622, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": 45.81863513845849, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "cm", "criterion": -1, "level": "NotJudged"}
        },
        "左膝の角度": {
            "address": {"frame": 30, "metrics": 18.66048038363556, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": 21.789731192468885, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": 29.89377019869162, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": 45.1397775508709, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": 34.86695461890854, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": 25.628880573307054, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "°", "criterion": -1, "level": "NotJudged"}
        },
        "頭の動き": {
            "address": {"frame": 30, "metrics": 0, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": -1.6726272057368377, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": -5.4118493389566105, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": -6.674218553075338, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": -6.04384907927423, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": -4.631456443454656, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "cm", "criterion": -1, "level": "NotJudged"}
        },
        "両肩の傾き_正面": {
            "address": {"frame": 30, "metrics": -8.531724410866769, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": 7.911026842126874, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": 29.380522138527596, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": 3.806244681199202, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": -9.771166272920059, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": -29.589999668101974, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "°", "criterion": -1, "level": "NotJudged"}
        },
        "重心の動き_後方": {
            "address": {"frame": 30, "metrics": 0, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": -1.8299394739779564, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": -2.2984144940052764, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": -3.887472753463576, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": -2.7842486108414213, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": -2.1464783086341375, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "cm", "criterion": -1, "level": "NotJudged"}
        },
        "グリップ位置": {
            "address": {"frame": 30, "metrics": 26.624013020731073, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": -1, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": -1, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": -1, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": -1, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": -1, "unit": "cm", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "cm", "criterion": -1, "level": "NotJudged"}
        },
        "手首軌道": {
            "address": {"frame": 30, "metrics": -1, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": 59.09895565613158, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": 41.08990788622242, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": -1, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": -1, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": -1, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "°", "criterion": -1, "level": "NotJudged"}
        },
        "腰の開き": {
            "address": {"frame": 30, "metrics": -4.3815513987533015, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": -23.30493568630025, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": -32.29575565853219, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": -23.268760863585612, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": 1.1597250642895967, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": 20.168711684936838, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "°", "criterion": -1, "level": "NotJudged"}
        },
        "肩の開き": {
            "address": {"frame": 30, "metrics": 25.899123445830444, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "backswing": {"frame": 54, "metrics": -26.927650975305635, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "top": {"frame": 68, "metrics": -51.98661665535658, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "halfdown": {"frame": 98, "metrics": -29.914403653777548, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "impact": {"frame": 102, "metrics": -4.780889325405681, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "follow": {"frame": 106, "metrics": 38.29898113747191, "unit": "°", "criterion": -1, "level": "NotJudged"},
            "finish": {"frame": 114, "metrics": -1, "unit": "°", "criterion": -1, "level": "NotJudged"}
        }
    },
    create: {$date: {$numberLong: "1643033497524"}},
    modify: {$date: {$numberLong: "1643033497524"}},
}
*/
// console.log(Test(large, '._id.$oid', '61ee3509004f8b4447b4d89d'));
// console.log(Test(large, '.sm.腰の開き.impact.frame', 102));
// console.log(Test(large, '.sm.腰の開き..impact.frame', undefined));
// console.log(Test(large, '.sm.腰の開き."impact".frame', undefined));