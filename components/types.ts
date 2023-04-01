export type Category = {
    name: string;
    score: number;
    timed: number[];
}

export type Categories = {
    categories: Category[];
    sr: number;
    times: number[];
}