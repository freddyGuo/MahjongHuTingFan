import { EnumErmjHuFanOpt, EnumErmjFanType, EnumErmjCardId } from "./EnumErmjFanHu";

/**
 * 二人麻将手牌的数据类型
 */
export class ErmjHuEstimateResult  {
    /** 刻子数量 */
    Num_ke    : number = 0;  
    /** 顺子数量 */
    Num_shun  : number = 0;
    /** 将牌值 */
    Jiang     : number = -1;;
    /** 刻子数组 */
    Array_ke  : number[][] = [];
    /** 顺子数组 */
    Array_shun: number[][] = [];
    /** 是否七对 */
    Qidui     : boolean = false;
    /** 是否通天 */
	Tongtian  : boolean = false;
}


/**
 * 二人麻将算番数据结构
 */
export class ErmjFanCardData {
    /** 将牌值 */
    Jiang       : number = -1;
    /** 刻子数组 只列第一个 索引(包含暗刻 和碰) */
    Array_ke    : number[][] = [];
    /** 暗刻 */
    Array_a_ke  : number[][] = [];
    /** 顺子数组 只列第一个 */
    Array_shun  : number[][] = [];
    /** 吃牌获得的顺子 */
    Array_c_shun: number[][] = [];
    /** 手牌中的顺子 */
    Array_h_shun: number[][] = [];
    /** 杠数组 只列第一个 (包含明杠 暗杠) */
    Array_gang  : number[][] = [];
    /** 明杠 */
    Array_m_gang: number[][] = [];
    /** 暗杠 */
    Array_a_gang: number[][] = [];
    /** 玩家每个ID的数量信息 */
    IdNumData :Object = {};
    /** 玩家所有不重复牌ID Set结构  */
    IdSet:Set<number>;
    /** 玩家所有不重复牌ID 数组结构  */
    IdArray: number[];
    /** 所有的牌 */
    AllCard:number[] = [];
    /** 是否七对 */
    QiDui       : boolean = false;
    /** 是否通天 */
    TongTian    : boolean = false;
    /** 是否自摸 */
    Zimo        : boolean = false;
    /** 胡牌那张 唯一id */
    HuId        : number = -1;
    // /** 胡得那张牌得索引 */
    // HuIndex     : number = -1;
    /** 当前胡牌玩家门风（庄为31东 闲家为33西） */
    MenFeng     : number = -1;
    /**  是否报听 */
    TingBool    : boolean = false;  
    /** 是否最后一张牌 */
    isLaskCard: boolean = false;
    /** 是否是刚上开花 */
    gangShangFlower: boolean = false;
    /** 是否抢杠胡 */
    isQiangGangHu: boolean = false;
    /** 是否胡绝张 */
    isHuJueZhang: boolean = false;
}


export class ErmjFanChiPengCard {
    /*** 吃碰杠的牌 */
    cardList:number[] = []; 
    /** 0吃1碰2明杠3暗杠 */
    tag:EnumErmjHuFanOpt = EnumErmjHuFanOpt.Chi;
}

export class ErmjFanResultData {
    /** 已经匹配的方式  */
    matchList:EnumErmjFanType[] = [];
    /** 不能在匹配的番方法 */
    rejectList:Set<EnumErmjFanType> = new Set();
    fanNum:number = 0;
    detailFanData = [];
}
/**
 * 去获取番的基本信息
 */
export class ErmjFanHuInfo {
    /** 是否自摸 */
    isZiMo:boolean = false;
    /** 是否是最后一张牌 */
    isLastCard:boolean = false;
    /** 当前胡牌玩家门风（庄为31东 闲家为33西） */
    MenFeng     : number = -1;
    /**  是否报听 */
    TingBool    : boolean = false;  
     /** 是否是刚上开花 */
    gangShangFlower: boolean = false;
    /** 是否抢杠胡 */
    isQiangGangHu: boolean = false;
    /** 是否胡绝张 */
    isHuJueZhang: boolean = false;
    /** 胡牌那张id */
    HuCardId        : EnumErmjCardId;
}

export class ErmjTingBaseInfo {
    /** 听牌ID */
    tingCardId:EnumErmjCardId;
    /** 打掉听牌ID后可以胡哪些牌 */
    huCardIdList:EnumErmjCardId[];
    /** 测试的手牌除去听牌ID的列表 */
    testCardList:EnumErmjCardId[];
}