import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: "https://00f6819733aa41f4a4e7301fecca5428@o1057252.ingest.sentry.io/6043944",
    integrations: [new Integrations.BrowserTracing()],

    tracesSampleRate: 1.0,
  });
}

export default {
  init,
};
