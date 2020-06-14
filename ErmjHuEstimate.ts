import { ErmjHuEstimateResult } from "./ErmjFanDataType";

class JiangInfo{
    jiang:number = -1;
    combitList:number[] =[];
}
/**
 * 麻将胡牌判定
 */
export default class ErmjHuPaiEstimate {
    paiList:number[] = [];
    resultList:ErmjHuEstimateResult[] = [];
    constructor(paiList:number[]){
        paiList.sort((a,b)=>a-b);
        this.paiList = paiList;
    }

    /**
     * 开始检查是否可以胡牌
     * 以顺子优先判断和以刻字优先判断可能有不同胡牌结果
     * 所以这里尝试把两种结果都算出来，并比较是否不同
     */
    testAllCombineResult(){
        let jiangList = this.getJiangList();
        jiangList.forEach(jiangInfo=>{
            let result_1;
            let result_2;
            
            if(this.testKeFirstHu(jiangInfo)){
                result_1 = this.getResultByKeFirst(jiangInfo);
            }
            if(this.testShunFirstHu(jiangInfo)){
                result_2 = this.getResultByShunFirst(jiangInfo);
            }
            //两种结果至少有一种能胡才行胡
            if(result_1 || result_2) {
                //当两种都可以胡时
                if(result_1  && result_2) {
                    //比较刻字组合是否存在不同
                    let keDiff = result_1.Array_ke.some((idArr, index)=>{
                        let ke2 =  result_2.Array_ke[index];
                        return !ke2 || ke2[0] !== idArr[0] 
                    });
                    //比较顺子组合是否存在不同
                    let shunDiff = result_1.Array_shun.some((idArr, index)=>{
                        let ke2 =  result_2.Array_shun[index];
                        return !ke2 || ke2[0] !== idArr[0] 
                    });
                    //只要有一种不同则胡牌组合就不同
                    if(keDiff || shunDiff){
                        this.resultList.push(result_1);
                        this.resultList.push(result_2)
                    }else {
                        //两个想同时，就让一个生效
                        this.resultList.push(result_1);
                    }
                }else {
                    //只有一种可以胡牌
                    (result_1 != undefined)  && this.resultList.push(result_1);
                    (result_2 != undefined)  && this.resultList.push(result_2)
                }
            }
            //可能存在七对子的情况，将牌也算一队
            if(this.is6uizi(jiangInfo.combitList)){
                let result = new ErmjHuEstimateResult();
                result.Qidui = true;
                result.Jiang = jiangInfo.jiang;
                this.resultList.push(result)
            }
        })
    }
    /**
     * 是否可以胡牌
     */
    isCanHu(){
        let jiangList = this.getJiangList();
        return jiangList.some(info=>{
            return this.testKeFirstCombine(info.combitList.slice()) || this.is6uizi(info.combitList)
        })
    }

    /**
     * 手中的牌数量是否正确
     * 牌数量不正确必定不能胡
     */
    private checkIsRightCardList(){
        return this.paiList.length % 3 == 2
    }

    /**
     * 是否为6对子 将牌也算一队 所以就是7对子
     */
    is6uizi(paiList:number[]):boolean{
        if(paiList.length < 12){
            return false
        }
        let is7Dui = true;
        for (let index = 0; index < 6; index++) {
            let startIndex = index * 2;
            let pai1 = paiList[startIndex]
            let pai2 = paiList[startIndex + 1]
            if(pai1 == undefined || pai2== undefined || pai1 != pai2){
                is7Dui = false;
                break;
            }
        }
        return is7Dui
    }

    
    
    /**
     * 选出可以组成一队牌的的组合列表
     */
    private getJiangList():JiangInfo[]{
        if(!this.checkIsRightCardList()){
            return []; 
        };
        let singleList = Array.from(new Set(this.paiList))
        let jiangList:JiangInfo[] = [];
        singleList.forEach(num=>{
            if(this.paiList.filter(item=>item == num).length > 1){
                let index = this.paiList.findIndex(fitem=>fitem == num);
                let tempList = this.paiList.slice();
                tempList.splice(index, 2);
                let info = new JiangInfo();
                info.jiang = num;
                info.combitList = tempList;
                jiangList.push(info);
            }
        })
        return jiangList
    }


    testKeFirstHu(_jiangInfo:JiangInfo){
        return this.testKeFirstCombine(_jiangInfo.combitList.slice())
    }
    testShunFirstHu(_jiangInfo:JiangInfo){
        return this.testShunFirstCombine(_jiangInfo.combitList.slice())
    }


    getResultByKeFirst(_jiangInfo:JiangInfo){
        let result = new ErmjHuEstimateResult();
        result.Jiang = _jiangInfo.jiang;
        this.testKeFirstCombine(_jiangInfo.combitList.slice(), result);
        return  result
    }

    getResultByShunFirst(_jiangInfo:JiangInfo){
        let result = new ErmjHuEstimateResult();
        result.Jiang = _jiangInfo.jiang;
        this.testShunFirstCombine(_jiangInfo.combitList.slice(), result);
        return  result
    }


    /**
     * 优先使用刻字组合来测试牌能否组合成胡牌
     * @param paiList 
     */
    private testKeFirstCombine(paiList:number[], result:ErmjHuEstimateResult = undefined){
        // 余牌是否大于0
        if (paiList.length === 0) {
            return true;
        }
        const card1 = paiList[0];
        const card2 = paiList[1];
        const card3 = paiList[2];
        // 前三张牌相同
        if (card1 === card2 && card1 === card3) {
            paiList.splice(0, 3);
            result &&  result.Array_ke.push([card1, card2, card3])
            return this.testKeFirstCombine(paiList, result);
        }
        // 余牌第一张与后面牌三张连续
        const p1 = paiList[0];
        const p2 = paiList[0] + 1;
        const p3 = paiList[0] + 2;
        //刻字牌不能拖拉机
        if (p1 < 30 &&  paiList.indexOf(p2) !== -1  &&  paiList.indexOf(p3) !== -1) {
            paiList.splice(paiList.indexOf(p1), 1);
            paiList.splice(paiList.indexOf(p2), 1);
            paiList.splice(paiList.indexOf(p3), 1);
            result && result.Array_shun.push([p1, p2, p3])
            return this.testKeFirstCombine(paiList, result);
        } 
        return false
    }

    /**
     * 优先使用顺子组合来测试牌能否组合成胡牌
     * @param paiList 
     */
    private testShunFirstCombine(paiList:number[], result:ErmjHuEstimateResult = undefined){
        // 余牌是否大于0
        if (paiList.length === 0) {
            return true;
        }
      
        // 余牌第一张与后面牌三张连续
        const p1 = paiList[0];
        const p2 = paiList[0] + 1;
        const p3 = paiList[0] + 2;
        //刻字牌不能拖拉机
        if (p1 < 30 &&  paiList.indexOf(p2) !== -1  &&  paiList.indexOf(p3) !== -1) {
            paiList.splice(paiList.indexOf(p1), 1);
            paiList.splice(paiList.indexOf(p2), 1);
            paiList.splice(paiList.indexOf(p3), 1);
            result && result.Array_shun.push([p1, p2, p3])
            return this.testShunFirstCombine(paiList, result);
        } 

        const card1 = paiList[0];
        const card2 = paiList[1];
        const card3 = paiList[2];
        // 前三张牌相同
        if (card1 === card2 && card1 === card3) {
            paiList.splice(0, 3);
            result && result.Array_ke.push([card1, card2, card3])
            return this.testShunFirstCombine(paiList, result);
        }

        return false
    }
}

