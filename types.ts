export interface Track {
    track_id: number;
    artist_name: string;
    artist_id: number;
    track_path: string;
    track_name: string;
    created_at?: Date;
    updated_at?: Date;
    stream?: number;
    track_img_path: string

};