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

export interface User {
    user_id: number;
    user_name: string;
    password: string;
    birth_date: Date;
    join_date: Date;
    email: string;
    race_name: string;
    ethnicity_name: string;
    gender_name: string;

}

export interface Playlist {
    playlist_id: number;
    playlist_name: string;
    playlist_created_at: Date;
    playlist_updated_at: Date;

}

export interface SuperUser {
    user_id: number;
    user_name: string;
    birth_date: Date;
    join_date: Date;
    email: string;
    race_name: string;
    ethnicity_name: string;
    gender_name: string;
    artist_id?: number;
    listener_id?: number;
    is_artist: number;

}

export interface Album {
    album_id: number;
    album_name: string;
    album_created_at: Date;
    album_release_date: Date;
    album_cover_path: string

}