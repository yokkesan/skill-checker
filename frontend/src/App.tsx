import { useEffect, useState } from 'react';

type Repository = {
  id: number;
  repository_name: string;
  github_url: string;
  branch_name: string;
  status: string;
};

function App() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/repositories`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRepositories(data.repositories);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Repository List</h1>

      {repositories.map((repository) => (
        <div key={repository.id}>
          <h2>{repository.repository_name}</h2>

          <p>{repository.github_url}</p>

          <p>{repository.branch_name}</p>

          <p>{repository.status}</p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;