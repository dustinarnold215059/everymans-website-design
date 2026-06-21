import { describe, it, expect } from "vitest";
import { validateContact } from "@/lib/validation";
import { siteConfig } from "@/config/site.config";

const valid = {
  name: "Jane Pastor",
  organization: "Grace Church",
  email: "jane@grace.org",
  need: siteConfig.contact.needOptions[0],
  message: "We need a new website for our church soon.",
};

describe("validateContact", () => {
  it("accepts a well-formed submission and trims fields", () => {
    const result = validateContact({ ...valid, name: "  Jane Pastor  " });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.name).toBe("Jane Pastor");
      expect(result.value.email).toBe("jane@grace.org");
    }
  });

  it("treats organization as optional", () => {
    const result = validateContact({ ...valid, organization: "" });
    expect(result.ok).toBe(true);
  });

  it("rejects a missing/short name", () => {
    const result = validateContact({ ...valid, name: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.name).toBeTruthy();
  });

  it("rejects an invalid email", () => {
    const result = validateContact({ ...valid, email: "not-an-email" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.email).toBeTruthy();
  });

  it("rejects a 'need' value that is not an allowed option", () => {
    const result = validateContact({ ...valid, need: "Hacking" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.need).toBeTruthy();
  });

  it("rejects a too-short message", () => {
    const result = validateContact({ ...valid, message: "hi" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.message).toBeTruthy();
  });

  it("rejects an over-long message", () => {
    const result = validateContact({ ...valid, message: "x".repeat(4001) });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.message).toBeTruthy();
  });

  it("handles non-object input without throwing", () => {
    expect(validateContact(null).ok).toBe(false);
    expect(validateContact(undefined).ok).toBe(false);
    expect(validateContact("nope").ok).toBe(false);
  });

  it("collects multiple errors at once", () => {
    const result = validateContact({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors).length).toBeGreaterThan(1);
    }
  });
});
