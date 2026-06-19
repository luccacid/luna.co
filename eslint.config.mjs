/**
 * Configuração do ESLint (flat config) — usa o preset flat nativo do Next 16
 * (`eslint-config-next/core-web-vitals`, já um array de flat config). Ignora os
 * artefatos de build/exportação.
 */
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "node_modules/**"],
  },
  ...nextCoreWebVitals,
];

export default eslintConfig;
