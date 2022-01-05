# Notes
## On "finished" components:
* **Dropdown**: I'd test it but I can't compile the TSX.
* **Message**
* **Pagination**
  * I'd like to move away from injected accessors, (into render functions) but this use-case is different. In any case, if any other injected accessor is removed, I can at least type this one strongly
  * Might be the prime subject for a renderless component, passing the list of elements, number of elements per page, etc. and it'll provide the elements to show in the scoped slot
