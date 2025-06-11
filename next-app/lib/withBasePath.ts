// 環境に応じてパスを変えるための関数
// この関数は、Next.jsの環境変数を使用して、ベースパスを付加します。

const withBasePath = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;

export default withBasePath;
