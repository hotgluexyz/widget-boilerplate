This is a boilerplate NextJS app to showcase the hotglue widget!

[hotglue](https://hotglue.com) is an embedded integration platform built on the open source singer spec.

This demo assumes you have a hotglue environment configured with a flow which writes data to a postgres database.
Using this app, you can link connectors with that flow and render time series data from a given table from your postgres database.


## Getting Started

First, add the environment variables:
```bash
NEXT_PUBLIC_HOTGLUE_PUBLIC_KEY=...
NEXT_PUBLIC_HOTGLUE_ENV_ID=...
NEXT_PUBLIC_FLOW_ID=...
DATABASE_URL=...
```

Then, run the web app in development mode with:

```bash
pnpm dev
```