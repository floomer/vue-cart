import { Data, GoodsPropertyMap, MappedGoods } from "../types/Data";

export function parseData(data: Data): MappedGoods[] {
    return data.Value.Goods.map((goodsItem) => ({
        id: goodsItem[GoodsPropertyMap.id],
        group: goodsItem[GoodsPropertyMap.group],
        cost: goodsItem[GoodsPropertyMap.cost],
        amount: goodsItem[GoodsPropertyMap.amount] || 0,
    }));
}
