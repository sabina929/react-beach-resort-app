import React, { Component } from 'react';
import defaultBcg from "../images/room-1.jpeg";
// import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import StyledHero from "../components/StyledHero"




class SingleRoom extends Component {

  constructor(props) {
    super(props)

    // console.log(this.props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    }

  }


  static contextType = RoomContext;
  // componentDidMount() {}

  render() {

    const {getRoom} = this.context;

    const room = getRoom(this.state.slug);

    if (!room) {
      return (
        <div className="error">
          <h3>No such room could be found...</h3>
          <Link to="/rooms" className="btn-primary">Back To Rooms</Link>
        </div>
      )
    }

    const {name, description, capacity, size, price, extras, breakfast, pets, images} = room;
    // console.log(room);

    const [mainImg, ...defaultImg] = images;
    // console.log(defaultImg);

    return (
      <React.Fragment>
      <StyledHero img={mainImg || this.state.defaultBcg}>
          <Banner title={`${name} Room`}>
            <Link to="/rooms" className="btn-primary">Back To Rooms</Link>
          </Banner>              
      </StyledHero>

<section className="single-room">
  <div className="single-room-images">

      {defaultImg.map((image, i) => {
        return (<img key={i} src={image} alt={name}/>)
      })}

  </div>

   <div className="single-room-info">

     <article className="desc">
       <h3>Details</h3>
       <p>{description}</p>
     </article>
     <article className="info">
       <h3>Info</h3>
       <h6>Price: ${price}</h6>
       <h6>Size: {size} SQFT</h6>
       <h6>Max Capacity: {capacity > 1 ? `${capacity} people` : `${capacity}person`}</h6>
       <h6>{pets ? 'Pets Allowed' : 'No Pets Allowed'}</h6>
       <h6>{breakfast && 'Free Breakfast Included'}</h6>
     </article>

   </div>
</section>

<section className="room-extras">
  <h6>Extras</h6>
  <ul className="extras">
    {
      extras.map((extra, i) => {
        return (
          <li key={i}>- {extra}</li>
        )
      })
      }
  </ul>
</section>

      </React.Fragment>
    )
  }
}

export default SingleRoom;