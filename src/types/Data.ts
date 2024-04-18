export type Data = {
    Error: string;
    Id: number;
    Success: boolean;
    Value: Value;
}

interface Value  {
    Goods: ReadableGoods[]
}

export type Goods = {
    B: boolean;
    C: number;
    CV: any;
    G: number;
    P: number;
    Pl: any;
    T: number
}

type GoodsPropertyMap = {
    B: 'appear';
    C: 'cost';
    CV: 'color';
    G: 'group';
    P: 'amount';
    Pl: 'placeholder';
    T: 'id'
}

export type ReadableGoods = {
    [K in keyof Goods as GoodsPropertyMap[K]]: Goods[K] // Idk why it isn't working :c
} 