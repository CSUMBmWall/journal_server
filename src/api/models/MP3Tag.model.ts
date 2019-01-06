export class MP3TagModel {
    artist: string;
    album: string;
    title: string;
    APIC: string; // album art
    raw: {
        TIT2: string,
        TPE1: string,
        APIC: string
    }

    convertFromJSON(jsonObject: any) {
        this.artist = jsonObject.artist;
        this.album = jsonObject.album;
        this.title = jsonObject.title;
        this.APIC = jsonObject.APIC;
        this.raw = jsonObject.raw;
    }
    // [propName: string]: string;
}

/*export class MP3TagModel {
    artist: string;
    album: string;
    title: string;
    APIC: string; // album art
    image: {
        mime: "jpeg",
        type: {
            id: 3,
            name: "front cover"
        },
        description: String,
        imageBuffer: Buffer
    };
    raw: {
        TIT2: string,
        TPE1: string,
        APIC: string
    }
    // [propName: string]: string;
}*/
