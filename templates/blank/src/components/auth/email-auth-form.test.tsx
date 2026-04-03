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
  it("renders sign-in mode copy", () => {
    render(<EmailAuthForm mode="sign-in" />);

    expect(screen.getByRole("heading", { name: /sign in to your workspace/i })).toBeTruthy();
    expect(screen.getByLabelText(/email/i)).toBeTruthy();
  });
});
