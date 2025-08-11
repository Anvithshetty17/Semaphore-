import React from 'react';

function TopRankings() {
  const rankings = [
    { rank: 1, team: 'Team 1', college: 'College 1', score: 100 },
    { rank: 2, team: 'Team 2', college: 'College 2', score: 90 },
    { rank: 3, team: 'Team 3', college: 'College 3', score: 80 },
  ];

  return (
    <div>
      <h2>Top 3 Rankings</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px' }}>Rank</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Team Name</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>College Name</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((row) => (
            <tr key={row.rank}>
              <td style={{ padding: '8px' }}>{row.rank}.</td>
              <td style={{ padding: '8px' }}>{row.team}</td>
              <td style={{ padding: '8px' }}>{row.college}</td>
              <td style={{ padding: '8px' }}>{row.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopRankings;
