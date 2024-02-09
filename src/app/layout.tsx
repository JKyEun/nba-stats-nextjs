import type { Metadata } from 'next';
import '../style/reset.scss';
import RecoilRootWrapper from './RecoilRootWrapper';
import LayoutProvider from './LayoutProvider';

export const metadata: Metadata = {
    title: 'NBA 득점 순위로 내 팀을 만들어보자 | NBA-SIMULATOR',
    description: 'NBA 득점 순위 데이터로 나만의 팀을 만들어 경기 결과를 확인해보세요!'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body>
                <RecoilRootWrapper>
                    <LayoutProvider>{children}</LayoutProvider>
                </RecoilRootWrapper>
            </body>
        </html>
    );
}
