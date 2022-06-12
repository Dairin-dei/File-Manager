export const printDirectory = async () => {
  console.log(
    `\x1b[35mYou are currently in ${process.env.RSS_CURRENT_DIRECTORY}\n \x1b[0m`
  );
};
