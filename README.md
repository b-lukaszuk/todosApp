# todosApp

**Deployed version ->** [Here](https://b-lukaszuk.github.io/todosApp/#/)

Kopia `PB_reactjs_2020_2021/sem2_zaliczenie/`

# Wymagania

Apka powinna miec to o czym byla mowa na cwiczeniach, tj.:
- uzywac useState-ow
- uzywac useMemo (opcjonalne, jesli bedzie taka potrzeba)
- uzywac useEffect-ow (localStorage)
- uzywac wlasnych Hookow (jesli bedzie taka potrzeba)
[moznaby to zrobic, tylko custom hook przy fetch API wymagalby useMemo
(opcjonalne, patrz wyzej), prosciej (mniej kodu + i tak jest to uzyte
tylko w 1 miejscu) bedzie to zrobic w useEffect]
	+ [info o useMemo](https://medium.com/@shaymalchi/understanding-reacts-usememo-hook-through-a-simple-example-ea05b78075e9)
	+ [info o fetchData i useMemo 1](https://divyanshu013.dev/blog/react-debounce-throttle-hooks/)
	+ [info o fetchData i useMemo 2](https://kyleshevlin.com/debounce-and-throttle-callbacks-with-react-hooks)
- uzywac useReducer-ow
- miec nawigacje
  + strona logowania (haslo: rok kanonizacji Dominika Guzmana przez papieza Grzegorza IX)
  + podstawowa autoryzaca
  + nie wpuszczanie nie zalogowanych userow
  + powrot do strony logowania
- spelniac poprzednie (sem1) wymagania
  + filtrowanie todosow po: zakonczone, nie zakonczone, dodawanie/usuwanie todosow
  + edycja todosow (opcjonalna)

# Uwagi

- Po zalogowaniu (jesli lista todosow jest pusta) strona pobiera sztuczne todosy z:
https://jsonplaceholder.typicode.com/users/1/todos

- strona wykorzystuje [localStorage](https://developer.mozilla.org/pl/docs/Web/API/Window/localStorage) do przechowywania/odczytywania todosow

- deplyment wymagal [zamiany BrowserRouter na HashRouter](https://medium.com/@arijit_chowdhury/deploy-react-app-with-react-router-to-github-pages-for-free-569377f483f)

## Do użytku własnego, nie powinno być używane przez nikogo innego.
## For personal use only, should not be used by anyone else.
