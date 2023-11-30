import { importMapsPlugin } from '@web/dev-server-import-maps';

export default {
    plugins: [
        importMapsPlugin({
            inject: {
                importMap: {
                    imports: {
                        assert: '/node_modules/@dashkite/assert/build/browser/src/index.js',
                        '@dashkite/joy': '/node_modules/@dashkite/joy/build/browser/src/index.js'
                    }
                }
            }
        })
    ],
    testRunnerHtml: testFramework => /*html*/ `
        <html>
            <body>
                <script>
                    // alias test() to it()
                    Object.defineProperty(window, 'test', { get() { return it } })
                </script>
                <script type="module" src="${testFramework}"></script>
            </body>
        </html>
    `
};
