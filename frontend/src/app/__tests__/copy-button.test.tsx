import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CopyButton from "@/app/components/display/copy-button";
import { vi } from "vitest";

describe("CopyButton", () => {
  const originalClipboard = { ...global.navigator.clipboard };

  beforeEach(() => {
    Object.assign(global.navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterAll(() => {
    // restore original clipboard after all tests
    global.navigator.clipboard = originalClipboard;
  });

  it("renders the copy button", () => {
    render(<CopyButton text="sample text" />);
    const button = screen.getByRole("button", { name: /copy to clipboard/i });
    expect(button).toBeInTheDocument();
  });

  it("calls navigator.clipboard.writeText with the correct text", async () => {
    render(<CopyButton text="hello world" />);
    const button = screen.getByRole("button", { name: /copy to clipboard/i });

    fireEvent.click(button);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello world");
  });


  it("handles clipboard writeText rejection", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => { });
    Object.assign(global.navigator, {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error("Copy failed")),
      },
    });

    render(<CopyButton text="fail text" />);
    const button = screen.getByRole("button", { name: /copy to clipboard/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("fail text");
      expect(errorSpy).toHaveBeenCalledWith("Failed to copy text:", expect.any(Error));
    });

    errorSpy.mockRestore();
  });
});
