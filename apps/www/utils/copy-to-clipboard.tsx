/**
 * Copies the given text to the user's clipboard.
 * Returns a Promise that resolves when the copy is successful.
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (!navigator?.clipboard) {
    console.warn('Clipboard API not available');
    return Promise.reject(new Error('Clipboard API not available'));
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error('Failed to copy text:', error);
    throw error;
  }
}
