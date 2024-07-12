# Cron Job Configuration

When ready to enable the cron job, add the following to your `vercel.json` file:

```json
{
  "functions": {
    "api/sync-data/route.ts": {
      "runtime": "nodejs14.x"
    }
  },
  "crons": [
    {
      "path": "/api/sync-data",
      "schedule": "0 0 * * *"
    }
  ]
}
```
