+++
title = "Test 1"
tags = ["test"]
date = "1012-01-01"
+++

Test 1
I am referencing a footnote[^1]

```go {linenos=inline}
package main

import "fmt"

func main() {
  fmt.Println("{linenos=inline}")
}
```

```go {linenos=table}
package main

import "fmt"

func main() {
  fmt.Println("{linenos=table}")
}
```

```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in dictum tortor.
Morbi laoreet enim id sem euismod lobortis. Donec quam libero, bibendum non cursus vitae, dictum vel eros.
```

[^1]: I am the footnote
