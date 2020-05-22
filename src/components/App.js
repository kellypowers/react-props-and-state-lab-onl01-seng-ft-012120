import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  selectFetchRequest = () => {
    let optionalQueryParameter = `?type=${this.state.filters.type}`
    if (this.state.filters.type === 'all') {
      return fetch('/api/pets')
     } else {
       return  fetch(`/api/pets${optionalQueryParameter}`)
     }
  }
  fetchPets = () => {
    this.selectFetchRequest()
    .then(res => res.json())
    .then(pets => {
      console.log(pets);
      this.setState({pets: pets})
    })
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
    })
  }

  
  // findPet = (pet, id) => {return pet.id == id}
  // this.state.pets.each.find(findPet(pet, petId))

  // onAdoptPetEvent = event => {
  //   event.target.id 
  // }

  // onAdoptPet = petId => {
  //   findPet = (pet) => {return pet.id == petId}
  //   let petToChange = this.state.pets.find(findPet);
  //   this.setState({
  //     pets: {
  //       ...this.state.pets,
  //       petToChange.isAdopted= true 
  //     }
  //   })

  // }

  onAdoptPet = petId => {
    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets: pets });
  };

  // onAdoptPet = (petId) => {
  //   this.state.pets.map((   ) => {
  //     this.setState({pets: pets})
  //   })
    // this.setState({pets: pets}) do i eed a setstate here ??
  

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
