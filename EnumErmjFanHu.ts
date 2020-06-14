export enum EnumErmjHuFanOpt {
    Chi      = 0,
    Peng     = 1,
    MingGang = 2,
    AnGang   = 3,
}

export enum EnumErmjCardId {
    /** 一万 */
    YiWan    = 1,
    /** 二万 */
    ErWan    = 2,
    /** 三万 */
    SanWan   = 3,
    /** 四万 */
    SiWan    = 4,
    /** 五万 */
    WuWan    = 5,
    /** 六万 */
    LiuWan   = 6,
    /** 七万 */
    QiWan    = 7,
    /** 八万 */
    BaWan    = 8,
    /** 九万 */
    JiuWan   = 9,
    /** 東 */
    DongFeng = 31,
    /** 南 */
    NanFeng  = 32,
    /** 西 */
    XiFeng   = 33,
    /** 北 */
    BeiFeng  = 34,
    /** 中 */
    Zhong    = 35,
    /** 发 */
    Fa       = 36,
    /** 白板 */
    Bai      = 37,
    /** 春 */
    Chun     = 41,
    /** 夏 */
    Xia      = 42,
    /** 秋 */
    Qiu      = 43,
    /** 冬 */
    DongTian = 44,
    /** 梅 */
    Mei      = 45,
    /** 兰 */
    Lan      = 46,
    /** 竹 */
    Zhu      = 47,
    /** 菊 */
    Ju       = 48,
}

