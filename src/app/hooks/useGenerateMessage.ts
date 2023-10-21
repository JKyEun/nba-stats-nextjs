import { useRecoilValue } from 'recoil';
import { PlayerStat } from '../types/stat';
import { selectedTeam } from '../recoil/atom';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function useGenerateMessage(setMsgArr: Dispatch<SetStateAction<string[]>>): void {
    const teamData: PlayerStat[] = useRecoilValue(selectedTeam);
    const router = useRouter();

    useEffect(() => {
        if (teamData.length === 0) return router.push('/');

        const copiedTeamData: PlayerStat[] = JSON.parse(JSON.stringify(teamData));
        const randomPlayerSelector = Math.floor(Math.random() * 5);
        const randomEastWestSelector = Math.floor(Math.random() * 2);
        const randomPlayer = copiedTeamData[randomPlayerSelector].name.split(' (')[0];
        const pointLeaderPlayer = copiedTeamData.sort((a, b) => b.points - a.points)[0].name.split(' (')[0];
        const DPOYPlayer = copiedTeamData
            .sort((a, b) => b.steal + b.block - (a.steal + b.block))[0]
            .name.split(' (')[0];

        const msg = [
            [
                '개막전 경기에서 승리를 따냈습니다!',
                '우리 팀이 3연패를 기록합니다.',
                `이번 시즌 올스타전 MVP는 ${randomPlayer} 선수!`,
                '오늘 승리로 플레이오프 참가가 확정되었습니다!',
                `${pointLeaderPlayer} 선수가 시즌 MVP를 차지합니다!`
            ],
            [
                'NBA 시즌이 개막했습니다!',
                `현재 우리 팀 득점 리더는 ${pointLeaderPlayer} 선수입니다.`,
                `${randomPlayer} 선수가 감독의 전술에 불만을 표합니다.`,
                `${pointLeaderPlayer} 선수가 팀원들에게 리더쉽을 발휘합니다!`,
                '7연승 행진 중!'
            ],
            [
                '개막전 경기에서 패배했습니다.',
                '5연승 행진 중!',
                `올해 올스타전 승리는 ${randomEastWestSelector === 0 ? '동부' : '서부'} 컨퍼런스입니다.`,
                '우리와 대적할 팀으로 15-16시즌 골든스테이트 워리어스가 거론됩니다.',
                '우리 팀이 정규시즌 1위를 확정지었습니다.'
            ],
            [
                '우리 팀이 이번 시즌 우승 후보로 거론됩니다.',
                `${pointLeaderPlayer} 선수가 득점 1위를 달리고 있습니다.`,
                '감독과 선수 사이에 작은 불화가 발생했습니다.',
                `${randomPlayer} 선수가 감독의 신임을 받고있습니다.`,
                '팬들이 열광합니다!'
            ],
            [
                '개막 5연승을 달립니다!',
                '우리와 대적할 팀으로 95-96시즌 시카고 불스가 거론됩니다.',
                `${randomPlayer} 선수가 다른 팀원과 마찰을 빚었습니다.`,
                `${randomPlayer} 선수가 부상으로 2주 간 아웃됩니다.`,
                `${DPOYPlayer} 선수가 올해의 수비수에 선정되었습니다!`
            ]
        ];

        const msgArr = [];
        for (let i = 0; i < 5; i++) {
            const msgSelector = Math.floor(Math.random() * 5);
            msgArr.push(msg[msgSelector][i]);
        }

        setMsgArr(msgArr);
    }, [teamData]);
}
