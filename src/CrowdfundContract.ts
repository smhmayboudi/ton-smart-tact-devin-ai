class CrowdfundContract {
    private fundingGoal: number;
    private currentBalance: number;
    private deadline: Date;
    private contributors: Map<string, number>;

    constructor(fundingGoal: number, deadline: Date) {
        this.fundingGoal = fundingGoal;
        this.currentBalance = 0;
        this.deadline = deadline;
        this.contributors = new Map<string, number>();
    }

    contribute(contributorAddress: string, amount: number): void {
        if (new Date() > this.deadline) {
            throw new Error("The crowdfunding campaign has ended.");
        }

        if (amount <= 0) {
            throw new Error("Contribution amount must be greater than zero.");
        }

        this.currentBalance += amount;
        const existingContribution = this.contributors.get(contributorAddress) || 0;
        this.contributors.set(contributorAddress, existingContribution + amount);
    }

    checkFundingGoalReached(): boolean {
        return this.currentBalance >= this.fundingGoal;
    }

    refund(contributorAddress: string): number {
        if (new Date() <= this.deadline) {
            throw new Error("The crowdfunding campaign has not ended yet.");
        }

        if (!this.checkFundingGoalReached()) {
            const contribution = this.contributors.get(contributorAddress);
            if (contribution) {
                this.currentBalance -= contribution;
                this.contributors.delete(contributorAddress);
                return contribution;
            } else {
                throw new Error("No contributions found for this address.");
            }
        } else {
            throw new Error("Funding goal reached, no refunds allowed.");
        }
    }

    // Additional methods such as for withdrawing funds or getting contract details can be added here.
}