export enum EnumErmjFanType {
    //_______________________1fan_________________________
    /** 二五八将 1 */
    ERWUBAJIANG,
    /** 自摸 */
    ZIMO,
    /**  单调将*/
	DANDIAOJIANG,
	/**  坎张*/
	KANZHANG,
	/**  边张*/
	BIANZHANG,
	/**  明杠*/
	MINGGANG,
	/**  幺九刻*/
	YAOJIUKE,
	/**  老少副 */
	LAOSHAOFU,
	/**  连六 */
	LIANLIU,
	/**  一般高 */
    YIBANGAO,
    //_______________________2fan_________________________
	/**  断幺 */
	DUANYAO,
	/**  暗杠 13 2*/
	ANGANG,
	/**  双暗刻 14 2*/
    SHUANGANKE,
    /**  四归一 15 2*/
	SIGUIYI,
	/**  平胡 16 2*/
	PINGHU,
	/**  门前清 17 2*/
	MENQIANQING,
	/**  门风刻 18 2*/
	MENFENGKE,
	/**  箭刻 19 2*/
	JIANKE,
    //_______________________4fan_________________________
    /**  报听 */
	BAOTING,
	/**  和绝张 20 4*/
	HUJUEZHANG,
	/**  双明杠 21 4*/
	SHUANGMINGGANG,
	/**  不求人 22 4*/
	BUQIUREN,
	/**  全带幺 23 4*/
	QUANDAIYAO,
	 //_______________________6fan_________________________
	/**  双箭刻 24 6*/
	SHUANGJIANKE,
	/**  全求人 25 6*/
	QUANQIUREN,
	/**  混一色 26 6*/
	HUNYISE,
	/**  双暗杠 27 6*/
	SHUANGANGANG,
	/**  碰碰胡 28 6*/
    PENGPENGHU,
    //_______________________8fan_________________________
	/**  抢杠胡 29 8*/
	QIANGGANGHU,
	/**  杠上开花 30 8*/
    GANGSHANGKAIHUA,
    /**  海底捞月 31 8*/
	HAIDILAOYUE,
	/**  妙手回春 32 8*/
	MIAOSHOUHUICHUN,
	//_______________________12fan_________________________
	/**  三风刻 33 12*/
	SANFENGKE,
	/**  小于五 34 12*/
	XIAOYUWU,
	/**  大于五 35 12*/
    DAYUWU,
    //_______________________16fan_________________________
	/**  三暗刻 36 16*/
	SANANKE,
	/**  天听 37 16*/
	TIANTING,
	/**  一色三步高 38 16*/
	YISESANBUGAO,
	/**  清龙 39 16*/
	QINGLONG,
	//_______________________24fan_________________________
	/**  一色三节高 40 24*/
	YISESANJIEGAO,
	/**  一色三同顺 41 24*/
	YISESANTONGSHUN,
	/**  清一色 42 24*/
	QINGYISE,
	/**  七对 43 24*/
	QIDUI,
	//_______________________32fan_________________________
	/**  混幺九 44 32*/
	HUNYAOJIU,
	/**  三杠 45 32*/
    SANGANG,
    /**  一色四步高 46 32*/
	YISESIBUGAO,
    //_______________________48fan_________________________
	/**  一色四节高 47 48*/
	YISESIJIEGAO,
	/**  一色四同顺 48 48*/
	YISESITONGSHUN,
	//_______________________64fan_________________________
	/**  一色双龙会 49 64*/
	YISESHUANGLONGHUI,
	/**  四暗刻 50 64*/
	SIANKE,
	/**  字一色 51 64*/
	ZIYISE,
	/**  小三元 52 64*/
	XIAOSANYUAN,
	/**  小四喜 53 64*/
	XIAOSIXI,
	//_______________________88fan_________________________
	/**  地胡 55 88*/
	DIHU,
	/**  天胡 56 88*/
	TIANHU,
	/**  连七对 57 88*/
	LIANQIDUI,
	/**  四杠 58 88*/
	SIGANG,
	/**  大七星 59 88*/
	DAQIXING,
	/**  九宝莲灯 60 88*/
	JIUBAOLIANDENG,
	/**  大三元 61 88*/
	DASANYUAN,
	/**  大四喜 62 88*/
	DASIXI,
}
const ErmjFanCfg = {
    //_______________________88fan_________________________
    [EnumErmjFanType.DASIXI]           : {name: "大四喜", fan  : 88},
    [EnumErmjFanType.DASANYUAN]        : {name: "大三元", fan  : 88},
    [EnumErmjFanType.JIUBAOLIANDENG]   : {name: "九宝莲灯", fan : 88},
    [EnumErmjFanType.DAQIXING]         : {name: "大七星", fan  : 88},
    [EnumErmjFanType.LIANQIDUI]        : {name: "连七对", fan  : 88},
    [EnumErmjFanType.SIGANG]           : {name: "四杠", fan   : 88},
    [EnumErmjFanType.DIHU]             : {name: "地胡", fan   : 88},
    [EnumErmjFanType.TIANHU]           : {name: "天胡", fan   : 88},
    //_______________________64fan_________________________
    [EnumErmjFanType.YISESHUANGLONGHUI]: {name: "一色双龙会", fan: 64},
    [EnumErmjFanType.SIANKE]           : {name: "四暗刻", fan  : 64},
    [EnumErmjFanType.ZIYISE]           : {name: "字一色", fan  : 64},
    [EnumErmjFanType.XIAOSANYUAN]      : {name: "小三元", fan  : 64},
    [EnumErmjFanType.XIAOSIXI]         : {name: "小四喜", fan  : 64},
    //_______________________48fan_________________________
    [EnumErmjFanType.YISESIJIEGAO]     : {name: "一色四节高", fan: 48},
    [EnumErmjFanType.YISESITONGSHUN]   : {name: "一色四同顺", fan: 48},
    //_______________________32fan_________________________
    [EnumErmjFanType.HUNYAOJIU]        : {name: "混幺九", fan  : 32},
    [EnumErmjFanType.SANGANG]          : {name: "三杠", fan   : 32},
    [EnumErmjFanType.YISESIBUGAO]      : {name: "一色四步高", fan: 32},
    //_______________________24fan_________________________
    [EnumErmjFanType.YISESANJIEGAO]    : {name: "一色三节高", fan: 24},
    [EnumErmjFanType.YISESANTONGSHUN]  : {name: "一色三同顺", fan: 24},
    [EnumErmjFanType.QINGYISE]         : {name: "清一色", fan  : 24},
    [EnumErmjFanType.QIDUI]            : {name: "七对", fan   : 24},
    //_______________________16fan_________________________
    [EnumErmjFanType.SANANKE]          : {name: "三暗刻", fan  : 16},
    [EnumErmjFanType.TIANTING]         : {name: "天听", fan   : 16},
    [EnumErmjFanType.YISESANBUGAO]     : {name: "一色三步高", fan: 16},
    [EnumErmjFanType.QINGLONG]         : {name: "清龙", fan   : 16},
    //_______________________12fan_________________________
    [EnumErmjFanType.SANFENGKE]        : {name: "三风刻", fan  : 12},
    [EnumErmjFanType.XIAOYUWU]         : {name: "小于五", fan  : 12},
    [EnumErmjFanType.DAYUWU]           : {name: "大于五", fan  : 12},
    //_______________________8fan_________________________
    [EnumErmjFanType.QIANGGANGHU]      : {name: "抢杠胡", fan  : 8},
    [EnumErmjFanType.GANGSHANGKAIHUA]  : {name: "杠上开花", fan : 8},
    [EnumErmjFanType.HAIDILAOYUE]      : {name: "海底捞月", fan : 8},
    [EnumErmjFanType.MIAOSHOUHUICHUN]  : {name: "妙手回春", fan : 8},
    //_______________________6fan_________________________
    [EnumErmjFanType.SHUANGJIANKE]     : {name: "双箭刻", fan  : 6},
    [EnumErmjFanType.QUANQIUREN]       : {name: "全求人", fan  : 6},
    [EnumErmjFanType.HUNYISE]          : {name: "混一色", fan  : 6},
    [EnumErmjFanType.SHUANGANGANG]     : {name: "双暗杠", fan  : 6},
    [EnumErmjFanType.PENGPENGHU]       : {name: "碰碰胡", fan  : 6},
    //_______________________4fan_________________________
    [EnumErmjFanType.HUJUEZHANG]       : {name: "和绝张", fan  : 4},
    [EnumErmjFanType.SHUANGMINGGANG]   : {name: "双明杠", fan  : 4},
    [EnumErmjFanType.BUQIUREN]         : {name: "不求人", fan  : 4},
    [EnumErmjFanType.QUANDAIYAO]       : {name: "全带幺", fan  : 4},
    [EnumErmjFanType.BAOTING]          : {name: "报听", fan   : 4},
    //_______________________2fan_________________________
   
    [EnumErmjFanType.DUANYAO]          : {name: "断幺", fan   : 2},
    [EnumErmjFanType.ANGANG]           : {name: "暗杠", fan   : 2},
    [EnumErmjFanType.SHUANGANKE]       : {name: "双暗刻", fan  : 2},
    [EnumErmjFanType.SIGUIYI]          : {name: "四归一", fan  : 2},
    [EnumErmjFanType.PINGHU]           : {name: "平胡", fan   : 2},
    [EnumErmjFanType.MENQIANQING]      : {name: "门前清", fan  : 2},
    [EnumErmjFanType.MENFENGKE]        : {name: "门风刻", fan  : 2},
    [EnumErmjFanType.JIANKE]           : {name: "箭刻", fan   : 2},
    //_______________________1fan_________________________
    [EnumErmjFanType.ERWUBAJIANG]      : {name: "二五八将", fan : 1},
    [EnumErmjFanType.ZIMO]             : {name: "自摸", fan   : 1},
    [EnumErmjFanType.DANDIAOJIANG]     : {name: "单调将", fan  : 1},
    [EnumErmjFanType.KANZHANG]         : {name: "坎张", fan   : 1},
    [EnumErmjFanType.BIANZHANG]        : {name: "边张", fan   : 1},
    [EnumErmjFanType.MINGGANG]         : {name: "明杠", fan   : 1},
    [EnumErmjFanType.YAOJIUKE]         : {name: "幺九刻", fan  : 1},
    [EnumErmjFanType.LAOSHAOFU]        : {name: "老少副", fan  : 1},
    [EnumErmjFanType.LIANLIU]          : {name: "连六", fan   : 1},
    [EnumErmjFanType.YIBANGAO]         : {name: "一般高", fan  : 1}
}

export {ErmjFanCfg};

