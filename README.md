# MahjongHuTingFan
麻将的胡牌、听牌 和番数 算法 

# 使用方法

## 判断是否胡牌
ErmjFanHuMgr.getInstance().isHu(testList);

## 获取番数
ErmjFanHuMgr.getInstance().getFanNum(handList, optList, huInfo);

## 获取听牌列表
ErmjFanHuMgr.getInstance().getTingList(handList);


# 番数参考
番数算法主要参考 [麻将番数计算](https://blog.csdn.net/ywloveb/article/details/86570054 )
原作者有些算法和百度百科不一样，这里选择按百度百科的标准来，比如：
## —————————— 错误改正

### 大四喜
大四喜是麻将中和牌的一种方式。在和牌含有东南西北4种刻子（碰牌、暗刻、明杠和暗杠均可以）时成立
原作者 处理为要么全是刻，要么全是杠


### 九莲宝灯
1112345678999的形式加上1到9其中任意一张成立，必须是门前清的状态。也称作“九连宝灯”。不计清一色，门前清，自摸

原作者  只计算 1+1112345678999

### 混幺九 
原作者字牌处理为只包含箭牌



