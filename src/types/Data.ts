export type Data = {
    Error: string;
    Id: number;
    Success: boolean;
    Value: Value;
};

interface Value {
    Goods: Goods[];
}

export type Goods = {
    B: boolean;
    C: number;
    CV: any;
    G: number;
    P: number;
    Pl: any;
    T: number;
};

export const enum GoodsPropertyMap {
    id = 'T',
    group = 'G',
    cost = 'C',
    amount = 'P',
}

export type MappedGoods = {
    id: number;
    group: number;
    cost: number;
    amount: number;
};
