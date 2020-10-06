# c3

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/97b3e89172da45159552214c0a5f6510)](https://app.codacy.com/gh/Dmitry-N-Medvedev/c3?utm_source=github.com&utm_medium=referral&utm_content=Dmitry-N-Medvedev/c3&utm_campaign=Badge_Grade)

## disclamer

You will notice I use the latest versions of software ( pnpm, node.js, etc ). This is a deliberate decision - people behind these projects
do literally invest their lives enhancing them - fixing bugs, adding new functionality, etc, etc, etc.

So let's enjoy the latest javascript enhancements and let's be polite and give back to the community at least in the form of using their work.

## prerequisites

1. [volta](https://volta.sh/) for managing node.js versions
2. [pnpm](https://pnpm.js.org/) for managing packages ( no npm, no yarn, or stuff like that - these are way too disk hungry )

### volta

To install volta please issue the following command in your terminal: `curl https://get.volta.sh | bash`.

### node.js

To install node.js please issue the following command in your terminal: `volta install node@14.13.0`.

### pnpm

To install pnpm please issue the following command in your terminal: `curl -L https://raw.githubusercontent.com/pnpm/self-installer/master/install.js | PNPM_VERSION=6.8.0 node`.

You can definitely use npm instead of pnpm without any problems, but your hard drive huge misuse. Please consider switching to the pnpm for your future projects.
