_Highlighted Text_ with Title of Document
=========================================

## Introduction

This is the leading introduction for the documentation. It should not be longer than three to four sentances. This boilerplate is an easy way to create technical documentation using markdown. It utilizes the styles from Bootcamp.

This is the continuation of the documentation if there needs to be a more detailed explanation of the introduction. The `index` file that is packaged with this boilerplate must be served from a webserver since it uses `$.load` to import the `document.md` markdown file.

## Tables

This is an example of a table. The first table will be visible on all devices because it has the class `all-devices`. The second table will be converted into an unordered list based on key-value parings using the information within the table. `<thead>` and `<tbody>` elements are therefore required.

<table class="all-devices">
    <thead>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Value 1</td>
            <td>Value 2</td>
            <td>Value 3</td>
        </tr>
        <tr>
            <td>Value 1b</td>
            <td>Value 2b</td>
            <td>Value 3b</td>
        </tr>
    </tbody>
</table>

Re-size the browser window to see the table respond to the limited width.

<table>
    <thead>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Value 1</td>
            <td>Value 2</td>
            <td>Value 3</td>
        </tr>
        <tr>
            <td>Value 1b</td>
            <td>Value 2b</td>
            <td>Value 3b</td>
        </tr>
    </tbody>
</table>

## Including Code Snippets

### Third level header example with a code snippet below:

    <div class="example">
        <p>This is an example of including code snippets</p>
    </div>

## Other elements

### Ordered Lists

- This is an unordered list
- This is the second item
    - This is an unordered list within an unordered list
    - Just like inception
- Back to the first level

### Unordered Lists

1. This is an ordered list
1. This is the second item
    1. More inception
        - An unordered list within an ordered list
        - The world will explode
    1. And one last time
1. That's enough

## References

- [Markdown Syntax](http://daringfireball.net/projects/markdown/syntax)
- Reference item two

