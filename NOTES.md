# Notes
## On "finished" components:
* **Dropdown**: I'd test it but I can't compile the TSX.
* **Message**
* **Pagination**
  * I'd like to move away from injected accessors, (into render functions) but this use-case is different. In any case, if any other injected accessor is removed, I can at least type this one strongly
  * Might use a scoped slot, receiving all the elements and passing the ones corresponding to this page by the slot attributes.
* **BaseCard**
