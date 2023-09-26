'use client';

import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedTeam } from '../recoil/atom';
import { useRouter } from 'next/navigation';
import { getGameResult } from '../apis/stat';

export default function Result() {
    const router = useRouter();
    const teamData = useRecoilValue(selectedTeam);

    useEffect(() => {
        if (teamData[0].length === 0) return router.push('/');
        getGameResult(teamData);
    }, [teamData, router]);

    return <div>page</div>;
}
