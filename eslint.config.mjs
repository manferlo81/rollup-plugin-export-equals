import pluginJavascript from '@eslint/js';
import pluginStylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import { config, configs as typescriptConfigs } from 'typescript-eslint';

const javascriptPluginConfig = config(
  pluginJavascript.configs.recommended,
  {
    rules: normalizeRules({
      'no-useless-rename': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'no-useless-concat': 'error',
    }),
  },
);

const stylisticPluginConfig = config(
  pluginStylistic.configs.customize({
    quotes: 'single',
    indent: 2,
    semi: true,
    arrowParens: true,
    quoteProps: 'as-needed',
    braceStyle: '1tbs',
  }),
  {
    rules: normalizeRules('@stylistic', {
      'linebreak-style': 'unix',
      'no-extra-parens': 'all',
      'no-extra-semi': 'error',
      'padded-blocks': 'off',
    }),
  },
);

const typescriptPluginConfig = config(
  typescriptConfigs.strictTypeChecked,
  typescriptConfigs.stylisticTypeChecked,
  {
    languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: process.cwd() } },
    rules: normalizeRules('@typescript-eslint', {
      'array-type': { default: 'array-simple', readonly: 'array-simple' },
    }),
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...typescriptConfigs.disableTypeChecked,
  },
);

export default config(
  { ignores: ['dist', 'coverage'] },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  javascriptPluginConfig,
  stylisticPluginConfig,
  typescriptPluginConfig,
);

function normalizeRuleEntry(entry) {
  if (Array.isArray(entry)) return entry;
  if (['error', 'off', 'warn'].includes(entry)) return entry;
  return ['error', entry];
}

function createPluginRuleNameNormalizer(pluginName) {
  const pluginPrefix = `${pluginName}/`;
  return (ruleName) => {
    if (ruleName.startsWith(pluginPrefix)) return ruleName;
    return `${pluginPrefix}${ruleName}`;
  };
}

function createEntryNormalizer(pluginName) {
  if (!pluginName) return ([ruleName, ruleValue]) => [ruleName, normalizeRuleEntry(ruleValue)];
  const normalizeRuleName = createPluginRuleNameNormalizer(pluginName);
  return ([ruleName, ruleValue]) => [normalizeRuleName(ruleName), normalizeRuleEntry(ruleValue)];
}

function normalizeRules(pluginName, rules) {
  if (!rules && pluginName) return normalizeRules(null, pluginName);
  const normalizeEntry = createEntryNormalizer(pluginName);
  return Object.fromEntries(Object.entries(rules).map(normalizeEntry));
}
