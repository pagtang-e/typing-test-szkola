import { useState, useEffect, useMemo } from 'react';

export default function RankingComponent() {
    const [results, setResults] = useState([]);
    const [filterMode, setFilterMode] = useState(2); // Default to Mode 2 (Classic)
    const [sortConfig, setSortConfig] = useState({ key: 'score', direction: 'desc' });

    useEffect(() => {
        const storedResults = JSON.parse(localStorage.getItem('typingResults') || '[]');
        setResults(storedResults);
    }, []);

    const requestSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
    };

    const sortedAndFilteredResults = useMemo(() => {
        let filtered = filterMode === 0 
            ? results 
            : results.filter(r => r.mode === filterMode);

        filtered.sort((a, b) => {
            let valA = a[sortConfig.key];
            let valB = b[sortConfig.key];

            // Parse percentages for accuracy
            if (sortConfig.key === 'acc') {
                valA = parseFloat(valA.replace('%', ''));
                valB = parseFloat(valB.replace('%', ''));
            } else if (sortConfig.key === 'date') {
                valA = new Date(valA).getTime();
                valB = new Date(valB).getTime();
            }

            if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [results, filterMode, sortConfig]);

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
        }
        return '';
    };

    return (
        <>
            <div className="menu topMenu" style={{ width: '80vw', height: '80vh', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ position: 'absolute', bottom: '100%', marginBottom: '0px' }}>Leaderboards</h2>
                <div className="switch" style={{marginTop: '20px'}}>
                    <button className={filterMode === 1 ? 'active' : ''} onClick={() => setFilterMode(1)}>Custom</button>
                    <button className={filterMode === 2 ? 'active' : ''} onClick={() => setFilterMode(2)}>Classic</button>
                    <button className={filterMode === 3 ? 'active' : ''} onClick={() => setFilterMode(3)}>Hardcore</button>
                    <button className={filterMode === 0 ? 'active' : ''} onClick={() => setFilterMode(0)}>All</button>
                </div>
                <div style={{ flex: 1, width: '100%', overflowY: 'auto' }}>
                    <table style={{ width: '90%', marginInline:'auto' }}>
                        <thead>
                            <tr>
                                <th style={{ cursor: 'pointer' }} onClick={() => requestSort('score')}>score{getSortIcon('score')}</th>
                                <th style={{ cursor: 'pointer' }} onClick={() => requestSort('lpm')}>lpm{getSortIcon('lpm')}</th>
                                <th style={{ cursor: 'pointer' }} onClick={() => requestSort('acc')}>acc{getSortIcon('acc')}</th>
                                <th style={{ cursor: 'pointer' }} onClick={() => requestSort('date')}>date{getSortIcon('date')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAndFilteredResults.length > 0 ? (
                                sortedAndFilteredResults.map((result, index) => (
                                    <tr key={index}>
                                        <td>{result.score}</td>
                                        <td>{result.lpm}</td>
                                        <td>{result.acc}</td>
                                        <td>{result.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">brak wyników</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
