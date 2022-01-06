# Notes
## On "finished" components:
* **Dropdown**: I'd test it but I can't compile the TSX.
* **Message**
* **Pagination**
  * I'd like to move away from injected accessors, (into render functions) but this use-case is different. In any case, if any other injected accessor is removed, I can at least type this one strongly
  * Might use a scoped slot, receiving all the elements and passing the ones corresponding to this page by the slot attributes.
* **BaseCard**
* **BaseTabs**

## Known issues
* The Vue compiler goes crazy every time I use more than one two-way binding (as in `BaseDropdown`). I just disable it and go with my life because it works and the error message is absolutely nonsensical.
