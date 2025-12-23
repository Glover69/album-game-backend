export type ExternalUrls = {
  spotify: string;
};

export type Image = {
  url: string;
  height: number;
  width: number;
};

export type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type Restrictions = {
  reason: string;
};

export type LinkedFrom = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
};

export type Track = {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: LinkedFrom;
  restrictions?: Restrictions;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

export type TracksPage = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Track[];
};

export type Copyright = {
  text: string;
  type: string;
};

export type ExternalIds = {
  isrc?: string;
  ean?: string;
  upc?: string;
};

export type Album = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  type: string;
  uri: string;
  artists: Artist[];
  tracks: TracksPage;
  copyrights: Copyright[];
  external_ids: ExternalIds;
  genres: string[];
  label: string;
  popularity: number;
};

export type AlbumsResponse = {
  albums: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: Album[];
  };
};


export type FinalAlbumList = {
  id: string;
  name: string;
  artists: string[];
  image?: Image;
}