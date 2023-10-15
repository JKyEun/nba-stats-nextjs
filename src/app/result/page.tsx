'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { playerStatTable, selectedTeam } from '../recoil/atom';
import { useRouter } from 'next/navigation';
import { getGameResult } from '../apis/stat';
import { Result } from '../types/stat';
import '../../style/resultPage.scss';

export default function Result() {
    const router = useRouter();
    const teamData = useRecoilValue(selectedTeam);
    const playerStats = useRecoilValue(playerStatTable);
    const [result, setResult] = useState<Result>();

    const callGetGameResult = async () => {
        const res = await getGameResult(teamData, playerStats);
        console.log(res);
        setResult(res);
        console.log(result);
    };

    const backToStatPage = () => {
        router.push('/');
    };

    useEffect(() => {
        if (teamData.length === 0) return router.push('/');
        callGetGameResult();
    }, [teamData, router]);

    return (
        <div className='result-page'>
            <div className='result-wrap'>
                <div className='team-wrap'>
                    <div className='offense-avg'>
                        {result && result.offense.reduce((acc, item) => acc + item.points, 0).toFixed(1)}
                    </div>
                    {/* <div className='defense-avg'>{result && result.defense}</div> */}
                    {result &&
                        result.offense.map(el => (
                            <div key={el.name}>
                                <span className='name'>{el.name}</span>
                                <span className='points'>{el.points}</span>
                            </div>
                        ))}
                </div>
            </div>
            <div onClick={backToStatPage} className='back-btn'>
                돌아가기
            </div>
        </div>
    );
}
