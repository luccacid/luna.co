/**
 * Configuração do ESLint (flat config) — usa o preset flat nativo do Next 16
 * (`eslint-config-next/core-web-vitals`, já um array de flat config). Ignora os
 * artefatos de build/exportação.
 */
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    // Build, dependências e as pastas de ferramenta local (que carregam cópias
    // vendorizadas de libs) — nenhuma é código deste projeto.
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      ".design-sync/**",
      ".ds-sync/**",
      "ds-bundle/**",
      ".claude/**",
      ".omc/**",
    ],
  },
  ...nextCoreWebVitals,
];

export default eslintConfig;
