// TopRankings.jsx
import React from 'react';

const TopRankings = () => {
  return (
    <section className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Top 3 Rankings</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Rank</th>
            <th>Team Name</th>
            <th>College Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2">1.</td>
            <td>Team 1</td>
            <td>College 1</td>
            <td>100</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">2.</td>
            <td>Team 2</td>
            <td>College 2</td>
            <td>90</td>
          </tr>
          <tr>
            <td className="py-2">3.</td>
            <td>Team 3</td>
            <td>College 3</td>
            <td>80</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default TopRankings;
