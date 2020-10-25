
interface Image {
    height: number;
    width: number;
    href: string;
}

interface Album {
  name: string;
  type: string;
  images: Image[];
}

interface Artists {
    id: string;
    name: string;
    type: string;
    href: string;
}

export default interface PlayingSong {
  name: string;
  album: Album;
  artists: Artists[];
  duration_ms: number;
}
