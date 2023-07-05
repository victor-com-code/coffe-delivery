export interface AddressType {
  cep: string
  street: string
  houseNumber: number
  complement?: string
  state: string
  city: string
  neighborhood: string
}

interface AddressState {
  address: AddressType
}

export function addressReducer(state: AddressState, action: any) {
  if (action.type === 'SET_NEW_ADDRESS') {
    return {
      address: action.payload.newAddress,
    }
  }

  return state
}
