interface Variant {
    stock?: string | number;
    color?: string;
    size?: string[];
    images?: string[] | undefined;
}


export interface ProductData {
    id: number;
    brand?: string;
    price?: number;
    stock?: string | number;
    color?: string;
    size?: any[];
    name?: Record<string, any>;
    images?: string[];
    variant?: Variant[] | undefined;
    categories?: string[];
}