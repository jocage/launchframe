import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { EmailAuthForm } from "@/components/auth/email-auth-form";

import type { ReactNode } from "react";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn()
  })
}));

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signIn: {
      email: vi.fn()
    },
    signUp: {
      email: vi.fn()
    }
  }
}));

describe("EmailAuthForm", () => {
  it("renders preset-specific auth form copy", () => {
    render(<EmailAuthForm mode="__AUTH_FORM_TEST_MODE__" />);

    expect(screen.getByRole("heading", { name: /__AUTH_FORM_TEST_HEADING__/i })).toBeTruthy();
    expect(screen.getByLabelText(/__AUTH_FORM_TEST_LABEL__/i)).toBeTruthy();
__AUTH_SOCIAL_TEST_ASSERTION__
  });
});
