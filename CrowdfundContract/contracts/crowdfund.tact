import "@stdlib/deploy";

contract Crowdfund with Deployable {
    // State variables
    int fundingGoal;
    int currentBalance;
    int deadline;
    mapping(address => int) contributors;

    // Constructor
    init(int _fundingGoal, int _deadline) {
        fundingGoal = _fundingGoal;
        currentBalance = 0;
        deadline = _deadline;
        contributors = mapping(address => int);
    }

    // Contribute method
    method contribute(address contributorAddress, int amount) {
        if (now > deadline) {
            fail("The crowdfunding campaign has ended.");
        }

        if (amount <= 0) {
            fail("Contribution amount must be greater than zero.");
        }

        currentBalance += amount;
        int existingContribution = contributors[contributorAddress];
        contributors[contributorAddress] = existingContribution + amount;
    }

    // Check if funding goal is reached
    method checkFundingGoalReached() returns (bool) {
        return currentBalance >= fundingGoal;
    }

    // Refund method
    method refund(address contributorAddress) returns (int) {
        if (now <= deadline) {
            fail("The crowdfunding campaign has not ended yet.");
        }

        if (!checkFundingGoalReached()) {
            int contribution = contributors[contributorAddress];
            if (contribution > 0) {
                currentBalance -= contribution;
                delete contributors[contributorAddress];
                return contribution;
            } else {
                fail("No contributions found for this address.");
            }
        } else {
            fail("Funding goal reached, no refunds allowed.");
        }
    }

    // Additional methods such as for withdrawing funds or getting contract details can be added here.
}
