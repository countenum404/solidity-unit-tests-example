const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("BalanceManager", function () {
    let BalanceManager;
    let balanceManager;
    let owner;

    beforeEach(async function () {
        BalanceManager = await ethers.getContractFactory("BalanceManager");
        balanceManager = await BalanceManager.deploy();
        [owner] = await ethers.getSigners();
    });

    it("should deposit and withdraw funds correctly", async function () {
        await balanceManager.deposit(100);
        expect(await balanceManager.balances(owner.address)).to.equal(100);
        await balanceManager.withdraw(50);
        expect(await balanceManager.balances(owner.address)).to.equal(50);
    });

    it("should revert if withdrawing more than available", async function () {
        await expect(balanceManager.withdraw(100)).to.be.revertedWith("Insufficient balance");
    });
});