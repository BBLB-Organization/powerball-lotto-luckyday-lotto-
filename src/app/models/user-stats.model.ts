export class UserStats {
    constructor(
        public id: number | null,
        public joinedDate: Date,
        public lastSeenDate: Date,
        public totalMoneySpent: number,
        public totalMatchedTwoWinnings: number,
        public totalMatchedThreeWinnings: number,
        public totalMatchedFourWinnings: number,
        public totalMatchedFiveWinnings: number,
        public totalGamesPlayed: number,
        public totalGamesWon: number,
        public totalGamesWonWhereMatchedTwo: number,
        public totalGamesWonWhereMatchedThree: number,
        public totalGamesWonWhereMatchedFour: number,
        public totalGamesWonWhereMatchedFive: number
    ) { }
}
