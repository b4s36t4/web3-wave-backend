const hre = require("hardhat");
const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();

  console.log(
    "Contract has been deployed :), address is =>",
    waveContract.address
  );

  console.log("Contract Owner is =>", owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waving = await waveContract.wave("Hi, Mahesh!");

  await waving.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  // waveCount = await waveContract.getTotalWaves();

  // waving = await waveContract
  //   .connect(randomPerson)
  //   .wave("Message from other contract ;)");

  // await waving.wait();

  // waveCount = await waveContract.getTotalWaves();

  // let blocked = await waveContract.connect(randomPerson).block_user();

  // await blocked.wait();

  // waving = await waveContract.connect(randomPerson).wave("After Block msg");

  // await waving.wait();

  // let isBlocked = await waveContract.connect(randomPerson).check_blocked();

  // //   await isBlocked.wait();

  // blocked = await waveContract.connect(randomPerson).unblock_user();

  // await blocked.wait();

  // isBlocked = await waveContract.connect(randomPerson).check_blocked();

  // waveCount = await waveContract.getTotalWaves();

  // waving = await waveContract.connect(randomPerson).wave("After UnBlock");

  // await waving.wait();

  // waveCount = await waveContract.getTotalWaves();

  // //   await isBlocked.wait();

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
