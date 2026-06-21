import next from "eslint-config-next";

/** Next 16 ships a native flat config (an array). Spread it after our ignores. */
const eslintConfig = [
  { ignores: [".next/**", "out/**", "build/**", "node_modules/**", "next-env.d.ts"] },
  ...next,
];

export default eslintConfig;
