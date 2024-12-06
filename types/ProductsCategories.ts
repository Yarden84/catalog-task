interface CategoriesLevel1 {
    id?: string;
    name?: Record<string, any>;
    categories?: CategoriesLevel2[];
}
interface CategoriesLevel2 {
    id?: string;
    name?: Record<string, any>;
    categories?: CategoriesLevel3[];
}
interface CategoriesLevel3 {
    id?: string;
    name?: Record<string, any>;
}

export interface ProductsCategories {
    id: string;
    name?: Record<string, any>;
    categories?: CategoriesLevel1[]
}