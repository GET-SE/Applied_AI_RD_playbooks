import { useState, useEffect } from 'react';
import PlaybookList from './pages/PlaybookList';
import PlaybookDetail from './pages/PlaybookDetail';
import playbooksData from './data/playbooks.json';

function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Simple routing
  let content = null;
  if (!currentRoute || currentRoute === '' || currentRoute === '#/') {
    content = <PlaybookList playbooks={playbooksData} />;
  } else if (currentRoute.startsWith('#/playbook/')) {
    const id = currentRoute.split('#/playbook/')[1];
    const playbook = playbooksData.find(p => p.id === id);
    if (playbook) {
      content = <PlaybookDetail playbook={playbook} />;
    } else {
      content = <div className="container" style={{paddingTop: '6rem'}}><h1>Playbook Not Found</h1><a href="#/" className="back-link">← Back to Playbooks</a></div>;
    }
  }

  return (
    <>
      <header>
        <div className="container">
          <a href="#/" className="logo">
            <div className="logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
              </svg>
            </div>
            Applied AI R&D
          </a>
          <nav>
            <a href="#/" className="btn btn-outline" style={{padding: '0.4rem 1rem', fontSize: '0.9rem'}}>All Playbooks</a>
          </nav>
        </div>
      </header>
      <main>
        {content}
      </main>
    </  >
  );
}

export default App;
