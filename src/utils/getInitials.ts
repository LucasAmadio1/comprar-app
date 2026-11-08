/** "marina@email.com" -> "MA" | "ana.souza" -> "AS" */
export function getInitials(contact: string): string {
  const base = contact.split("@")[0].replace(/[^A-Za-zÀ-ú0-9 ._-]/g, "");
  const parts = base.split(/[ ._-]+/).filter(Boolean);

  const first = parts[0]?.[0] ?? "?";
  const second = parts[1] ? parts[1][0] : (parts[0]?.[1] ?? "");

  return (first + second).toUpperCase();
}
