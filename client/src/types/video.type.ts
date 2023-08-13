
export interface IVideo {
    id: number;
    title: string;
    pathVideo: any;
    pathImg: any;
    status: 'success' | 'loading' | 'idle' | 'error';
    messageError: string | null,
}

export interface IVideos {
    videos: Array<IVideo>,
    status: 'success' | 'loading' | 'idle' | 'error',
    messageError: string | null
}