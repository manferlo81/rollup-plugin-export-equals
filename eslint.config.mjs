import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import { config, configs as typescriptConfigs } from 'typescript-eslint';

const normalizeRuleEntry = (entry) => {
  if (Array.isArray(entry)) return entry;
  if (['off', 'warn', 'error'].includes(entry)) return entry;
  return ['error', entry];
};

function createRuleNameNormalizer(pluginName) {
  if (!pluginName) return (ruleName) => ruleName;
  return (ruleName) => {
    const pluginPrefix = `${pluginName}/`;
    if (ruleName.startsWith(pluginPrefix)) return ruleName;
    return `${pluginPrefix}${ruleName}`;
  };
}

const rules = (pluginName, rules) => {
  const normalizeRuleName = createRuleNameNormalizer(pluginName);
  return Object.fromEntries(
    Object.entries(rules).map(([ruleName, ruleValue]) => {
      return [normalizeRuleName(ruleName), normalizeRuleEntry(ruleValue)];
    }),
  );
};

const eslintRules = rules(null, {
  'no-useless-rename': 'error',
  'object-shorthand': 'error',
  'prefer-template': 'error',
});

const stylisticRules = rules('@stylistic', {
  semi: 'always',
  indent: 2,
  quotes: 'single',
  'linebreak-style': 'unix',

  'quote-props': 'as-needed',
  'arrow-parens': 'always',
  'no-extra-parens': 'all',
  'no-extra-semi': 'error',
  'brace-style': '1tbs',

  'member-delimiter-style': {},
  'padded-blocks': 'off',
});

const typescriptRules = rules('@typescript-eslint', {
  'array-type': {
    default: 'array-simple',
    readonly: 'array-simple',
  },
});

const javascriptExtensions = ['js', 'cjs', 'mjs'];
const javascriptExtString = javascriptExtensions.join(',');

const typescriptConfig = config(
  ...typescriptConfigs.strictTypeChecked,
  ...typescriptConfigs.stylisticTypeChecked,
  { languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: process.cwd() } } },
  { files: [`**/*.{${javascriptExtString}}`], ...typescriptConfigs.disableTypeChecked },
);

export default config(
  { ignores: ['dist', 'coverage'] },
  { files: [`**/*.{${javascriptExtString},ts}`] },
  { languageOptions: { globals: globals.node } },
  js.configs.recommended,
  stylistic.configs['recommended-flat'],
  ...typescriptConfig,
  { rules: { ...eslintRules, ...stylisticRules, ...typescriptRules } },
);
