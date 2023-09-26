'use client';

import React, { useEffect, useState } from 'react';
import getStats from './apis/stat';
import { PlayerStat } from './types/stat';
import statSpec from './constants/stat';
import '../style/statPage.scss';

export default function StatPage() {
    const [playerStats, setPlayerStats] = useState<PlayerStat[]>([]);
    const [team1, setTeam1] = useState<PlayerStat[]>([]);
    const [team2, setTeam2] = useState<PlayerStat[]>([]);

    const setStats = async () => {
        const stat = await getStats();
        setPlayerStats(stat);
    };

    const addPlayer = (teamNum: number, player: PlayerStat) => {
        const team = teamNum === 1 ? team1 : team2;
        const setTeam = teamNum === 1 ? setTeam1 : setTeam2;
        if (team.length >= 5) return alert('이미 5명입니다.');
        setTeam(cur => [...cur, player]);
    };

    const removePlayer = (teamNum: number, player: PlayerStat) => {
        const team = teamNum === 1 ? team1 : team2;
        const setTeam = teamNum === 1 ? setTeam1 : setTeam2;
        const removedTeam = team.filter(el => el.name !== player.name);
        setTeam(removedTeam);
    };

    useEffect(() => {
        setStats();
    }, []);

    return (
        <div className='stat-page'>
            <div className='stats-wrap'>
                {statSpec.map(stat => (
                    <div key={stat.key} className={stat.name === 'NAME' ? 'column name' : 'column'}>
                        <div className='stat-name'>{stat.name}</div>
                        {playerStats.map(player => (
                            <div key={player.name} className='each-player'>
                                {stat.name === 'TEAM' ? (
                                    <>
                                        <span onClick={() => addPlayer(1, player)} className='btn team1-btn'>
                                            TEAM 1
                                        </span>
                                        <span onClick={() => addPlayer(2, player)} className='btn team2-btn'>
                                            TEAM 2
                                        </span>
                                    </>
                                ) : (
                                    player[stat.key as keyof PlayerStat]
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className='team-wrap'>
                <div className='team-boxes'>
                    <div className='team-1 team-box'>
                        <div className='title'>TEAM 1</div>
                        {team1.map(player => (
                            <div key={player.name}>
                                <span>{player.name}</span>
                                <span onClick={() => removePlayer(1, player)} className='remove-btn'>
                                    ❌
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className='team-2 team-box'>
                        <div className='title'>TEAM 2</div>
                        {team2.map(player => (
                            <div key={player.name}>
                                <span>{player.name}</span>
                                <span onClick={() => removePlayer(2, player)} className='remove-btn'>
                                    ❌
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='submit-btn'>제출</div>
            </div>
        </div>
    );
}
