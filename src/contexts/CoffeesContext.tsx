import { ReactNode, createContext, useState } from 'react'
import { CoffeeType } from '../components/Coffee'

interface CoffeesContextType {
  coffees: CoffeeType[]
  coffeesOnCart: CoffeeType[]
  totalPrice: number
  setCalculateTotalPrice: () => void
  addCoffeeToCart: (data: CoffeeType) => void
  removeCoffeeFromCart: (coffeeId: string) => void
}

export const CoffeesContext = createContext({} as CoffeesContextType)

interface CoffeesContextProviderProps {
  children: ReactNode
}

export function CoffeesContextProvider({
  children,
}: CoffeesContextProviderProps) {
  const [coffees] = useState<CoffeeType[]>([
    {
      id: '1',
      image: '/src/pages/Home/assets/expresso.png',
      name: 'Expresso Tradicional',
      description: 'O tradicional café feito com água quente e grãos moídos',
      tags: ['Tradicional'],
      price: 9.9,
      amount: 0,
    },
    {
      id: '2',
      image: '/src/pages/Home/assets/expresso-americano.png',
      name: 'Expresso Americano',
      description: 'Expresso diluído, menos intenso que o tradicional',
      tags: ['Tradicional'],
      price: 9.9,
      amount: 0,
    },
    {
      id: '3',
      image: '/src/pages/Home/assets/expresso-cremoso.png',
      name: 'Expresso Cremoso',
      description: 'Café expresso tradicional com espuma cremosa',
      tags: ['Tradicional'],
      price: 9.9,
      amount: 0,
    },
    {
      id: '4',
      image: '/src/pages/Home/assets/expresso-gelado.png',
      name: 'Expresso Gelado',
      description: 'Bebida preparada com café expresso e cubos de gelo',
      tags: ['Tradicional', 'Gelado'],
      price: 9.9,
      amount: 0,
    },
    {
      id: '5',
      image: '/src/pages/Home/assets/cafe-com-leite.png',
      name: 'Café com Leite',
      description: 'Meio a meio de expresso tradicional com leite vaporizado',
      tags: ['Tradicional', 'Com Leite'],
      price: 9.9,
      amount: 0,
    },
    {
      id: '6',
      image: '/src/pages/Home/assets/latte.png',
      name: 'Latte',
      description:
        'Uma dose de café expresso com o dobro de leite e espuma cremosa',
      tags: ['Tradicional', 'Com Leite'],
      price: 12.9,
      amount: 0,
    },
    {
      id: '7',
      image: '/src/pages/Home/assets/capuccino.png',
      name: 'Capuccino',
      description:
        'Bebida com canela feita de doses iguais de café, leite e espuma',
      tags: ['Tradicional', 'Com Leite'],
      price: 12.9,
      amount: 0,
    },
    {
      id: '8',
      image: '/src/pages/Home/assets/macchiato.png',
      name: 'Macchiato',
      description:
        'Café expresso misturado com um pouco de leite quente e espuma',
      tags: ['Tradicional', 'Com Leite'],
      price: 12.9,
      amount: 0,
    },
    {
      id: '9',
      image: '/src/pages/Home/assets/mocaccino.png',
      name: 'Mocaccino',
      description: 'Café expresso com calda de chocolate, pouco leite e espuma',
      tags: ['Tradicional', 'Com Leite'],
      price: 12.9,
      amount: 0,
    },
    {
      id: '10',
      image: '/src/pages/Home/assets/chocolate.png',
      name: 'Chocolate Quente',
      description:
        'Bebida feita com chocolate dissolvido no leite quente e café',
      tags: ['Especial', 'Com Leite'],
      price: 19.9,
      amount: 0,
    },
    {
      id: '11',
      image: '/src/pages/Home/assets/cubano.png',
      name: 'Cubano',
      description:
        'Drink gelado de café expresso com rum, creme de leite e hortelã',
      tags: ['Especial', 'Alcoólico', 'Gelado'],
      price: 19.9,
      amount: 0,
    },
    {
      id: '12',
      image: '/src/pages/Home/assets/havaiano.png',
      name: 'Havaiano',
      description: 'Bebida adocicada preparada com café e leite de coco',
      tags: ['Especial'],
      price: 19.9,
      amount: 0,
    },
    {
      id: '13',
      image: '/src/pages/Home/assets/arabe.png',
      name: 'Árabe',
      description: 'Bebida preparada com grãos de café árabe e especiarias',
      tags: ['Especial'],
      price: 19.9,
      amount: 0,
    },
    {
      id: '14',
      image: '/src/pages/Home/assets/irlandes.png',
      name: 'Irlandês',
      description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
      tags: ['Especial', 'Alcoólico'],
      price: 19.9,
      amount: 0,
    },
  ])

  const [coffeesOnCart, setCoffeesOnCart] = useState<CoffeeType[]>([])

  const [totalPrice, setTotalPrice] = useState(0)

  function addCoffeeToCart(data: CoffeeType) {
    if (coffeesOnCart.includes(data)) {
      setCoffeesOnCart((state) => {
        return state.map((item) => {
          if (item.id === data.id) {
            return { ...item, amount: data.amount }
          }
          return item
        })
      })
    } else {
      setCoffeesOnCart((state) => {
        return [...state, data]
      })
    }
  }

  function removeCoffeeFromCart(coffeeId: string) {
    const coffeesOnCartWithoutDeletedOne = coffeesOnCart.filter((coffee) => {
      return coffee.id !== coffeeId
    })

    setCoffeesOnCart(coffeesOnCartWithoutDeletedOne)
  }

  function setCalculateTotalPrice() {
    setTotalPrice(
      coffeesOnCart.reduce((sum, coffee) => {
        return (sum += coffee.price * coffee.amount)
      }, 0),
    )
  }

  return (
    <CoffeesContext.Provider
      value={{
        coffees,
        coffeesOnCart,
        totalPrice,
        setCalculateTotalPrice,
        addCoffeeToCart,
        removeCoffeeFromCart,
      }}
    >
      {children}
    </CoffeesContext.Provider>
  )
}