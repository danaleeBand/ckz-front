module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true, jest: true },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    '.prettierrc',
    '.gitignore',
    'tailwind.config.js',
    'vite.config.ts',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-var': 2, // var 금지
    eqeqeq: 2, // 일치 연산자 사용 필수
    'react/prop-types': 0, // 컴포넌트의 props 검사 비활성화
    'no-extra-semi': 'error', // 불필요한 세미콜론 사용 시 에러 표시
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ], // jsx 파일 확장자 .jx, .jsx, .ts, .tsx 허용
    'arrow-parens': [1, 'as-needed'], // 화살표 함수의 파라미터가 하나일때 괄호 생략
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'no-console': 0, // 콘솔 사용 시 발생하는 경고 비활성화
    'import/prefer-default-export': 0, // export문이 하나일 때 default export 사용 권장 경고 비활성화
    'react-hooks/exhaustive-deps': 1, // react hooks의 의존성배열이 충분하지 않을 때 경고 표시
    'react/jsx-pascal-case': 1, // 컴포넌트 이름은 PascalCase로
    'react/jsx-key': 1, // 반복문으로 생성하는 요소에 key 강제
    'no-debugger': 0, // 디버그 허용
    'prettier/prettier': [2, { endOfLine: 'auto' }], // [error] Delete prettier/prettier
    'react/function-component-definition': [
      1,
      { namedComponents: ['arrow-function', 'function-declaration'] },
    ], // [error] Function component is not a function declaration
    'react/react-in-jsx-scope': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-one-expression-per-line': 0,
    'no-nested-ternary': 0,
    'import/no-unresolved': [0, { caseSensitive: false }], // 파일의 경로가 틀렸는지 확인하는 옵션 false
    'react/jsx-props-no-spreading': [0, { custom: 'ignore' }], // props spreading 허용하지 않는 경고 표시
    'linebreak-style': 0,
    'import/extensions': 0,
    'no-use-before-define': 0,
    'import/no-extraneous-dependencies': 0, // 테스트 또는 개발환경을 구성 파일에서는 devDependency 사용 허용
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'comma-dangle': 1, // 마지막에 콤마 있을 때 오류 안내게
    'comma-spacing': [1, { after: true }], // 콤마 뒤에 spacing
    'eol-last': 1, // 파일 끝에 무조건 개행 있어야함
    'react/jsx-tag-spacing': 1, // <ReactElement />처럼 /> 전에 spacing 들어가야하는 rule 제거
    camelcase: 1, // 카멜케이스
    '@typescript-eslint/array-type': [1, { default: 'generic' }], // Array<T> 형식으로 쓰기
    '@typescript-eslint/type-annotation-spacing': 1, // : void 처럼 타입 기입 전에 whitespace
    '@typescript-eslint/explicit-function-return-type': 0, // return type 명시하기
    'implicit-arrow-linebreak': 0,
    'react/button-has-type': 0,
    'no-shadow': 0, // outer 스코프 변수 사용
    'operator-linebreak': 0, // 연산자가 있을 때 줄바꿈 제한
    quotes: [1, 'single'], // single-quote 사용
    'react/jsx-no-target-blank': 0, // target="_blank" 사용 허용
    'import/no-absolute-path': 0, // 절대경로 사용 허용
    'react/jsx-curly-brace-presence': 0, // props, children에 항상 중괄호 사용
    'react/require-default-props': 1, // defaultProps 사용
    'no-alert': 0, // alert 사용 허용
    'jsx-a11y/click-events-have-key-events': 0, // 클릭 이벤트에 키 이벤트 추가
    'react/require-default-props': 0, // defaultProps 사용
    'react/jsx-no-useless-fragment': 0, // 불필요한 Fragment 사용
    'no-param-reassign': 0, // 파라미터 재할당 허용
    'jsx-a11y/no-static-element-interactions': 0, // static element에 이벤트 추가
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
