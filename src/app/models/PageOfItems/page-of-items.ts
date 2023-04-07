export interface PageOfItems<T> { 
    list: T[];
    hasNext: boolean;
    totalElements: number;
}
