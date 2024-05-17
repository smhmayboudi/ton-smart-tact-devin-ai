import { ContractProvider, Sender, Address } from '@ton/core';
import { Crowdfund } from '../wrappers/Crowdfund';

export async function execute(provider: ContractProvider, via: Sender, action: string, params: any) {
    // Assuming the contract has already been deployed and we have the address
    // The address should be passed as a parameter or retrieved from a config
    // For the purpose of this example, we will assume the address is available as params.address
    const crowdfund = Crowdfund.createFromAddress(params.address);

    switch (action) {
        case 'contribute':
            const { contributorAddress, amount } = params;
            // Assuming args are provided in params.args
            await crowdfund.contribute(provider, via, params.args, contributorAddress, amount);
            console.log(`Contribution of ${amount} from ${contributorAddress} received.`);
            break;
        case 'checkGoal':
            const goalReached = await crowdfund.checkFundingGoalReached(provider);
            console.log(`Funding goal reached: ${goalReached}`);
            break;
        case 'refund':
            const { refundAddress } = params;
            // Assuming args are provided in params.args
            await crowdfund.refund(provider, via, params.args, refundAddress);
            console.log(`Refund processed for ${refundAddress}.`);
            break;
        default:
            console.error('Invalid action specified.');
    }
}
