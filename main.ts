/*

COMPILACION  /  EJECUCION
TypeScript   /  JavaScript

- Los tipos de TypeScrit NO FUNCIONAN EN EL TIEMPO DE EJECUCIÓN DEL NAVEGADOR 
- TypeScript añade seguridad, robusted, tranquilidad
- TypeScript infiere automáticamente en la mayoria de las asignaciones de tipos de nuestro código, es recomendable tipar manualmente lo justo y necesario

*/


/*  ANY: EVITARLO
    ============= */
// any no es "cualquier tipo" sino que ignore el tipado de typescript 
let anyValue: any = 'hey'


/*  UNKNOWN
    ======= */
// usamos el tipado de typescript, pero no sabemos cual es el tipo
let anotherValue: unknown = 'hey'


/*  INFERENCIA DE TIPOS
    =================== */
// typescript infiere tipando que a y b son un numero 
const a = 1
const b = 2
//  tipandolo como un numero
const c = a + b

// typescript infiere tipando texto como un string
let someText = 'hey'
// typescript valida los métodos de un string 
someText.toLocaleLowerCase()
// cadenaDeTexto = 2  ERROR
// cadenaDeTexto.propiedadInexistente  ERROR

// typescript infiere en el return con Arrow functions
const add = (a: number, b: number) => {
  return a + b
}
// o de esta otra forma
const subtract: (a: number, b: number) => number = (a, b) => {
  return a - b
}

// El tipo never lo usamos cuando sabemos que nunca hay que devolver nada 
function throwError(message: string): never {
  throw new Error(message)
}

// AQUÍ HAY QUE TIPARLO MANUALMENTE. typescript no interfiere en el tipo en las funciones
function sayHello(name: string) {
  console.log(`hey ${name}`)
}
// sayHello('Pepe')  OK
// sayHello(2)  ERROR

// La forma correcta de tipar un objeto en los parametros de la función 
function sayHiWithObjects1({name, age}: {name: string, age: number}) {
  console.log(`hola ${name}, tienes ${age} años`)
}
function sayHiWithObjects2(persona: {name: string, age: number}) {
  const {name, age} = persona
  console.log(`hola ${name}, tienes ${age} años`)
}
// sayHiWithObjects({name: 'Pepe', age: 2})  OK

// La forma correcta de tipar el resultado de una funcion
function sayHiWithReturn({name, age}: {name: string, age: number}): number {
  console.log(`hola ${name}, tienes ${age} años`)
  return age
}
// retornamos un numero
// o en el caso que no nos importe que devolver, retornamos void
function sayHiWithoutReturn({name, age}: {name: string, age: number}): void {
  console.log(`hola ${name}, tienes ${age} años`)
}
// como tipar una funcion que pasamos por parámetros 
const sayHiFromFunction = (fn: (name: string) => string) => {
  fn('Mario')
}
const sayHi = ((name: string) => {
  console.log(`Hola ${name}`)
  return name
})
sayHiFromFunction(sayHi)
// retornamos un string

// inferencia en funciones anonimas segun el contexto
// en este caso, la inferencia tipa los avengers como un array de strings
const avengers = ['Spidey', 'Hulk', 'Ironman']
// el metodo forEach está disponible ya que es un array 
avengers.forEach(avenger => {
  console.log(avenger.toUpperCase())
})


// Type Alias

// El tipo es un contrato
type HexadecimalColor = `#${string}`
// const color1: HexadecimalColor = '0033ff'  ERROR el tipo avisa que el valor no es el correcto
// const color2: HexadecimalColor = '#0033ff'  OK

// Creamos un contrato para validar opciones en las porpiedades de otro Tipo 
type HeroId = `${string}-${string}-${string}-${string}-${string}`

type Hero = {
  readonly id?: HeroId 
  name: string,
  age: number
  isActive?: boolean
}

function createHero(hero: Hero): Hero {
  const {name, age} = hero
  return {
    id: crypto.randomUUID(), 
    name, 
    age, 
    isActive: true
  }
}

const thor = createHero({name: 'Thor', age: 1500})
// console.log(thor.id)  OK res string randomUUID
// console.log(thor.isActive)  OK res True


// Propiedades opcionales con '?'
type allValues = {
  id: number
  optionalProperty?: number
}

// Tipos de union
let stringOrNumber: string | number
// stringOrNumber = 'hey' //  OK
// stringOrNumber = 2 //  OK
// stringOrNumber = true //  ERROR

// Tipos de interseccion
type HeroPowerScale = 'local' | 'planetary' | 'galatic' | 'universal' | 'multiversal'

type HeroBasicInfo = {
  name: string,
  age: number
}

type HeroProperties = {
  id?: number,
  isActive?: boolean,
  powerScale?: HeroPowerScale
}

// Interseccionamos varios tipos a un nuevo tipo mayor
type HeroExpanded = HeroBasicInfo & HeroProperties

// Extraer los tipos de un objeto, o del return de una funcion
function createAddress() {
  return {
    planet: 'Tierra',
    city: 'Madrid'
  }
}

type Address = ReturnType<typeof createAddress>


/*  ARRAYS
    ======= */
// typescript interfiere con un tipo never aqui
const languagesTipeNever = []  
// Así que hay que tipar los arrays
const languages1: string[] = []
// o asi
const languages2: Array<string> = []
// si quieremos que dentro del array hayan varios tipos diferentes
const languagesTipeStringAndNumber: (string | number)[] = []

languages1.push('Javascript') // OK
// languages.push(true) // ERROR


// Tablero tres en raya usando tipos 
type CellValue = 'x' | 'o' | '' // las opciones que se pueden usar
type GameBoard = [
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue]
] // Creamos una tupla, un array con el numero de celdas que queremos usar y dentro de ellas el valor permitido

const gameBoard: GameBoard = [
  ['x', 'o', 'x'],
  ['', 'o', 'x'],
  ['o', 'x', 'o']
]