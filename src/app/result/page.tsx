'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedTeam } from '../recoil/atom';
import { useRouter } from 'next/navigation';
import { getGameResult } from '../apis/stat';
import { Result } from '../types/stat';
import '../../style/resultPage.scss';

export default function Result() {
    const router = useRouter();
    const teamData = useRecoilValue(selectedTeam);
    const [result, setResult] = useState<Result>();

    const callGetGameResult = async () => {
        const res = await getGameResult(teamData);
        console.log(res);
        setResult(res);
        console.log(result);
    };

    useEffect(() => {
        if (teamData[0].length === 0) return router.push('/');
        callGetGameResult();
    }, [teamData, router]);

    return (
        <div className='result-page'>
            <div className='result-wrap'>
                <div className='team-wrap'>
                    <div className='total-score'>
                        {result && result.team1.reduce((acc, item) => acc + item.points, 0) + 20}
                    </div>
                    {result &&
                        result.team1.map(el => (
                            <div key={el.name}>
                                <span className='name'>{el.name}</span>
                                <span className='points'>{el.points}</span>
                            </div>
                        ))}
                    <div>
                        <span className='name'>벤치멤버</span>
                        <span className='points'>20</span>
                    </div>
                </div>
                <div className='team-wrap'>
                    <div className='total-score'>
                        {result && result.team2.reduce((acc, item) => acc + item.points, 0)}
                    </div>
                    {result &&
                        result.team2.map(el => (
                            <div key={el.name}>
                                <span className='name'>{el.name}</span>
                                <span className='points'>{el.points}</span>
                            </div>
                        ))}
                    <div>
                        <span className='name'>벤치멤버</span>
                        <span className='points'>20</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
