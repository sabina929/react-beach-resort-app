import React, { Component } from 'react'
// import items from "./data";
import Client from "./Contentful";


// Client.getEntries(
//   {
//     content_type: "beachResortRoom"
//   }
// )
//   .then((response) => console.log(response.items))
//   .catch(console.error)

const RoomContext = React.createContext();


// RoomContext.Provider value={}


class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  }

  // getData
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResortRoom",
        // order: "sys.createdAt"
        // order: "fields.price"
        order: "-fields.price"
      });
      let rooms = this.formatData(response.items);
      // console.log(rooms)
      let featuredRooms = rooms.filter(room => room.featured === true);

      let maxPrice = Math.max(...rooms.map(room => room.price));
      // console.log(maxPrice);
      let maxSize = Math.max(...rooms.map(room => room.size));
      // console.log(maxSize);

      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize
      });
    } catch (error) {
      console.log(error);
    }
  }



  componentDidMount() {
    this.getData()

  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = {
        ...item.fields,
        images,
        id
      }
      return room;
    });

    return tempItems;
  }

  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  }


  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name;
    // console.log(`type: ${type}, name: ${name}, value: ${value}`);

    this.setState({
      [name]: value
    }, this.filterRooms)

  }


  filterRooms = () => {
    let {rooms, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets} = this.state;


    // all the rooms
    let tempRooms = [...rooms];

    // transform value
    capacity = parseInt(capacity);
    price = parseInt(price);

    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(tempRoom => tempRoom.type === type);
    }

    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(tempRoom => tempRoom.capacity >= capacity);
    }

    // filter by price
    tempRooms = tempRooms.filter(tempRoom => tempRoom.price < price);

    // filter by size
    tempRooms = tempRooms.filter(tempRoom => tempRoom.size >= minSize && tempRoom.size <= maxSize);

    // filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(tempRoom => tempRoom.breakfast === true)
    }

    // filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(tempRoom => tempRoom.pets === true)
    }



    //change state
    this.setState({
      sortedRooms: tempRooms
    })


  }



  render() {
    return (
      <RoomContext.Provider  value={{
        ...this.state,
        getRoom: this.getRoom,
        handleChange: this.handleChange
      }}>
          {this.props.children}
      </RoomContext.Provider>
    )
  }
}


const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {
      value => <Component {...props} context={value}/>
      }
      </RoomConsumer>
    )
  }
}



export { RoomProvider, RoomConsumer, RoomContext };