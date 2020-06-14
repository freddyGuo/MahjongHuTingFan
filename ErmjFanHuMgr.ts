import { ErmjFanChiPengCard, ErmjHuEstimateResult, ErmjFanCardData, ErmjFanHuInfo as ErmjFanHuInfo, ErmjFanResultData, ErmjTingBaseInfo } from "./ErmjFanDataType";
import ErmjHuPaiEstimate from "./ErmjHuEstimate";
import { EnumErmjHuFanOpt, EnumErmjFanType, ErmjFanCfg, EnumErmjCardId } from "./EnumErmjFanHu";
import ErmjFanFunc from "./ErmjFanFunc";
/**
 * 获取麻将的番数，牌ID为：EnumErmjCardId
 * 
 * 使用此方法时请先手动把ID转换一致
*/
export default class ErmjFanHuMgr {
    private _storeFanList:object = {};
    private static  _instance:ErmjFanHuMgr;
    private mFanFuncList;
    private _playMjIdList:EnumErmjCardId[] = [EnumErmjCardId.YiWan, EnumErmjCardId.ErWan, EnumErmjCardId.SanWan,
        EnumErmjCardId.SiWan, EnumErmjCardId.WuWan, EnumErmjCardId.LiuWan, EnumErmjCardId.QiWan,
        EnumErmjCardId.BaWan, EnumErmjCardId.JiuWan, EnumErmjCardId.DongFeng, EnumErmjCardId.XiFeng,
        EnumErmjCardId.NanFeng, EnumErmjCardId.BeiFeng, EnumErmjCardId.Zhong, EnumErmjCardId.Fa,
        EnumErmjCardId.Bai
    ]
    static getInstance():ErmjFanHuMgr{
        if(!this._instance){
            this._instance = new ErmjFanHuMgr();
        }
        return this._instance;
    }

    static releaseInstance(){
        this._instance && (this._instance._clean())
        this._instance = undefined;
    }

