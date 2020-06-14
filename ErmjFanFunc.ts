import{ ErmjFanCardData, ErmjFanResultData } from "./ErmjFanDataType";
import{ EnumErmjCardId, EnumErmjFanType } from "./EnumErmjFanHu";

export default class ErmjFanFunc {
    /**
     * 大四喜
     * 胡牌时，牌里有4组风牌刻子（杠）加一对将牌组成的牌型。（不计门风刻、圈风刻、小四喜、三风刻、碰碰胡、幺九刻）
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsBigFourHappy(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        let keGangArr = fanDetailInfo.Array_ke.concat( fanDetailInfo.Array_gang);
        //一副牌中 刻的数量没有4个 并且 杠的数量也没有4个 必定不是大四喜
        if((keGangArr.length < 4)){
            return
        } else{
            EnumErmjCardId.Bai
            //杠或刻子的数量是 4个 ，判断是否是风牌杠
            let isAllFeng = keGangArr.length > 0 &&  keGangArr.every(cardList=>{
                return cardList[0] >= EnumErmjCardId.DongFeng && cardList[0] <= EnumErmjCardId.BeiFeng;
            })
            if(isAllFeng){
                fanResultInfo.matchList.push(EnumErmjFanType.DASIXI);
                // 不计门风刻 小四喜 三风刻 碰碰胡 幺九刻
                fanResultInfo.rejectList.add(EnumErmjFanType.XIAOSIXI);
                fanResultInfo.rejectList.add(EnumErmjFanType.MENFENGKE);
                fanResultInfo.rejectList.add(EnumErmjFanType.SANFENGKE);
                fanResultInfo.rejectList.add(EnumErmjFanType.PENGPENGHU);
                fanResultInfo.rejectList.add(EnumErmjFanType.YAOJIUKE);
            }
        }
    }     
    /**
     * 大三元
     * 胡牌时，牌里有中、发、白3副刻子。（不计双箭刻、箭刻）
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsDaSanYuan(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){

        let lenKe = fanDetailInfo.Array_ke.length;
        // 判断胡牌中 刻子数是否大于三 最多只有4刻子
        if(lenKe < 3){ 
            return
        }
        //如果有三幅以上刻子  则判断这三幅刻子是否是中 发 白 EnumErmjCardId.Zhong EnumErmjCardId.Fa EnumErmjCardId.Bai
        //如果刻子数=3，并且第一个不是 中 EnumErmjCardId.Zhong 或者 刻子数=4，并且第二个刻子不是中0x35
        if((lenKe == 3 && fanDetailInfo.Array_ke[0][0] != EnumErmjCardId.Zhong) || 
            (lenKe == 4 && fanDetailInfo.Array_ke[1][0] != EnumErmjCardId.Zhong)){
                return
        }

        fanResultInfo.matchList.push(EnumErmjFanType.DASANYUAN);
        //排除牌型
        fanResultInfo.rejectList.add(EnumErmjFanType.SHUANGJIANKE);
        fanResultInfo.rejectList.add(EnumErmjFanType.JIANKE);

        return
    }
    /**
     * 九莲宝灯
     * 1112345678999的形式加上1到9其中任意一张成立，必须是门前清的状态。也称作“九连宝灯”。不计清一色，门前清，自摸
     * 牌型为 1112345678999
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsJiuLianBaoDeng(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //胡牌必须是万子牌
        if(fanDetailInfo.HuId > EnumErmjCardId.JiuWan){
            return
        }
        //必须是门前清
        if(fanDetailInfo.Array_c_shun.length != 0 || 
            fanDetailInfo.Array_a_ke.length != fanDetailInfo.Array_ke.length || 
            fanDetailInfo.Array_m_gang.length != 0){
            return
        }
        
        let wanIdList = [EnumErmjCardId.YiWan, EnumErmjCardId.ErWan, EnumErmjCardId.SanWan,EnumErmjCardId.SiWan,
            EnumErmjCardId.WuWan, EnumErmjCardId.LiuWan,EnumErmjCardId.QiWan,EnumErmjCardId.BaWan, EnumErmjCardId.JiuWan];
        //必须是1三张和9三张 2-7各一张 再加上1-9的一张胡牌
        let getCardNum = (id)=>{
            return id == EnumErmjCardId.YiWan || id == EnumErmjCardId.JiuWan ? 3 : 1;
        }
        let numErr = wanIdList.some(cardId=>{
            let cardNum = getCardNum(cardId);
            (fanDetailInfo.HuId == cardId) && (cardNum += 1);
            return  fanDetailInfo.IdNumData[cardId] != cardNum;
        })
        if(numErr){
            return
        }            
        fanResultInfo.matchList.push(EnumErmjFanType.JIUBAOLIANDENG);
        //排除牌型
        fanResultInfo.rejectList.add(EnumErmjFanType.QINGYISE);
        fanResultInfo.rejectList.add(EnumErmjFanType.MENQIANQING);
        fanResultInfo.rejectList.add(EnumErmjFanType.ZIMO);
    }
    /**
     * 大七星
     * 胡牌为七对子，并且由“东南西北中发白“其中字牌构成，
     * 不计七对，三元七对，四喜七对，全带幺，单钓将，门前清，自摸，字一色
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsDaQiXing(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //如果不是七对
        if(!fanDetailInfo.QiDui){ 
            return
        }
        //遍历所有牌型，可以从东南西北中发白 处开始遍历
        let cardList = [EnumErmjCardId.DongFeng, EnumErmjCardId.NanFeng, EnumErmjCardId.XiFeng, EnumErmjCardId.BeiFeng,
            EnumErmjCardId.Zhong, EnumErmjCardId.Fa, EnumErmjCardId.Bai];
        let isOk = cardList.length > 0 && cardList.every((id)=>fanDetailInfo.IdSet.has(id));
        if(isOk){
            fanResultInfo.matchList.push(EnumErmjFanType.DAQIXING);
            //排除牌型
            fanResultInfo.rejectList.add(EnumErmjFanType.QIDUI);
            fanResultInfo.rejectList.add(EnumErmjFanType.QUANDAIYAO);
            fanResultInfo.rejectList.add(EnumErmjFanType.DANDIAOJIANG);
            fanResultInfo.rejectList.add(EnumErmjFanType.MENQIANQING);
            fanResultInfo.rejectList.add(EnumErmjFanType.ZIMO);
            fanResultInfo.rejectList.add(EnumErmjFanType.ZIYISE);
        }
    }

    /**
     * 四杠
     * 4个杠，不计三杠，双明杠，明杠，单钓将
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsSiGang(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){

        if(fanDetailInfo.Array_gang.length != 4){ //杠的数量没有四个
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.SIGANG);
        //排除牌型
        fanResultInfo.rejectList.add(EnumErmjFanType.SANGANG);
        fanResultInfo.rejectList.add(EnumErmjFanType.SHUANGMINGGANG);
        fanResultInfo.rejectList.add(EnumErmjFanType.MINGGANG);
        fanResultInfo.rejectList.add(EnumErmjFanType.DANDIAOJIANG);
    }

    //连七对
    //由一种花色序数牌组成序数相连的7个对子的胡牌。不计七对，单钓将，门前清，自摸，清一色
    static IsLianQiDui(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(!fanDetailInfo.QiDui){ //不是七对
            return
        }
        //由于是二人麻将，只有一种序数牌（万）,存在大于万的牌就不算了
        let endCard = fanDetailInfo.IdArray[fanDetailInfo.IdArray.length - 1];
        if(endCard > EnumErmjCardId.JiuWan){
            return
        }
        //判断是否为连续的值
        let isLian = fanDetailInfo.IdArray.length > 0 &&  fanDetailInfo.IdArray.every((id, index)=>{
        return id === (fanDetailInfo.IdArray[0] + index)
        })
        if(isLian){
            fanResultInfo.matchList.push(EnumErmjFanType.LIANQIDUI);
            //排除牌型
            fanResultInfo.rejectList.add(EnumErmjFanType.QIDUI);
            fanResultInfo.rejectList.add(EnumErmjFanType.DANDIAOJIANG);
            fanResultInfo.rejectList.add(EnumErmjFanType.MENQIANQING);
            fanResultInfo.rejectList.add(EnumErmjFanType.QINGYISE);
        }
    }

    /**
     * 小四喜
     * 胡牌时，牌里有风牌的3副刻子及将牌。不记番:三风刻、幺九刻。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsXiaoSiXi(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        let lke = fanDetailInfo.Array_ke.length
        //判断刻子数是否小于三
        if(lke < 3){ 
            return
        }
        //判断将牌是否是风牌
        if(fanDetailInfo.Jiang >  EnumErmjCardId.BeiFeng || fanDetailInfo.Jiang < EnumErmjCardId.DongFeng){
            return
        }
        let num = 0
        //判断是否有三个风牌刻子
        fanDetailInfo.Array_ke.forEach(keArr=>{
            if(keArr[0] >= EnumErmjCardId.DongFeng && keArr[0] <= EnumErmjCardId.BeiFeng){
                num += 1;
            }
        })
        if(num != 3){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.XIAOSIXI);
        //排除牌型
        fanResultInfo.rejectList.add(EnumErmjFanType.SANFENGKE);
        fanResultInfo.rejectList.add(EnumErmjFanType.YAOJIUKE);
    }
    /**
     * 小三元
     * 胡牌时，牌里有箭牌的两副刻子及将牌。不记番:箭刻、双箭刻
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsXiaoSanYuan(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //判断将牌是否是箭牌
        if(fanDetailInfo.Jiang >  EnumErmjCardId.Bai || fanDetailInfo.Jiang < EnumErmjCardId.Zhong){
            return
        }
        //刻子数不能少于2副
        if(fanDetailInfo.Array_ke.length <= 1){
            return
        }
        let num = 0
        ////刻子中有两副是箭牌
        fanDetailInfo.Array_ke.forEach(keArr=>{
            if(keArr[0] >= EnumErmjCardId.Zhong && keArr[0] <= EnumErmjCardId.Bai){
                num += 1;
            }
        })
        
        if(num < 2){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.XIAOSANYUAN);
        //排除牌型
        fanResultInfo.rejectList.add(EnumErmjFanType.JIANKE);
        fanResultInfo.rejectList.add(EnumErmjFanType.SHUANGJIANKE);

    }
    /**
     * 字一色（字牌 包含风牌（东南西北）和箭牌（中发白））
     * 胡牌时，牌型由字牌的刻子(杠)、将组成。不记番:碰碰和、混么九、全带幺、么九刻。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsZiYiSe(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //将牌必须是字牌
        if(fanDetailInfo.Jiang < EnumErmjCardId.DongFeng){
            return
        }
        //不可能有顺子
        if(fanDetailInfo.Array_shun.length > 0){
            return
        }
        let gangKeArray =fanDetailInfo.Array_ke.concat( fanDetailInfo.Array_gang);
        let isKeOk = gangKeArray.length > 0 &&  gangKeArray.every(cardArr=>cardArr[0] >=  EnumErmjCardId.DongFeng)
        if(!isKeOk){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.ZIYISE);
        //排除牌型
        fanResultInfo.rejectList.add(EnumErmjFanType.PENGPENGHU);
        fanResultInfo.rejectList.add(EnumErmjFanType.HUNYAOJIU);
        fanResultInfo.rejectList.add(EnumErmjFanType.QUANDAIYAO);
        fanResultInfo.rejectList.add(EnumErmjFanType.YAOJIUKE);
    }
    /**
     * 四暗刻
     * 胡牌时，牌里有4个暗刻(暗杠)。不记番:门前清、碰碰和、三暗刻、双暗刻、不求人。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsSiAnKe(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //判断暗刻和暗杠数量之和
        if(fanDetailInfo.Array_a_ke.length+fanDetailInfo.Array_a_gang.length < 4){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.SIANKE);
        //排除牌型
        fanResultInfo.rejectList.add(EnumErmjFanType.MENQIANQING);
        fanResultInfo.rejectList.add(EnumErmjFanType.PENGPENGHU);
        fanResultInfo.rejectList.add(EnumErmjFanType.SANANKE);
        fanResultInfo.rejectList.add(EnumErmjFanType.SHUANGANKE);
        fanResultInfo.rejectList.add(EnumErmjFanType.BUQIUREN);
    }
    /**
     * 一色双龙会
     * 胡牌时，牌型由一种花色的两个老少副，5为将牌组成。不记番:平和、七对、清色、一般高、老少副
     * 老少副：胡牌时，牌里花色相同的123、789的顺子各一副
     * 二人麻将只有一种情况 1 2 3 1 2 3 5 7 8 9 7 8 9  5
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsYiSeShuangLongHui(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //将牌必须是5
        if(fanDetailInfo.Jiang != EnumErmjCardId.WuWan){
            return
        }
        //顺子数必须是4个
        if(fanDetailInfo.Array_shun.length != 4){
            return
        }
        //1 和7 开头的顺子必须都有两个
        let num1 = 0
        let num7 = 0
        fanDetailInfo.Array_shun.forEach(cardArr=>{
            cardArr[0] == EnumErmjCardId.YiWan && (num1 +=1);
            cardArr[0] == EnumErmjCardId.QiWan && (num7 +=1);
        })
        if(num1 != 2 || num7 != 2){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.YISESHUANGLONGHUI);
        //排除牌型
        fanResultInfo.rejectList.add(EnumErmjFanType.PINGHU);
        fanResultInfo.rejectList.add(EnumErmjFanType.QIDUI);
        fanResultInfo.rejectList.add(EnumErmjFanType.QINGYISE);
        fanResultInfo.rejectList.add(EnumErmjFanType.YIBANGAO);
        fanResultInfo.rejectList.add(EnumErmjFanType.LAOSHAOFU);

    }
    /**
     * 一色四同顺
     * 牌里有一种花色且序数相同的4副顺子。不记番:一色三节高、一般高、四归一，一色三同顺、七对。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsYiSeSiTongShun(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //顺子数要4个
        if(fanDetailInfo.Array_shun.length != 4){
            return
        }
        let card1 = fanDetailInfo.Array_shun[0][0];
        if(card1 === fanDetailInfo.Array_shun[1][0] && card1 === fanDetailInfo.Array_shun[2][0]  && 
            card1 === fanDetailInfo.Array_shun[3][0])
        {
            fanResultInfo.matchList.push(EnumErmjFanType.YISESITONGSHUN);
            //排除牌型
            fanResultInfo.rejectList.add(EnumErmjFanType.YISESANJIEGAO);
            fanResultInfo.rejectList.add(EnumErmjFanType.YIBANGAO);
            fanResultInfo.rejectList.add(EnumErmjFanType.SIGUIYI);    
            fanResultInfo.rejectList.add(EnumErmjFanType.YISESANTONGSHUN);
            fanResultInfo.rejectList.add(EnumErmjFanType.QIDUI); 
        }
    }

    /**
     * 一色四节高
     * 胡牌时牌里有一种花色且序数依次递增一位数的4副刻子(或杠子)。不记番:一色三同顺、一色三节高、碰碰和。
    */
    static IsYiSeSiJieGao(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        let test = fanDetailInfo.Array_ke.concat(fanDetailInfo.Array_gang);
        //杠或者刻子数只能是四个
        if(test.length != 4){
            return
        }
        test.sort((a, b)=>a[0] - b[0]);
        //最后一个刻或者杠 与第一个杠或者刻相差3（因为Array_ke 和Array_gang是经过排序的）
        if(test[3][0]-test[0][0] != 3){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.YISESIJIEGAO);
        //排除牌型
        fanResultInfo.rejectList.add(EnumErmjFanType.YISESANTONGSHUN);
        fanResultInfo.rejectList.add(EnumErmjFanType.YISESANJIEGAO);
        fanResultInfo.rejectList.add(EnumErmjFanType.PENGPENGHU);    

    }
    /**
     * 一色四步高
     * 胡牌时，牌里有一种花色4副依次递增一位数或依次递增二位数的顺子。不记番:一色三步高。
     * 递增一位：123 234 345 456 北北  递增两位： 123 345 567 789 北北
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsYiSeSiBuGao(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //顺子数必须是4个
        if(fanDetailInfo.Array_shun.length != 4){
            return
        }
        //	第一个顺子和第二个顺子之间的差
        let c = fanDetailInfo.Array_shun[1][0] - fanDetailInfo.Array_shun[0][0]
        if(c != 1 && c != 2){ //相差必须是1 或者2
            return
        }
        let bo = true
        //从第三个顺子开始判断，
        for(let i = 2; i < fanDetailInfo.Array_shun.length; i++){
            if(fanDetailInfo.Array_shun[i][0]-fanDetailInfo.Array_shun[i-1][0] != c){
                bo = false
                break
            }
        }
        if(!bo){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.YISESIBUGAO);
        //排除牌型
        fanResultInfo.rejectList.add(EnumErmjFanType.YISESANBUGAO);
    }

    /**
     * 三杠
     * 胡牌时，牌里有3副杠，明杠暗杠均可。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsSanGang(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){

        //必须三幅杠
        if(fanDetailInfo.Array_gang.length != 3){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.SANGANG);
    }
    /**
     * 混幺九
     * 胡牌时，由字牌和序数牌、九的刻子及将牌组成的牌型。不记番:碰碰和、幺九刻、全带么。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsHunYaoJiu(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //刻子数至少三个
        if(fanDetailInfo.Array_ke.length < 3){
            return
        }
        let ziKe = 0
        let yjKe = 0
        fanDetailInfo.Array_ke.forEach(idArr=>{
            (idArr[0]==EnumErmjCardId.YiWan || idArr[0]==EnumErmjCardId.JiuWan) && (yjKe += 1);
            (idArr[0] >= EnumErmjCardId.DongFeng) && (ziKe +=1);

        })
        
        if(yjKe != 2){
            return
        }
        if(ziKe < 1){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.HUNYAOJIU);
        //排除牌型
        fanResultInfo.rejectList.add(EnumErmjFanType.PENGPENGHU);
        fanResultInfo.rejectList.add(EnumErmjFanType.YAOJIUKE);
        fanResultInfo.rejectList.add(EnumErmjFanType.QUANDAIYAO);

    }
    /**
     * 七对
     * 胡牌时，胡牌时，牌型由7个对子组成。（不计门前清、不求人、单钓将）
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsQiDui(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(!fanDetailInfo.QiDui){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.QIDUI);
        //排除牌型
        fanResultInfo.rejectList.add(EnumErmjFanType.MENQIANQING);
        fanResultInfo.rejectList.add(EnumErmjFanType.BUQIUREN);
        fanResultInfo.rejectList.add(EnumErmjFanType.DANDIAOJIANG);

    }
    /**
     * 清一色，麻将用语，是麻将番种之一，指由一种花色的序数牌组成的和牌。在各类麻将变种中均计此番种，国标麻将计24番。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsQingYiSe(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //检查将牌 刻子 顺子 杠 是否是同一色（二人麻将只需判断是否是万牌）
        if(fanDetailInfo.IdArray.some(id=>id > EnumErmjCardId.JiuWan)){
            return
        }
        //顺子不需要判断，因为二人麻将只有万才会有顺子
        fanResultInfo.matchList.push(EnumErmjFanType.QINGYISE);

    }
    /**
     * 一色三同顺 
     * 和牌时有一种花色3副序数相同的顺了。不计一色三节高 一般高
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsYiSeSanTongShun(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){

        let len = fanDetailInfo.Array_shun.length
        //顺子必须三幅以上
        if(len < 3){
            return
        }
        let num = 1
        for(let i = 0; i < len-1; i++){
            if(fanDetailInfo.Array_shun[i][0] == fanDetailInfo.Array_shun[i+1][0]){
                num+=1
            } else if(i == 1){
                num = 0
            }
        }
        if(num < 3){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.YISESANTONGSHUN);
        //排除牌型
        fanResultInfo.rejectList.add(EnumErmjFanType.YISESANJIEGAO);
        fanResultInfo.rejectList.add(EnumErmjFanType.YIBANGAO);
    }
    /**
     * 一色三节高
     * 胡牌时，牌里有一种花色且依次递增一位数字的3副刻子。不记番： 一色三同顺
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsYiSeSanJieGao(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){

        //刻子数至少是三个
        let l = fanDetailInfo.Array_ke.length
        if(l < 3){
            return
        }
        let num = 1
        for(let i = 0; i < l-1; i++){
            if(fanDetailInfo.Array_ke[i][0]+1 == fanDetailInfo.Array_ke[i+1][0]){
                num+=1
            } else if(i == 1){
                break
            }
        }
        if(num < 3){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.YISESANJIEGAO);
        //排除牌型
        fanResultInfo.rejectList.add(EnumErmjFanType.YISESANTONGSHUN);

    }
    /**
     * 清龙
     * 胡牌时，有一种相同花色的123，456，789三付顺子即可。清龙就是清一色条龙。不记番:连6、老少副。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsQingLong(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){

        //顺子至少三个
        let l = fanDetailInfo.Array_shun.length
        if(l < 3){
            return
        }
        let num1 = false;
        let num4 = false;
        let num7 = false;
        //遍历顺子，判断是否存在 1 4 7 开头的顺子。
        fanDetailInfo.Array_shun.forEach(m=>{
            if(m[0] == EnumErmjCardId.YiWan){
                num1 = true
            } else if(m[0] == EnumErmjCardId.SiWan){
                num4 = true
            } else if(m[0] == EnumErmjCardId.QiWan){
                num7 = true
            }
        })
        if(num1 && num4 && num7){
            fanResultInfo.matchList.push(EnumErmjFanType.QINGLONG);
            //排除牌型
            fanResultInfo.rejectList.add(EnumErmjFanType.LIANLIU);
            fanResultInfo.rejectList.add(EnumErmjFanType.LAOSHAOFU);
        }

    }
    /**
     * 一色三步高
     * 胡牌时，牌里有一种花色的牌，依次递增一位或依次递增二位数字的3副顺子。
     * 123 234 345 777 3131
     * 123 345 456 567 303030 3131
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsYiSeSanBuGao(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){

        //顺子三个以上
        let l = fanDetailInfo.Array_shun.length
        if(l < 3){
            return
        }
        let shunList = fanDetailInfo.Array_shun.slice();
        //相差1
        let n1List = shunList.filter((idArr, index)=>{
            let preArr = shunList[index - 1];
            return preArr &&  (idArr[0] - preArr[0] == 1)
        })
        let n2 = false;
        for (let index = EnumErmjCardId.YiWan; index < EnumErmjCardId.SiWan; index++) {
            let matchList = [index, index + 2, index + 4];
            n2 = matchList.every(id=>{
                return shunList.find(idArr => idArr[0] == id);
            })
            if(n2){
                break;
            }
            
        }
        if(n1List.length >= 3 || n2){
            fanResultInfo.matchList.push(EnumErmjFanType.YISESANBUGAO);
        }
    }

    //
    ///庄家打出第-张牌时报听称为天听;发完牌后闲家便报听也称为天听。天听要在胡牌后才算番。如果庄家在发完牌后有暗杠，则庄家不算天听。如果发完牌之后有补花，补花之后报听也算天听。
    /**
     * 天听
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsTianTing(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){

    }

    //三暗刻
    //胡牌时，牌里有3个暗刻。
    static IsSanAnKe(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //暗刻必须三个
        if(fanDetailInfo.Array_a_ke.length < 3){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.SANANKE);
    }

    //大于五
    //胡牌时，牌型由序数牌6 9的顺子、刻子、将牌组成。（二人麻将只需判断万牌）
    static IsDaYuWu(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.IdArray.every(id=>id > EnumErmjCardId.WuWan && id <=  EnumErmjCardId.JiuWan)){
            fanResultInfo.matchList.push(EnumErmjFanType.DAYUWU);
        }
    }
    /**
     * 小于五
     * 胡牌时，牌型由序数牌1-4的顺子、刻子、将牌组成。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsXiaoYuWu(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.IdArray.every(id=>id < EnumErmjCardId.LiuWan)){
            fanResultInfo.matchList.push(EnumErmjFanType.XIAOYUWU);
        }
    }
    /**
     * 三风刻
     * 胡牌时，牌里有3个风刻
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsSanFengKe(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //刻子必须有三个以上
        if(fanDetailInfo.Array_ke.length < 3){
            return
        }
        let num = 0;
        fanDetailInfo.Array_ke.forEach(idArr=>{
            if(idArr[0] >= EnumErmjCardId.DongFeng && idArr[0] <= EnumErmjCardId.BeiFeng){
                num +=1;
            }
        })
        if(num > 2){
           fanResultInfo.matchList.push(EnumErmjFanType.SANFENGKE);
        }
    }
    /**
     * 妙手回春
     * 最后一张牌 ，自摸胡牌。不记番: 自摸。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsMiaoShouHuiChun(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(!fanDetailInfo.Zimo){
            return
        }
        if(fanDetailInfo.isLaskCard){
            fanResultInfo.matchList.push(EnumErmjFanType.MIAOSHOUHUICHUN);
            fanResultInfo.rejectList.add(EnumErmjFanType.ZIMO);
        }
    }

    /**
     * 海底捞月
     * 胡最后一张打出来的牌
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsHaiDiLaoYue(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //不能是自摸
        if(fanDetailInfo.Zimo){
            return
        }
        if(fanDetailInfo.isLaskCard){
            fanResultInfo.matchList.push(EnumErmjFanType.HAIDILAOYUE);
        }
    }
    /**
     * 杠上开花
     * 胡牌时，开杠抓进的牌成胡牌。不记番:自摸。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsGangShangKaiHua(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.gangShangFlower){
            fanResultInfo.matchList.push(EnumErmjFanType.GANGSHANGKAIHUA);
            fanResultInfo.rejectList.add(EnumErmjFanType.ZIMO);
        }
    }
    /**
     * 抢杠胡
     * 胡牌时，和别人自抓开明杠的牌。不记番:胡绝张。
     */
    static IsQiangGangHu(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.isQiangGangHu){
            fanResultInfo.matchList.push(EnumErmjFanType.GANGSHANGKAIHUA);
            fanResultInfo.rejectList.add(EnumErmjFanType.HUJUEZHANG);
        }
    }
    /**
     * 碰碰胡
     * 胡牌时，牌型由4副刻子(或杠)、将牌组成。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsPengPengHu(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        let testList = fanDetailInfo.Array_ke.concat(fanDetailInfo.Array_gang);
        if(testList.length != 4){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.PENGPENGHU);
    }
    /**
     * 双暗杠
     * 胡牌时，有2个暗杠
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsShuangAnGang(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.Array_a_gang.length == 2){
            fanResultInfo.matchList.push(EnumErmjFanType.SHUANGANGANG);
        }
    }
    /**
     * 混一色
     * 胡牌时，牌型由一种花色序数牌及字牌组成
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsHunYiSe(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //
        let bo = fanDetailInfo.IdArray.some(card=>card <= EnumErmjCardId.JiuWan);
        let bo1 = fanDetailInfo.IdArray.some(card=>card >= EnumErmjCardId.DongFeng);
        if(bo && bo1){
            fanResultInfo.matchList.push(EnumErmjFanType.HUNYISE);
        }
    }

    /**
     * 全求人
     * 胡牌时，全靠吃牌、碰牌、单钓别人打出的牌胡牌。不记番:单钓。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsQuanQiuRen(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.Zimo) {
            return
        }
        if(fanDetailInfo.Array_shun.length != 0 && fanDetailInfo.Array_shun.length != fanDetailInfo.Array_c_shun.length) {
            return 
        }
        if(fanDetailInfo.Array_a_ke.length != 0) {
            return 
        }
        if(fanDetailInfo.Array_a_gang.length != 0) {
            return
        }
        if(fanDetailInfo.Array_gang.length == 0 && fanDetailInfo.Array_ke.length == 0 && 
            fanDetailInfo.Array_shun.length == 0)
        {
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.QUANQIUREN);
        fanResultInfo.rejectList.add(EnumErmjFanType.DANDIAOJIANG);
    }
    /**
     * 双箭刻
     *双箭刻就是你碰了或者杠了中发白的其中两个不记番:箭刻。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsShuangJianKe(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        let testList = fanDetailInfo.Array_ke.concat(fanDetailInfo.Array_gang);
        if(testList.length < 2 ){
            return
        }
        let bo = testList.every(idArr=>idArr[0] > EnumErmjCardId.BeiFeng);
        if(bo){
            fanResultInfo.matchList.push(EnumErmjFanType.SHUANGJIANKE);
            fanResultInfo.rejectList.add(EnumErmjFanType.JIANKE);
        }
    }
    /**
     * 纯全带幺
     * 胡牌时，每副牌、将牌都有么或九牌。(胡牌时各组牌除了字牌都必须有一或九的序数牌)。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsQuanDaiYao(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //将牌必须是1 或9
        if(fanDetailInfo.Jiang != EnumErmjCardId.YiWan && fanDetailInfo.Jiang !=  EnumErmjCardId.JiuWan){
            return
        }
        //顺子中必须有1 或9
        let shunOk = fanDetailInfo.Array_shun.length > 0 &&  fanDetailInfo.Array_shun.every(idArr=>{
            return idArr[0] == EnumErmjCardId.YiWan || idArr[0] == EnumErmjCardId.JiuWan; 
        })
        let testList = fanDetailInfo.Array_ke.concat(fanDetailInfo.Array_shun);
        //刻子、杠必须是1 或者9
        let gangKeOk = testList.length > 0 &&  testList.every(idArr=>{
            return idArr[0] == EnumErmjCardId.YiWan || idArr[0] == EnumErmjCardId.JiuWan; 
        })
        if(shunOk &&  gangKeOk){
            fanResultInfo.matchList.push(EnumErmjFanType.QUANDAIYAO);
        }
        
    }
    /**
     * 不求人
     * 胡牌时，4副牌及将中没有吃牌、碰牌(包括明杠)，自摸胡牌。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsBuQiuRen(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //必须是自摸
        if(!fanDetailInfo.Zimo){
            return
        }
        //不能有吃、碰、和明杠
        if(fanDetailInfo.Array_c_shun.length != 0 || 
            fanDetailInfo.Array_a_ke.length != fanDetailInfo.Array_ke.length || 
            fanDetailInfo.Array_m_gang.length != 0){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.BUQIUREN);
    }
    /**
     * 双明杠
     * 胡牌时，牌里有2个明杠。不记番:明杠。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsShuangMingGang(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //必须两个明杠
        if(fanDetailInfo.Array_m_gang.length != 2){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.SHUANGMINGGANG);
        fanResultInfo.rejectList.add(EnumErmjFanType.MINGGANG);
    }
    /**
     * 胡绝张
     * 胡牌时，胡牌池、桌面已亮明的3张牌所剩的第4张牌。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsHuJueZhang(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.isHuJueZhang){
            fanResultInfo.matchList.push(EnumErmjFanType.HUJUEZHANG)
        }
    }
    /**
     * 箭刻
     * 胡牌时，牌里有中、发、白，这3个牌中的任一个牌组成的1副刻子
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsJianKe(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        let isHasJian =  fanDetailInfo.Array_ke.some(idArr=>{
            return idArr[0] == EnumErmjCardId.Zhong || idArr[0] == EnumErmjCardId.Fa ||
                idArr[0] == EnumErmjCardId.Bai
        })
        if(isHasJian){
            fanResultInfo.matchList.push(EnumErmjFanType.JIANKE);
        }
    }
    /**
     * 门风刻
     * 胡牌时牌里有与门风相同的风刻。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsMenFengKe(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //刻子
        if(fanDetailInfo.Array_ke.length < 1){
            return
        }
        if( fanDetailInfo.Array_ke.some(idArr=>idArr[0] === fanDetailInfo.MenFeng)){
            fanResultInfo.matchList.push(EnumErmjFanType.MENFENGKE);
        }
    }
    /**
     * 门前清
     * 没有吃、碰、明杠，和别人打出的牌。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsMenQianQing(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        ///不能是自摸
        if(fanDetailInfo.Zimo){
            return
        }
        if(fanDetailInfo.Array_c_shun.length != 0 || 
            fanDetailInfo.Array_a_ke.length != fanDetailInfo.Array_ke.length || 
            fanDetailInfo.Array_m_gang.length != 0){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.MENQIANQING);
    }
    /**
     * 平胡
     * 胡牌时，牌型由4副顺子及序数牌作将组成。边、坎、钓不影响平和。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsPingHu(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //将必须是1-9
        if(fanDetailInfo.Jiang > EnumErmjCardId.JiuWan){
            return
        }
        //顺子有四个
        if(fanDetailInfo.Array_shun.length != 4){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.PINGHU);
    }
    /**
     * 四归一
     * 胡牌时，牌里有4张相同的牌归于一家的顺、刻子、对、将牌中(不包括杠牌)。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsSiGuiYi(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //找到四张一样的牌（可以排除字牌）
        let idList = [];
        for (const id in fanDetailInfo.IdNumData) {
            if (fanDetailInfo.IdNumData.hasOwnProperty(id)) {
                if(fanDetailInfo.IdNumData[id] == 4){
                    idList.push(id);
                }
            }
        }
        let isNoGang = idList.some(id=>{
            return fanDetailInfo.Array_gang.find(idArr=>idArr[0] == id) == undefined;
        })
        if(isNoGang){
            fanResultInfo.matchList.push(EnumErmjFanType.SIGUIYI);
        }
    }
    /**
     * 双暗刻
     胡牌时，牌里有2个暗刻。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsShuangAnKe(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.Array_a_ke.length == 2){
            fanResultInfo.matchList.push(EnumErmjFanType.SHUANGANKE);
        }
    }
    /**
     * 暗杠
     * 胡牌时，牌里有一副自抓4张相同的牌且开杠
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsAnGang(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.Array_a_gang.length > 0){
            fanResultInfo.matchList.push(EnumErmjFanType.ANGANG);
        }
    }
    /**
     * 断幺
     * 胡牌时，牌里没有一、九牌及字牌。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsDuanYao(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //没有1 和9
        if(fanDetailInfo.IdSet.has(EnumErmjCardId.YiWan) || fanDetailInfo.IdSet.has(EnumErmjCardId.JiuWan)){
            return
        }
        if(fanDetailInfo.IdArray.some(id=>id>=EnumErmjCardId.DongFeng)){
            return
        }
        fanResultInfo.matchList.push(EnumErmjFanType.DUANYAO);
    }

    //报听
    //报听后胡牌。
    static IsBaoTing(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.TingBool){
            fanResultInfo.matchList.push(EnumErmjFanType.BAOTING);
        }
    }

    //一般高
    //胡牌时，牌里有一种花色且序数相同的2副顺子。
    static IsYiBanGao(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        //顺子数 必须是2个以上
        if(fanDetailInfo.Array_shun.length < 2){
            return
        }
        let bo = false
        
        for (let index = 0; index < fanDetailInfo.Array_shun.length; index++) {
            const idArr1 = fanDetailInfo.Array_shun[index];
            for (let j = index + 1; j < fanDetailInfo.Array_shun.length; j++) {
                const idArr2 = fanDetailInfo.Array_shun[j];
                if(idArr1[0] == idArr2[0]){
                    bo = true;   
                }
            }
            if(bo){
                fanResultInfo.matchList.push(EnumErmjFanType.YIBANGAO);
                return
            }
        }
    }
    /**
     * 连六
     * 一种花色六张序数相连的顺子(例如: 3-4-5条和6-7-8条)
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsLianLiu(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.Array_shun.length < 2){
            return
        }
        let lian =  fanDetailInfo.Array_shun.some((shunList, index)=>{
            let nextShun = fanDetailInfo.Array_shun[index + 1];
            return nextShun && (nextShun[0] == (shunList[0] + 1) )
        })
        if(lian) {
            fanResultInfo.matchList.push(EnumErmjFanType.LIANLIU);
        }
    }
    /**
     * 老少副
     * 胡牌时，牌里花色相同的123、789的顺子各一副。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsLaoShaoFu(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.Array_shun.length < 2){
            return
        }
        let isYiWan = false;
        let isQiWan = false;
        fanDetailInfo.Array_shun.forEach(idArr=>{
            idArr[0] == EnumErmjCardId.YiWan && (isYiWan = true);
            idArr[0] == EnumErmjCardId.QiWan && (isQiWan = true)
        })
        if(isQiWan && isYiWan){
            fanResultInfo.matchList.push(EnumErmjFanType.LAOSHAOFU);
        }
    }
    /**
     * 幺九刻
     * 胡牌时，牌里有序数为一、九的一副刻子(杠)或是字牌的一副刻子(杠)。
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsYaoJiuKe(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        let testList = fanDetailInfo.Array_ke.concat(fanDetailInfo.Array_gang);
        let idList = [EnumErmjCardId.YiWan, EnumErmjCardId.JiuWan, EnumErmjCardId.DongFeng, EnumErmjCardId.XiFeng,
            EnumErmjCardId.NanFeng, EnumErmjCardId.BeiFeng];
        let isYao = testList.some(idArr=>{
            return idList.some(id=>id==idArr[0])
        })
        if(isYao){
            fanResultInfo.matchList.push(EnumErmjFanType.YAOJIUKE);
        }
    }
    /**
     * 明杠
     * 自己有暗刻，碰别人打出的一张相同的牌开杠:或自己抓进一张与碰的明刻相同
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsMingGang(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.Array_m_gang.length > 0){
            fanResultInfo.matchList.push(EnumErmjFanType.MINGGANG);
        }
    }
    /**
     * 边张
     * 单和123的3及789的7或1233和3、7789和7都为边张。手中有12345和3，56789和7不算边张。
     * 123 3 胡得那张牌只能是顺子的两边牌，两个相邻的顺子不能有连接）
     * @param fanDetailInfo 
     * @param fanResultInfo 
     */
    static IsBianZhang(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.HuId != EnumErmjCardId.SanWan && fanDetailInfo.HuId != EnumErmjCardId.QiWan){
            return
        }
        for (let index = 0; index < fanDetailInfo.Array_h_shun.length; index++) {
            const idArr = fanDetailInfo.Array_h_shun[index];
            //3有 345的顺子就不行
            if(fanDetailInfo.HuId == EnumErmjCardId.SanWan && idArr[0] == EnumErmjCardId.SanWan){
                return
            }
            //7有 567的顺子也不行
            if(fanDetailInfo.HuId == EnumErmjCardId.QiWan && idArr[0] == EnumErmjCardId.WuWan){
                return
            }
        }
        fanResultInfo.matchList.push(EnumErmjFanType.BIANZHANG);
    }

    //坎张
    //胡牌时，和2张牌之间的牌。4556和5也为坎张，手中有45567和6不算坎张。
    static IsKanZhang(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.HuId == EnumErmjCardId.YiWan || fanDetailInfo.HuId == EnumErmjCardId.JiuWan){
            return
        }
        if(fanDetailInfo.Array_h_shun.length < 0) {
            return
        }
        //遍历手牌顺子，胡的那张牌必须在中间，
        for (let index = 0; index < fanDetailInfo.Array_h_shun.length; index++) {
            const idArr = fanDetailInfo.Array_h_shun[index];
            if(fanDetailInfo.HuId == idArr[0] || fanDetailInfo.HuId == idArr[0]+2){
                return;
            }
        }
        fanResultInfo.matchList.push(EnumErmjFanType.KANZHANG);
    }

    //单钓将
    //钓单张牌作将成和
    static IsDanDiaoJiang(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.HuId == fanDetailInfo.Jiang){
            fanResultInfo.matchList.push(EnumErmjFanType.DANDIAOJIANG);
        }
    }

    //自摸
    //自己抓进牌成胡牌
    static IsZiMo(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.Zimo){
            fanResultInfo.matchList.push(EnumErmjFanType.ZIMO);
        }
    }

    //二五八将
    //胡牌时，将牌是二万、五万、八万。
    static IsErWuBaJiang(fanDetailInfo:ErmjFanCardData, fanResultInfo:ErmjFanResultData){
        if(fanDetailInfo.Jiang == EnumErmjCardId.ErWan || fanDetailInfo.Jiang == EnumErmjCardId.WuWan || 
            fanDetailInfo.Jiang == EnumErmjCardId.BaWan)
        {
            fanResultInfo.matchList.push(EnumErmjFanType.ERWUBAJIANG);
        }
    }

}