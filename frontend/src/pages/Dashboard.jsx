import { useState } from 'react';
import NavSearch from '../components/NavSearch/NavSearch';
import ContainerArticles from '../components/ContainerArticles/ContainerArticles';
import './Dashboard.sass';
import TabBar from "../components/TabBar/TabBar"

export default function Dashboard() {
  const [query, setQuery] = useState('');

  return (
    <div className="dashboard">
      <NavSearch query={query} setQuery={setQuery} />
      <ContainerArticles query={query} />
      <TabBar/>
    </div>
  );
}