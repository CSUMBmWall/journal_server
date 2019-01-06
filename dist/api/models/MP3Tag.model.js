"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MP3TagModel {
    convertFromJSON(jsonObject) {
        this.artist = jsonObject.artist;
        this.album = jsonObject.album;
        this.title = jsonObject.title;
        this.APIC = jsonObject.APIC;
        this.raw = jsonObject.raw;
    }
}
exports.MP3TagModel = MP3TagModel;
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
//# sourceMappingURL=MP3Tag.model.js.map