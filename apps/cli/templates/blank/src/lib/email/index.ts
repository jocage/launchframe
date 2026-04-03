import "server-only";

__EMAIL_PROVIDER_IMPORTS__

__EMAIL_ENV_IMPORT__

import type { EmailTemplateResult } from "./templates";

__EMAIL_PROVIDER_SETUP__

__EMAIL_FROM_ADDRESS_HELPER__

export async function sendEmail(__EMAIL_SEND_SIGNATURE__: {
  to: string | string[];
  template: EmailTemplateResult;
}) {
  void __EMAIL_SEND_SIGNATURE__;
__EMAIL_SEND_IMPLEMENTATION__
}
