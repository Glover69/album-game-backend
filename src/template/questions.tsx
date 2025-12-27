import type { AlbumsResponse, FinalAlbumList, GameQuestion } from "../types/data";

export function Questions({ questions }: { questions: GameQuestion[] }) {
    return (
        <div>
            <h1>Questions</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {questions.map(question => (
                    <div key={question.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
                        {<img src={question.albumCover} alt={question.albumName} style={{ width: '100%' }} />}
                        <h3>{question.albumName}:{question.correctAnswer}</h3>
                        <p>{question?.options?.map(a => a).join(', ')}</p>
                        <small>{question.releaseDate}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}