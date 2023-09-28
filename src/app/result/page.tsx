'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedTeam } from '../recoil/atom';
import { useRouter } from 'next/navigation';
import { getGameResult } from '../apis/stat';

export default function Result() {
    const router = useRouter();
    const teamData = useRecoilValue(selectedTeam);
    const [result, setResult] = useState();

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

    return <div>page</div>;
}
