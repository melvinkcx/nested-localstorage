# nested-localstorage
nested-localstorage is a wrapper of localStorage that maintain single data store across multiple instances. This allow single source of data among multiple frameworks, multiple tabs, etc similar to localStorage. Since the underlying data store is localStorage, all constraints of localStorage apply. The purpose of this class is to allow creation and retrieval of nested object and will not throw any exception when an invalid nested property is accessed

> First created on 13 Jan, 2017
> Contributors: Melvin Koh <melvinkcx@gmail.com>

# Installation
## npm
```
npm install nested-localstorage --save
```

# Usage
## ES6 Syntax
```
import Store from 'nested-localstorage';

// Start using it.
```

# API
## getItem()

## setItem()

## appendItem()


# Caveat
* This class assumes localStorage is not tampered other than using this Store class,
* it does not check against external changes of localStorage