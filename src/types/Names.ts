type Names = {
    [index: string]: Category;
}

type Item = {
    N: string;
    T: number
}

type CategoryItems = {
    [index: string]: Item
}

type Category =  {
    G: string;
    C?: string;
    B: CategoryItems
}