# Notes
## On "finished" components:
* **Dropdown**: I'd test it but I can't compile the TSX.
* **Message**
* **Pagination**
  * I'd like to move away from injected accessors, (into render functions) but this use-case is different. In any case, if any other injected accessor is removed, I can at least type this one strongly
  * Might use a scoped slot, receiving all the elements and passing the ones corresponding to this page by the slot attributes.
* **BaseCard**
* **BaseTabs**
* **BaseNavigation**: I'd also test it
* **BaseMenu**: Also test it
* **BasePanel**: Same
* **BaseBreadcrumb**: All the same

## Known issues
* The Vue compiler goes crazy every time I use more than one two-way binding (as in `BaseDropdown`). I just disable it and go with my life because it works and the error message is absolutely nonsensical.
* `No overload matches this call` in any of my `itemProps.tag ?? "a"` (or similar). I've checked the overloads and these exist, so why does this appear?
* There's no way to share props between components, so my components that are basically "decorators" repeat all of the props. Check for example `BaseDropdown` and `SelectorDropdown`
  * There's mixins... but these are only for the options API aren't they?
  * Can't use a props type from another file... there's an issue about it somewhere but I haven't found it again. Maybe this feature will come at some point.
