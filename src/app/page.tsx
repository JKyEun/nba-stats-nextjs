'use client';

import React, { useEffect, useState } from 'react';
import getStats from './apis/stat';
import { PlayerStat } from './types/stat';
import statSpec from './constants/stat';

export default function StatPage() {
    const [playerStats, setPlayerStats] = useState<PlayerStat[]>([]);

    const setStats = async () => {
        const stat = await getStats();
        setPlayerStats(stat);
    };

    useEffect(() => {
        setStats();
    }, []);

    return (
        <div>
            <div className='stats-wrap'>
                {statSpec.map(stat => (
                    <div key={stat.key} className={stat.name === 'NAME' ? 'column name' : 'column'}>
                        <div className='stat-name'>{stat.name}</div>
                        {playerStats.map(player => (
                            <div key={player.name} className='each-player'>
                                {player[stat.key as keyof PlayerStat]}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