    private _addFanFunc(type:EnumErmjFanType, func:Function){
        this.mFanFuncList.push({
            type:type,
            func:func
        }) 
    }
    /**
     * 初始化番判定函数
     */
    private _initFanFuncList(){
        this.mFanFuncList = [];
        this._addFanFunc(EnumErmjFanType.DASIXI, ErmjFanFunc.IsBigFourHappy);                 //大四喜
        this._addFanFunc(EnumErmjFanType.DASANYUAN, ErmjFanFunc.IsDaSanYuan);                 //大三元
        this._addFanFunc(EnumErmjFanType.JIUBAOLIANDENG, ErmjFanFunc.IsJiuLianBaoDeng);       //九莲宝灯
        this._addFanFunc(EnumErmjFanType.DAQIXING, ErmjFanFunc.IsDaQiXing);                   //大七星
        this._addFanFunc(EnumErmjFanType.SIGANG, ErmjFanFunc.IsSiGang);                       //四杠
        this._addFanFunc(EnumErmjFanType.LIANQIDUI, ErmjFanFunc.IsLianQiDui);                 //连七对
        this._addFanFunc(EnumErmjFanType.XIAOSIXI, ErmjFanFunc.IsXiaoSiXi);                   //小四喜
        this._addFanFunc(EnumErmjFanType.XIAOSANYUAN, ErmjFanFunc.IsXiaoSanYuan);             //小三元
        this._addFanFunc(EnumErmjFanType.ZIYISE, ErmjFanFunc.IsZiYiSe);                       //字一色
        this._addFanFunc(EnumErmjFanType.SIANKE, ErmjFanFunc.IsSiAnKe);                       //四暗刻
        this._addFanFunc(EnumErmjFanType.YISESHUANGLONGHUI, ErmjFanFunc.IsYiSeShuangLongHui); //一色双龙会
        this._addFanFunc(EnumErmjFanType.YISESITONGSHUN, ErmjFanFunc.IsYiSeSiTongShun);       //一色四同顺
        this._addFanFunc(EnumErmjFanType.YISESIJIEGAO, ErmjFanFunc.IsYiSeSiJieGao);           //一色四节高
        this._addFanFunc(EnumErmjFanType.YISESIBUGAO, ErmjFanFunc.IsYiSeSiBuGao);             //一色四步高
        this._addFanFunc(EnumErmjFanType.SANGANG, ErmjFanFunc.IsSanGang);                     //三杠
        this._addFanFunc(EnumErmjFanType.HUNYAOJIU, ErmjFanFunc.IsHunYaoJiu);                 //混幺九
        this._addFanFunc(EnumErmjFanType.QIDUI, ErmjFanFunc.IsQiDui);                         //七对
        this._addFanFunc(EnumErmjFanType.QINGYISE, ErmjFanFunc.IsQingYiSe);                   //清一色
        this._addFanFunc(EnumErmjFanType.YISESANTONGSHUN, ErmjFanFunc.IsYiSeSanTongShun);     //一色三同顺
        this._addFanFunc(EnumErmjFanType.YISESANJIEGAO, ErmjFanFunc.IsYiSeSanJieGao);         //一色三节高
        this._addFanFunc(EnumErmjFanType.QINGLONG, ErmjFanFunc.IsQingLong);                   //清龙
        this._addFanFunc(EnumErmjFanType.YISESANBUGAO, ErmjFanFunc.IsYiSeSanBuGao);           //一色三步高
        this._addFanFunc(EnumErmjFanType.TIANTING, ErmjFanFunc.IsTianTing);                   //天听
        this._addFanFunc(EnumErmjFanType.SANANKE, ErmjFanFunc.IsSanAnKe);                     //三暗刻
        this._addFanFunc(EnumErmjFanType.DAYUWU, ErmjFanFunc.IsDaYuWu);                       //大于五
        this._addFanFunc(EnumErmjFanType.XIAOYUWU, ErmjFanFunc.IsXiaoYuWu);                   //小于五
        this._addFanFunc(EnumErmjFanType.SANFENGKE, ErmjFanFunc.IsSanFengKe);                 //三风刻
        this._addFanFunc(EnumErmjFanType.MIAOSHOUHUICHUN, ErmjFanFunc.IsMiaoShouHuiChun);     //妙手回春
        this._addFanFunc(EnumErmjFanType.HAIDILAOYUE, ErmjFanFunc.IsHaiDiLaoYue);             //海底捞月
        this._addFanFunc(EnumErmjFanType.GANGSHANGKAIHUA, ErmjFanFunc.IsGangShangKaiHua);     //杠上开花	上层方法计算
        this._addFanFunc(EnumErmjFanType.QIANGGANGHU, ErmjFanFunc.IsQiangGangHu);             //抢杠胡	上层方法计算
        this._addFanFunc(EnumErmjFanType.PENGPENGHU, ErmjFanFunc.IsPengPengHu);               //碰碰胡
        this._addFanFunc(EnumErmjFanType.SHUANGANGANG, ErmjFanFunc.IsShuangAnGang);           //双暗杠
        this._addFanFunc(EnumErmjFanType.HUNYISE, ErmjFanFunc.IsHunYiSe);                     //混一色
        this._addFanFunc(EnumErmjFanType.QUANQIUREN, ErmjFanFunc.IsQuanQiuRen);               //全求人
        this._addFanFunc(EnumErmjFanType.SHUANGJIANKE, ErmjFanFunc.IsShuangJianKe);           //双箭刻
        this._addFanFunc(EnumErmjFanType.QUANDAIYAO, ErmjFanFunc.IsQuanDaiYao);               //全带幺
        this._addFanFunc(EnumErmjFanType.BUQIUREN, ErmjFanFunc.IsBuQiuRen);                   //不求人
        this._addFanFunc(EnumErmjFanType.SHUANGMINGGANG, ErmjFanFunc.IsShuangMingGang);       //双明杠
        this._addFanFunc(EnumErmjFanType.HUJUEZHANG, ErmjFanFunc.IsHuJueZhang);               //胡绝张
        this._addFanFunc(EnumErmjFanType.JIANKE, ErmjFanFunc.IsJianKe);                       //箭刻
        this._addFanFunc(EnumErmjFanType.MENFENGKE, ErmjFanFunc.IsMenFengKe);                 //门风刻
        this._addFanFunc(EnumErmjFanType.MENQIANQING, ErmjFanFunc.IsMenQianQing);             //门前清
        this._addFanFunc(EnumErmjFanType.PINGHU, ErmjFanFunc.IsPingHu);                       //平胡
        this._addFanFunc(EnumErmjFanType.SIGUIYI, ErmjFanFunc.IsSiGuiYi);                     //四归一
        this._addFanFunc(EnumErmjFanType.SHUANGANKE, ErmjFanFunc.IsShuangAnKe);               //双暗刻
        this._addFanFunc(EnumErmjFanType.ANGANG, ErmjFanFunc.IsAnGang);                       //暗杠
        this._addFanFunc(EnumErmjFanType.DUANYAO, ErmjFanFunc.IsDuanYao);                     //断幺
        this._addFanFunc(EnumErmjFanType.BAOTING, ErmjFanFunc.IsBaoTing);                     //报听
        this._addFanFunc(EnumErmjFanType.YIBANGAO, ErmjFanFunc.IsYiBanGao);                   //一般高
        this._addFanFunc(EnumErmjFanType.LIANLIU, ErmjFanFunc.IsLianLiu);                     //连六
        this._addFanFunc(EnumErmjFanType.LAOSHAOFU, ErmjFanFunc.IsLaoShaoFu);                 //老少副
        this._addFanFunc(EnumErmjFanType.YAOJIUKE, ErmjFanFunc.IsYaoJiuKe);                   //幺九刻
        this._addFanFunc(EnumErmjFanType.MINGGANG, ErmjFanFunc.IsMingGang);                   //明杠
        this._addFanFunc(EnumErmjFanType.BIANZHANG, ErmjFanFunc.IsBianZhang);                 //边张
        this._addFanFunc(EnumErmjFanType.KANZHANG, ErmjFanFunc.IsKanZhang);                   //坎张
        this._addFanFunc(EnumErmjFanType.DANDIAOJIANG, ErmjFanFunc.IsDanDiaoJiang);           //单钓将
        this._addFanFunc(EnumErmjFanType.ZIMO, ErmjFanFunc.IsZiMo);                           //自摸
        this._addFanFunc(EnumErmjFanType.ERWUBAJIANG, ErmjFanFunc.IsErWuBaJiang);             //二五八将
    }
    /**
     * 后去番判定函数列表
     */
    private get fanFunList(){
        if(!this.mFanFuncList){
            this._initFanFuncList();
        }
        return this.mFanFuncList;
    } 

