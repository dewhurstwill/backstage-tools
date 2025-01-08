# Backstage Tools

Welcome to the Backstage Tools repository!.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

## Features

- **Plugin Architecture**: Easily extend Backstage with a wide range of plugins.
- **Service Catalog**: Manage and visualize your services.
- **Software Templates**: Standardize and automate new project creation.
- **TechDocs**: Create and maintain technical documentation.

## Installation

On Docker:
```sh
docker run -d -p 3000:80 --name backstage-tools dewhurstwill/backstage-tools
```

From source:
```sh
git clone https://github.com/dewhurstwill/backstage-tools.git
cd backstage-tools
npm install
npm run start
```

## Usage

To start using Backstage Tools, run the following command:
```sh
npm start
```

This will launch the Backstage application with the included tools and plugins.

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push your branch to your fork.
4. Open a pull request with a detailed description of your changes.

Please make sure to follow the [code of conduct](CODE_OF_CONDUCT.md) and adhere to the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for more details.
