# Water Credit Registry

This is the official registry for tracking the lifecycle of water credits.

## Services in this monorepo:

#### Hybrid Chain Validation
- A go webserver with quantum entropy secured keys that will verify the integrity of water credit transactions, and track ownership of water credits.

#### Water Data Services
- A go webserver running two concurrent processes, reading water flow data from the pumps on the actual machines, and publsihing that data in channels from redis pubsub

#### Web App
- A Sveltekit client that servers as a simple interface for the site
