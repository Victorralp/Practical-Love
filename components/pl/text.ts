/** Up to two initials for an avatar, falling back to "Y" for "You". */
export function initials(name: string) {
  const letters = (name.trim() || 'You')
    .split(/\s+/)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return letters || 'Y';
}
