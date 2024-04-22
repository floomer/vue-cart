export type Names = {
    [id: string]: Category;
  };
  
  export type Category = {
    G: string;
    B: CategoryItems;
  };
  
  type CategoryItems = {
    [id: string]: Item;
  };
  
  type Item = {
    N: string;
    T: number;
  };
  
  // export const enum CategoryPropertyMap {
  //   name = 'G',
  //   products = 'B',
  // }
  // export const enum ItemPropertyMap { // ????
  //   name = 'N',
  // }
  // export type MappedCategory = {
  //   name: string;
  //   products: CategoryItems;
  // };
  
  // export type Mappeditem = {
  //   name: string;
  // };
  