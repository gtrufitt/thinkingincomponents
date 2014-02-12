## Tools

There are a great number of tools and techniques beyond those mentioned above that can help us to build a componentised architecture. The following are some things that I have used to create interactive style tiles / style guides and pattern libraries and some things that I would look to experiment with in the future.

### Assemble & Handlebars, sass and require.js

#### Assemble & Handlebars

Using Assemble, we can generate our mark-up within partials using handlebars. This allows us to bring logic into our front-end components, forcing us to think clearly about the situations in which our components will be used, what elements within our components are modifiers and how different data is displayed. We may, for example have the following component:

Handlebars Mark-up (highlight-box.hbs):

```handlebars
<div class="highlight-box\{{if classes}} \{{classes}}\{{/if}}">
    <h2 class="highlight-box__title">\{{title}}</h2>
    <p>\{{content}}</p>
</div>
```

Data (highlight-box.json):
Our highlight-box data contains our base components and each modifier of that base. We can 

```json
{
    "components": {
        "highlight-box": {
        "title": "Normal news",
        "content": "Lorem ipsum"
        },
        
        "highlight-box--large": {
            "title": "Big news",
            "content": "Loremore ipsumore",
            "classes": "highlight-box--large"
        },

        "highlight-box--largest": {
            "title": "Biggest news",
            "content": "Loremost ipsumost",
            "classes": "highlight-box--largest"
        }
    }
}
```

Patterns (patterns.html):

Loop through each version of the component and output the highlight-box partial with that context

```handlebars
\{{#highlight-box}}
    \{{#each components}}
        \{{>highlight-box this}}
    \{{/each}}
\{{/highlight-box}}
```

#### Sass

Sass will enable us to split our css into components

Yeoman generator