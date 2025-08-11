// Stats.jsx
import React from 'react';

const Stats = () => {
  return (
    <section className="grid grid-cols-3 gap-4 mb-8">
      <div className="p-4 bg-white shadow rounded-lg text-center">
        <h3 className="text-lg font-semibold">Total Teams</h3>
        <p className="text-4xl font-bold">13</p>
      </div>
      <div className="p-4 bg-white shadow rounded-lg text-center">
        <h3 className="text-lg font-semibold">Current Round</h3>
        <p className="text-4xl font-bold">2</p>
      </div>
      <div className="p-4 bg-white shadow rounded-lg text-center">
        <h3 className="text-lg font-semibold">Active Teams</h3>
        <p className="text-4xl font-bold">7</p>
      </div>
    </section>
  );
};

export default Stats;
