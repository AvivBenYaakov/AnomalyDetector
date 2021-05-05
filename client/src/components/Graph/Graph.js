export default function Graph({ models }) {
  return (
    <>
      <h1>This is from graph</h1>
      <ul>
        {models.map((models, index) => (
          <li key={`models-${index}`}>graph - {models.model_id}</li>
        ))}
      </ul>
    </>
  );
}
