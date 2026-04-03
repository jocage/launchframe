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
  it("renders sign-up mode copy", () => {
    render(<EmailAuthForm mode="sign-up" />);

    expect(screen.getByRole("heading", { name: /create your operator account/i })).toBeTruthy();
    expect(screen.getByLabelText(/password/i)).toBeTruthy();
  });
});
