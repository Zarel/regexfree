Source for the regexfree website:

https://zarel.github.io/regexfree/

> How do you build?

    npm i
    npx tsc regexfree.ts

Copy/paste the contents of `xregexp-app.js` and `regexfree.js` into a minifier or something, then put the results in the `<script>...</script>` tags in `index.html`.

> Why isn't there a build script?

I'm lazy.

> Why is everything in one file?

I heard there was a perf advantage. It also makes the file simple to download and use offline, I suppose.

> You should support my use case

Sure, open an issue.
