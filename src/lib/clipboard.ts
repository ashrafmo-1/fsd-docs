export type CopyStatus = "idle" | "copied" | "error";

type ClipboardWriter = Pick<Clipboard, "writeText">;

/** Resolves true only once the text is actually on the clipboard. */
export async function writeToClipboard(
  text: string,
  clipboard: ClipboardWriter | undefined = globalThis.navigator?.clipboard,
): Promise<boolean> {
  if (!clipboard?.writeText) return false;
  try {
    await clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
