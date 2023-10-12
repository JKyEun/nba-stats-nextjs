'use client';

import React, { useEffect, useState } from 'react';
import { getStats } from './apis/stat';
import { PlayerStat } from './types/stat';
import statSpec from './constants/stat';
import '../style/statPage.scss';
import { useSetRecoilState } from 'recoil';
import { selectedTeam } from './recoil/atom';
import { useRouter } from 'next/navigation';
import Loading from './components/Loading';

export default function StatPage() {
    const [playerStats, setPlayerStats] = useState<PlayerStat[]>([]);
    const [team, setTeam] = useState<PlayerStat[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    const setSelectedTeam = useSetRecoilState(selectedTeam);

    const setStats = async () => {
        const stat = await getStats();
        setPlayerStats(stat);
        setIsLoading(false);
    };

    const addPlayer = (teamNum: number, player: PlayerStat) => {
        if (team.length >= 5) return alert('이미 5명입니다.');
        if (team.filter(el => el.name === player.name).length > 0) return alert('이미 포함된 선수입니다.');
        setTeam(cur => [...cur, player]);
    };

    const removePlayer = (teamNum: number, player: PlayerStat) => {
        const removedTeam = team.filter(el => el.name !== player.name);
        setTeam(removedTeam);
    };

    const goResultPage = () => {
        if (team.length !== 5) return alert('팀은 5명이어야 합니다.');
        const costSum = team.reduce((acc, item) => acc + item.cost, 0) / 5;
        if (costSum > 15) return alert('$15 초과입니다.');
        setSelectedTeam(team);
        router.push('/result');
    };

    useEffect(() => {
        setStats();
    }, []);

    return (
        <div className='stat-page'>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='stats-wrap'>
                    {statSpec.map(stat => (
                        <div
                            key={stat.key}
                            className={
                                stat.name === 'NAME' ? 'column name' : stat.name === 'TEAM' ? 'column team' : 'column'
                            }>
                            <div className='stat-name'>{stat.name}</div>
                            {playerStats.map(player => (
                                <div key={player.name} className='each-player'>
                                    {stat.name === 'TEAM' ? (
                                        <>
                                            <span onClick={() => addPlayer(1, player)} className='btn team-btn'>
                                                영입하기
                                            </span>
                                        </>
                                    ) : stat.name === 'COST' ? (
                                        `$ ${player[stat.key as keyof PlayerStat]}`
                                    ) : (
                                        player[stat.key as keyof PlayerStat]
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
            <div className='team-wrap'>
                <div className='team-box'>
                    <div className='title'>MY TEAM</div>
                    {team.map(player => (
                        <div key={player.name}>
                            <span>{player.name}</span>
                            <span onClick={() => removePlayer(1, player)} className='remove-btn'>
                                ❌
                            </span>
                        </div>
                    ))}
                </div>
                <div onClick={goResultPage} className='submit-btn'>
                    제출
                </div>
            </div>
        </div>
    );
}
