import type { AlbumsResponse, FinalAlbumList } from "../types/data";

export function AlbumList({ albums }: { albums: FinalAlbumList[] }) {
    return (
        <div>
            <h1>New Releases</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {albums.map(album => (
                    <div key={album.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
                        {album.image && <img src={album.image.url} alt={album.name} style={{ width: '100%' }} />}
                        <h3>{album.name}</h3>
                        <p>{album?.artists?.map(a => a).join(', ')}</p>
                       {/* <small>{album.release_date}</small> */}
                    </div>
                ))}
            </div>
        </div>
    );
}