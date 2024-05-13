export interface Movie  {
    id: number;
    title?: string;
    original_name?:string;
    poster_path: string;
    overview: string;
    vote_average: number;
}