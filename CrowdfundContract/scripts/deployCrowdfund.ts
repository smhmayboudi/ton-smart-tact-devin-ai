import { toNano, Cell, Sender, Address, beginCell, SendMode, contractAddress } from '@ton/core';
import { Crowdfund, CrowdfundConfig } from '../wrappers/Crowdfund';
import { NetworkProvider } from '@ton/blueprint';

export async function run(networkProvider: NetworkProvider, config: CrowdfundConfig, codeCell: Cell, sender: Sender) {
    // Create a new Crowdfund contract instance with the provided configuration and code cell
    const crowdfund = await Crowdfund.createFromConfig(config, codeCell);

    // Deploy the contract using the NetworkProvider
    await crowdfund.sendDeploy(
        networkProvider,
        sender,
        toNano('0.05')
    );

    // Wait for the contract to be deployed using the NetworkProvider
    await networkProvider.waitForDeploy(crowdfund.address);

    // Additional logic to run methods on `crowdfund` can be added here
}
