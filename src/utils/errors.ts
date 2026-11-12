// Shared mutable holder for form errors (no React hook needed).
// Kept as `{ current }` shape so existing hook code keeps working.
export const formErrors: { current: Record<string, string> } = {
  current: {},
};
