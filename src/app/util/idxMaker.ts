export default function idxMaker(loadingTime: number): number {
    if (loadingTime < 17) {
        return 0;
    } else if (loadingTime < 33) {
        return 1;
    } else if (loadingTime < 50) {
        return 2;
    } else if (loadingTime < 66) {
        return 3;
    } else {
        return 4;
    }
}
