export class YouTubeInfoModel {
    title: string;
    description: string;
    thumbnail: {
        url: string;
        width: number;
        height: number;
    };
    tags: string[];
}