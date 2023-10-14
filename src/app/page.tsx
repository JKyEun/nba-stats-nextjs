'use client';

import React, { useEffect, useState } from 'react';
import { getStats } from './apis/stat';
import { PlayerStat } from './types/stat';
import statSpec from './constants/stat';
import '../style/statPage.scss';
import { useRecoilState } from 'recoil';
import { selectedTeam } from './recoil/atom';
import { useRouter } from 'next/navigation';
import Loading from './components/Loading';

export default function StatPage() {
    const [playerStats, setPlayerStats] = useState<PlayerStat[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    const [myTeam, setMyTeam] = useRecoilState<PlayerStat[]>(selectedTeam);
    const costSum = myTeam.reduce((acc, item) => acc + item.cost, 0);

    const setStats = async () => {
        const stat = await getStats();
        setPlayerStats(stat);
        setIsLoading(false);
    };

    const addPlayer = (player: PlayerStat) => {
        if (myTeam.length >= 5) return alert('이미 5명입니다.');
        if (myTeam.filter(el => el.name === player.name).length > 0) return alert('이미 포함된 선수입니다.');
        if (costSum + player.cost > 15) return alert('$15 이하로만 선수를 구성해야 합니다.');
        setMyTeam(cur => [...cur, player]);
    };

    const removePlayer = (player: PlayerStat) => {
        const removedTeam = myTeam.filter(el => el.name !== player.name);
        setMyTeam(removedTeam);
    };

    const goResultPage = () => {
        if (myTeam.length !== 5) return alert('팀은 5명이어야 합니다.');
        if (costSum > 15) return alert('$15 이하로만 선수를 구성해야 합니다.');
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
                                            <span onClick={() => addPlayer(player)} className='btn team-btn'>
                                                영입하기
                                            </span>
                                        </>
                                    ) : stat.name === 'COST' ? (
                                        <span className='cost'>$ {player[stat.key as keyof PlayerStat]}</span>
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
                    <div className='title-wrap'>
                        <div className='title'>MY TEAM</div>
                        <div className='cost'>Current Cost: $ {costSum}</div>
                    </div>
                    {myTeam.map(player => (
                        <div key={player.name}>
                            <span className='player-cost'>$ {player.cost}</span>
                            <span className='player-name'>{player.name}</span>
                            <span onClick={() => removePlayer(player)} className='remove-btn'>
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
