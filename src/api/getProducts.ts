import { ref } from "vue";
import { Product } from "../types/Product";
import { Data, MappedGoods } from "../types/Data";
import { Names } from "../types/Names";
import { parseData } from "../utils/getParsedData";

const products = ref<Map<string, Product[]>>(new Map());


async function getData(): Promise<Data> {
    return await fetch('./src/data.json').then((res) => res.json());
}

async function getNames(): Promise<Names> {
    return await fetch('./src/names.json').then((res) => res.json());
}

function setProducts(mappedData: MappedGoods[], names: Names): typeof products {
    products.value = new Map();
    mappedData.forEach((product) => {
        if (!(product.id in names[product.group].B)) {
            return null;
        }
        if (!products.value.has(names[product.group].G)) {
            products.value.set(names[product.group].G, []);
        }
        products.value.get(names[product.group].G)?.push({
            id: product.id,
            name: names[product.group].B[product.id].N,
            cost: product.cost,
            amount: product.amount,
        });
    });
    return products
}
export async function getProducts(): Promise<typeof products> {
    const names = await getNames();
    const data = await getData();
    const mappedData = parseData(data);
    return setProducts(mappedData, names);
}