    private _clean(){
        this._storeFanList = {};
    }
    /**
     * 解析牌数据， 并计算番数
     * @param handCardList 
     * @param OptCardList 
     * @param isZimo 
     * @param huId 
     * @param huIndex 
     */
    private _doGetFanResult(handCardList:number[], OptCardList:ErmjFanChiPengCard[], huInfo:ErmjFanHuInfo):ErmjFanResultData{
        let huEstimate = new ErmjHuPaiEstimate(handCardList);
        huEstimate.testAllCombineResult();
        let maxResult:ErmjFanResultData = new ErmjFanResultData();
        if(huEstimate.resultList.length > 0){
            huEstimate.resultList.forEach((result:ErmjHuEstimateResult)=>{
                console.log("result ", result);
                let fanData = this._initCardFanData(handCardList, OptCardList, huInfo, result);
                console.log("fanData ", fanData);
                let fanResult = new ErmjFanResultData();   
                this.fanFunList.forEach(item=>{
                    if(!fanResult.rejectList.has(item.type)){
                        item.func(fanData, fanResult);
                    }
                })   
                fanResult.matchList.forEach((type:EnumErmjFanType)=>{
                    let item = ErmjFanCfg[type];
                    if(item){
                        fanResult.fanNum += item.fan
                        fanResult.detailFanData.push({name:item.name, fan:item.fan});
                    }else{
                        console.error("doGetFanResult item is null", type, ErmjFanCfg);   
                    }
                })
                console.log("fanResult", fanResult);
                console.log("_______________________________")
                if(maxResult.fanNum < fanResult.fanNum){
                    maxResult = fanResult;
                }
            })
            
        }else{
            console.error("doGetFanResult data error, please reconfirm the data!!")   
            console.log("handCardList", handCardList, OptCardList);
        }

        return maxResult;        
    }
    /**
     * 根据胡牌时手牌组合 和吃碰杠牌 和 一些胡牌信息
     * 生成用户番数计算的数据结构ErmjFanCardData
     * @param handCardList 
     * @param OptCardList 
     * @param huInfo 
     * @param result 
     */
    private _initCardFanData(handCardList:number[], OptCardList:ErmjFanChiPengCard[], huInfo:ErmjFanHuInfo, 
        result:ErmjHuEstimateResult):ErmjFanCardData
    {
        let fanData             = new ErmjFanCardData();
        fanData.Zimo            = huInfo.isZiMo;
        fanData.HuId            = huInfo.HuCardId;
        fanData.TingBool        = huInfo.TingBool;
        fanData.MenFeng         = huInfo.MenFeng;
        fanData.isQiangGangHu   = huInfo.isQiangGangHu;
        fanData.gangShangFlower = huInfo.gangShangFlower;
        fanData.isHuJueZhang    = huInfo.isHuJueZhang;
        fanData.isLaskCard      = huInfo.isLastCard;
        fanData.Array_a_ke      = result.Array_ke.slice();
        fanData.Array_ke        = result.Array_ke.slice();
        fanData.Array_shun      = result.Array_shun.slice();
        fanData.Array_h_shun    = result.Array_shun.slice();
        fanData.AllCard         = handCardList.slice();
        fanData.QiDui           = result.Qidui;
        fanData.Jiang           = result.Jiang;
        fanData.TongTian        = result.Tongtian;
        OptCardList.forEach(optData => {
            if(optData.tag == EnumErmjHuFanOpt.Chi) {
                fanData.Array_shun.push(optData.cardList);
                fanData.Array_c_shun.push(optData.cardList);
            }else if(optData.tag == EnumErmjHuFanOpt.Peng){ 
                fanData.Array_ke.push(optData.cardList);
            }else if(optData.tag == EnumErmjHuFanOpt.MingGang){
                fanData.Array_gang.push(optData.cardList);
                fanData.Array_m_gang.push(optData.cardList)
            }else if(optData.tag == EnumErmjHuFanOpt.AnGang){
                fanData.Array_gang.push(optData.cardList);
                fanData.Array_a_gang.push(optData.cardList)
            }
            fanData.AllCard = fanData.AllCard.concat(optData.cardList);
        })
        fanData.IdNumData = {}
        fanData.AllCard.forEach(id=>{
            fanData.IdNumData[id]=fanData.IdNumData[id] || 0;
            fanData.IdNumData[id] += 1;
        })
        fanData.IdSet = new Set(fanData.AllCard);
        fanData.IdArray = Array.from(fanData.IdSet);
        fanData.IdArray.sort((a, b)=>a-b);
        fanData.Array_ke.sort((a, b)=>a[0] - b[0]);
        fanData.Array_gang.sort((a, b)=>a[0] - b[0]);
        fanData.Array_shun.sort((a, b)=>a[0] - b[0]);
        fanData.Array_m_gang.sort((a, b)=>a[0] - b[0]);
        fanData.Array_a_ke.sort((a, b)=>a[0] - b[0]);
        fanData.Array_a_gang.sort((a, b)=>a[0] - b[0]);
        fanData.Array_c_shun.sort((a, b)=>a[0] - b[0]);
        return fanData;
    }

    
    private _getPaiJiaoList(handCardList:number[]):EnumErmjCardId[]{
        return this._playMjIdList.filter(num=>this.isHu(handCardList.concat([num])));
        // let info:ErmjTingBaseInfo;
        // if(jiaoList.length > 0){
        //     info = 
        // }
        // return info;
        // //转换为serverID
        // return Array.from(jiaoList, x=>{
        //     let jiaoData         = new ErmjJiaoData();
        //     jiaoData.cardType    = Math.floor(x/10);
        //     jiaoData.cardValue   = x % 10 - 1;
        //     jiaoData.serverId    = jiaoData.cardValue * 16 + jiaoData.cardType;
        //     jiaoData.transId     = x;
        //     jiaoData.fanHandList = handCardList.concat([x]);
        //     return jiaoData
        // })
    }

