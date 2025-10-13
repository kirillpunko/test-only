export type TimelineEvent = {
    year: number;
    description: string;
    id:number;
};


export type TimeSegment = {
    id: number;
    startYear: number;
    endYear: number;
    label: string;
    events: TimelineEvent[];
};