export type EmailTemplateResult = {
  subject: string;
  text: string;
  html: string;
};

export function createWelcomeEmailTemplate(input: {
  appName: string;
  recipientName?: string | null;
}): EmailTemplateResult {
  const greeting = input.recipientName ? `Hi ${input.recipientName},` : "Hi there,";

  return {
    subject: `Welcome to ${input.appName}`,
    text: `${greeting}\n\nYour starter app is ready. Auth, billing, and the core project structure are already in place.\n\nNext step: sign in and continue building.\n`,
    html: `<p>${greeting}</p><p>Your starter app is ready. Auth, billing, and the core project structure are already in place.</p><p>Next step: sign in and continue building.</p>`
  };
}

export function createPasswordResetPlaceholderTemplate(input: {
  appName: string;
  resetUrl: string;
}): EmailTemplateResult {
  return {
    subject: `Reset your ${input.appName} password`,
    text: `Use this link to reset your password: ${input.resetUrl}`,
    html: `<p>Use this link to reset your password:</p><p><a href="${input.resetUrl}">${input.resetUrl}</a></p>`
  };
}

export function createBillingUpdatePlaceholderTemplate(input: {
  appName: string;
  provider: string;
}): EmailTemplateResult {
  return {
    subject: `${input.appName} billing update`,
    text: `A billing event was received from ${input.provider}. Replace this placeholder with your real billing notification workflow.`,
    html: `<p>A billing event was received from <strong>${input.provider}</strong>.</p><p>Replace this placeholder with your real billing notification workflow.</p>`
  };
}