    //___________________________________________________________________________
    //------------------------------------Public  Function-----------------------
    /**
     * 判断手牌是否可以胡
     * @param testList 牌列表 牌ID按照EnumErmjCardId来
     */
    isHu(testList: EnumErmjCardId[]) {
        let huEstimate = new ErmjHuPaiEstimate(testList);
        return huEstimate.isCanHu();
    }
    /**
     * 获取当前列表的番数
     * @param handCardList:number[] 手上牌列表
     * @param OptCardList:ErmjFanChiPengCard[]  吃碰杠牌列表
     * @param huInfo:ErmjFanHuInfo 胡牌时是否最后一张，门风牌，是否自摸等基本信息
     */
    getFanNum(handCardList:number[], OptCardList:ErmjFanChiPengCard[], huInfo:ErmjFanHuInfo):number{
        handCardList.sort((a, b)=>a-b);
        OptCardList.forEach(item=>{
            item.cardList.sort((a, b)=>a - b);
        })
        OptCardList.sort((a, b)=> a.tag - b.tag);
        //缓存的标记名
        let optName = "opt"
        OptCardList.forEach(item=>{
            optName += item.cardList.join("_");
        })
        optName += "hand";
        optName += handCardList.join("_");
        console.log("-------optName-------", optName);
        if(this._storeFanList[optName]){
            return this._storeFanList[optName];
        }else {
            let result = this._doGetFanResult(handCardList, OptCardList, huInfo)
            let fan = result ? result.fanNum : 0;
            this._storeFanList[optName] = fan
            return  this._storeFanList[optName];
        }
    }
    /**
     * 获取听牌列表
     * 如果打掉一张牌，再摸一张牌能胡就算有叫，那打掉的这这张牌就叫听牌
     * @param handCardList 
     */
    getTingList(handCardList:EnumErmjCardId[]):ErmjTingBaseInfo[]{
        handCardList.sort((a, b)=>a-b);
        let setList   = new Set();
        let tingList:ErmjTingBaseInfo[]  = []
         //必须为n*3 + 2时才能 获取听牌列表
         if(handCardList.length % 3 == 2){
            for (let index = 0; index < handCardList.length; index++) {
                const cardId = handCardList[index];
                if(!setList.has(cardId)){
                    setList.add(cardId);
                    //将修改的数据浅拷贝
                    let newList = handCardList.slice();
                    newList.splice(index, 1);
                    let jiaoList = this._playMjIdList.filter(num=>this.isHu(newList.concat([num])));
                    if(jiaoList.length > 0) {
                        let tingInfo = new ErmjTingBaseInfo();
                        tingInfo.tingCardId = cardId;
                        tingInfo.huCardIdList = jiaoList;
                        tingInfo.testCardList = newList;
                        tingList.push(tingInfo)
                    }
                }
            }
        }
        return tingList;
    }

}