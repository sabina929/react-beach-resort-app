import React from 'react';
import { useContext } from "react";
import { RoomConsumer, RoomContext } from '../context';
import Title from "../components/Title";


// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))]
}
//----------------------


export default function RoomFilter({rooms}) {

  const context = useContext(RoomContext);
  //   console.log(context);
  const {handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets} = context

  // get unique types
  let types = getUnique(rooms, 'type');
  //   console.log(types);
  // add all
  types = ['all', ...types];
  // map to JSX
  types = types.map((type, i) => {
    return (
      <option key={i} value={type}>{type}</option>
    )
  })

  // get unique people
  let people = getUnique(rooms, "capacity");
  // map to JSX
  people = people.map((person, i) => {
    return (
      <option key={i} value={person}>{person}</option>
    )
  })

  return (
    <section className="filter-container">
        <Title title="Search Rooms"/>
        <form className="filter-form">
            { /* select type */ }
            <div className="form-group">
                <label htmlFor="type">Room Type</label>
                <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
                   {types}
                </select>
            </div>
            { /* end of select type */ }

            { /* guests */ }
            <div className="form-group">
                <label htmlFor="capacity">Guests</label>
                <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
                   {people}
                </select>
            </div>
            { /* end of guests */ }

            { /* price */ }
            <div className="form-group">
                <label htmlFor="price">Room Price ${price}</label>
                <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} className="form-control" onChange={handleChange}/>
            </div>
            { /* end of price */ }

            { /* size */ }
            <div className="form-group">
                <label htmlFor="size">Room Size</label>
                <div className="size-inputs">
                    <input type="number" name="minSize" id="size" value={minSize} className="size-input" onChange={handleChange}/>
                    <input type="number" name="maxSize" id="size" value={maxSize} className="size-input" onChange={handleChange}/>
                </div>
            </div>
            { /* end of size */ }

            { /* extras */ }
            <div className="form-group">
                <div className="single-extra">
                    <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
                    <label htmlFor="breakfast">Breakfast</label>
                </div>
                <div className="single-extra">
                    <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
                    <label htmlFor="pets">Pets</label>
                </div>
            </div>
            { /* end of extras */ }
        </form>
    </section>
  )
}